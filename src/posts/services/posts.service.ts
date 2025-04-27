import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Posts } from '../entities/posts.entity';
import { CreatePostDto } from '../dtos';
import { Request } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllPosts() {
    return await this.postsRepository.find({
      relations: {
        likes: true,
        user: true,
      },
      select: {
        user: {
          id: true,
          username: true,
          email: true,
        },
        likes: {
          id: true,
          userId: true,
        },
      },
    });
  }

  async getPostsByUserId(userId: string, req: Request) {
    return await this.postsRepository.find({
      where: { userId },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
    });
  }

  async createPost(createPostDto: CreatePostDto) {
    // Verificar que el usuario existe
    const user = await this.usersRepository.findOne({
      where: { id: createPostDto.userId },
    });

    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST);
    }

    // Crear y guardar el post
    const newPost = this.postsRepository.create({
      ...createPostDto,
    });

    const savedPost = await this.postsRepository.save(newPost);

    // Obtener el post con datos limitados del usuario
    return await this.postsRepository.findOne({
      where: { id: savedPost.id },
      relations: {
        user: true,
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
    });
  }

  async deleteAll() {
    await this.postsRepository.clear();
  }
}
