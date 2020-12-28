import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExceptionsFilter } from './global/filters/type-orm-exceptions.filter';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), TypeOrmModule.forRoot(), MoviesModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionsFilter,
    },
  ],
})
export class AppModule {}
