import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '../constants';

export const TypeORMConfigModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    if (configService.get<string>(ENV.ENVIROMENT) === 'development') return;

    return {
      type: 'postgres',
      ...configService.get(ENV.DB_CONFIGURATION),
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      logger: 'file',
      logging: true,
    };
  },
});
