import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/likes.entity';
import { CreateLikeDto } from '../dtos/create-like.dto';
import { Posts } from '../../posts/entities/posts.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async create(userId: string, createLikeDto: CreateLikeDto) {
    const { postId } = createLikeDto;

    // Verificar si el post existe
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post con ID ${postId} no encontrado`);
    }

    // Verificar si ya existe un like del usuario para este post
    const existingLike = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (existingLike) {
      throw new ConflictException('Ya has dado like a este post');
    }

    // Crear el nuevo like
    const newLike = this.likeRepository.create({
      userId,
      postId,
    });

    return this.likeRepository.save(newLike);
  }

  async findAllByPostId(postId: string) {
    return this.likeRepository.find({
      where: { postId },
      // relations: ['user'],
      order: { createdAt: 'DESC' },
      // select: {
      //   user: {
      //     id: true,
      //     username: true,
      //   },
      // },
    });
  }

  async findAllByUserId(userId: string) {
    return this.likeRepository.find({
      where: { userId },
      relations: ['post'],
      order: { createdAt: 'DESC' },
    });
  }

  async delete(userId: string, postId: string) {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (!like) {
      throw new NotFoundException('Like no encontrado');
    }

    await this.likeRepository.remove(like);
  }

  async countByPostId(postId: string): Promise<number> {
    return this.likeRepository.count({ where: { postId } });
  }

  async hasUserLikedPost(userId: string, postId: string): Promise<boolean> {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    return !!like;
  }
}
