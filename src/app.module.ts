import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmExceptionsFilter } from './common/filters/type-orm-exceptions.filter';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { OwnProfileChangesGuard } from './auth/guards/own-profile-changes.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { RentBuyMovieModule } from './rent-buy-movies/rent-buy.module';
import { MailerModule } from './mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigEnvModule } from './config/config-env.module';
import { TypeORMConfigModule } from './config/type-orm-config.module';

@Module({
  imports: [
    UsersModule,
    ConfigEnvModule,
    TypeORMConfigModule,
    ScheduleModule.forRoot(),
    MoviesModule,
    AuthModule,
    RentBuyMovieModule,
    MailerModule,
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
