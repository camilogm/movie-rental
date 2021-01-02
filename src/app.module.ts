import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExceptionsFilter } from './common/filters/type-orm-exceptions.filter';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { OwnProfileChangesGuard } from './auth/guards/own-profile-changes.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { RentBuyMovieModule } from './rent-buy-movies/rent-buy.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    MoviesModule,
    AuthModule,
    RentBuyMovieModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: OwnProfileChangesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
