import { Module } from '@nestjs/common';
import { MoviesService } from './providers/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { TagEntity } from './entities/tag.entity';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './providers/tags.service';
import { MovieSuscriber } from './suscribers/movie.suscriber';
import { MoviesStatesProviders } from './providers/movies-state.provider';
import { ClientOperationsController } from './controllers/client-operations.controller';
import { ClientOperationsService } from './providers/client-operations.service';
import { UsersModule } from 'src/users/users.module';
import { RentBuyEntity } from './entities/rent-buy.entity';

@Module({
  controllers: [MoviesController, TagsController, ClientOperationsController],
  providers: [
    MoviesService,
    TagsService,
    MoviesStatesProviders,
    ClientOperationsService,
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([MovieEntity, TagEntity, RentBuyEntity]),
    MovieSuscriber,
  ],
})
export class MoviesModule {}
