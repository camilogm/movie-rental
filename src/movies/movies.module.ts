import { Module } from '@nestjs/common';
import { MoviesService } from './providers/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { TagEntity } from './entities/tag.entity';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './providers/tags.service';

@Module({
  controllers: [MoviesController, TagsController],
  providers: [MoviesService, TagsService],
  imports: [TypeOrmModule.forFeature([MovieEntity, TagEntity])],
})
export class MoviesModule {}
