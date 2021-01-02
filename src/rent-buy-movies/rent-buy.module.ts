import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from '../movies/movies.module';
import { UsersModule } from '../users/users.module';
import { RentBuyEntity } from './entities/rent-buy.entity';
import { MoviesStatesProviders } from './providers/movies-state.provider';
import { RentBuyService } from './providers/rent-buy.service';
import { RentBuyController } from './rent-buy.controller';

@Module({
  controllers: [RentBuyController],
  providers: [MoviesStatesProviders, RentBuyService],
  imports: [
    TypeOrmModule.forFeature([RentBuyEntity]),
    UsersModule,
    MoviesModule,
  ],
})
export class RentBuyMovieModule {}
