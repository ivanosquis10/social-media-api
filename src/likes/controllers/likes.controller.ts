import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from '../dtos/create-like.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../users/entities/user.entity';
import { GetUser } from '@src/auth/decorators/get-user.decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('create')
  async create(@GetUser() user: User, @Body() createLikeDto: CreateLikeDto) {
    const response = await this.likesService.create(user.id, createLikeDto);

    return {
      message: 'Like added correctly',
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Get('post/:postId')
  async findAllByPostId(@Param('postId', ParseUUIDPipe) postId: string) {
    const response = await this.likesService.findAllByPostId(postId);

    return {
      message: 'Fetched all post likes',
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    const response = await this.likesService.findAllByUserId(userId);

    return {
      message: 'Fetched all',
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Delete('post/:postId')
  async delete(
    @GetUser() user: User,
    @Param('postId', ParseUUIDPipe) postId: string,
  ) {
    await this.likesService.delete(user.id, postId);

    return {
      message: 'Like deleted',
      status: HttpStatus.OK,
      data: null,
    };
  }

  @Get('/post/count/:postId')
  async countByPostId(@Param('postId', ParseUUIDPipe) postId: string) {
    const response = await this.likesService.countByPostId(postId);

    return {
      message: 'Counting done',
      status: HttpStatus.OK,
      data: { count: response },
    };
  }

  @Get('check/:postId')
  @UseGuards(JwtAuthGuard)
  async checkUserLike(@GetUser() user: User, @Param('postId') postId: string) {
    const response = await this.likesService.hasUserLikedPost(user.id, postId);

    return {
      message: 'Done',
      status: HttpStatus.OK,
      data: { hasLiked: response },
    };
  }
}
