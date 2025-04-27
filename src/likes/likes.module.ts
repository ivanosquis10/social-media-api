import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesController } from './controllers/likes.controller';
import { LikesService } from './services/likes.service';
import { Posts } from '../posts/entities/posts.entity';
import { Like } from './entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Posts])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
