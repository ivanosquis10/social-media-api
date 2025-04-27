import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';

import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos';
import { Public } from '../../auth/decorators/public.decorator';
import { type Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Public()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    return {
      message: 'Posts obtenidos exitosamente',
      status: HttpStatus.OK,
      data: posts,
    };
  }

  @Get(':postId')
  @Public()
  async getPostByid() {}

  @Get('user/:userId')
  async getPostsByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req: Request,
  ) {
    const posts = await this.postsService.getPostsByUserId(userId, req);
    return {
      message: 'Posts del usuario obtenidos exitosamente',
      status: HttpStatus.OK,
      data: posts,
    };
  }

  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    const newPost = await this.postsService.createPost(createPostDto);
    return {
      message: 'Post creado exitosamente',
      status: HttpStatus.CREATED,
      data: newPost,
    };
  }

  @Delete('delete')
  async deleteAll() {
    await this.postsService.deleteAll();

    return {
      message: 'All posts deleted',
      status: HttpStatus.OK,
      data: null,
    };
  }
}
