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
import { RentBuyController } from './controllers/rent-buy.controller';
import { RentBuyService } from './providers/rent-buy.service';
import { UsersModule } from '../users/users.module';
import { RentBuyEntity } from './entities/rent-buy.entity';

@Module({
  controllers: [MoviesController, TagsController, RentBuyController],
  providers: [
    MoviesService,
    TagsService,
    MoviesStatesProviders,
    RentBuyService,
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([MovieEntity, TagEntity, RentBuyEntity]),
    MovieSuscriber,
  ],
})
export class MoviesModule {}
