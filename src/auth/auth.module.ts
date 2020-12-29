import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV_CONSTS, MINUTES_EXPIRES_TOKEN } from 'src/constants';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenEntity } from './entities/token.entity';
import { JwtStrategy } from './jwt.strategy';

const JWTProvider = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>(ENV_CONSTS.JWT_SECRET),
    signOptions: {
      expiresIn: `${MINUTES_EXPIRES_TOKEN}m`,
    },
  }),
});

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    ConfigModule,
    JWTProvider,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
})
export class AuthModule {}
