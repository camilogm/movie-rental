import { ConfigModule } from '@nestjs/config';
import configuration from './config';

export const ConfigEnvModule = ConfigModule.forRoot({
  load: [
    () => {
      const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
      switch (env) {
        case 'development':
          return;
        case 'production':
          return configuration();
      }
    },
  ],
  ignoreEnvFile: (() => {
    const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

    if (env === 'development') return false;

    return true;
  })(),
});
