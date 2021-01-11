import { MailerModule as MailerNestModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ENV } from '../constants';
import { MailerCustomService } from './mailer-custom.service';

const MailerModuleConfig = MailerNestModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const templatePath = join(__dirname, '..', '..', '..', 'templates');

    return {
      transport: configService.get<string>(ENV.EMAIL_TRANSPORT),
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

@Module({
  imports: [MailerModuleConfig],
  providers: [MailerCustomService],
  exports: [MailerCustomService],
})
export class MailerModule {}
