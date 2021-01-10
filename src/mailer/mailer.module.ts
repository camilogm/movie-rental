import { MailerModule as MailerNestModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ENV_CONSTS } from '../constants';
import { MailerCustomService } from './mailer.service';

const MailerModuleConfig = MailerNestModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const templatePath = join(__dirname, '..', '..', '..', 'templates');
    console.log(templatePath);
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

@Module({
  imports: [MailerModuleConfig],
  providers: [MailerCustomService],
  exports: [MailerCustomService],
})
export class MailerModule {}
