import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ENV_CONSTS } from './constants';

export const MailerModuleConfig = MailerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const templatePath = join(__dirname, '..', '..', 'templates');

    return {
      transport: configService.get<string>(ENV_CONSTS.EMAIL_TRANSPORT),
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: templatePath,
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    };
  },
});
