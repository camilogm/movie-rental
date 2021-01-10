import { Injectable } from '@nestjs/common';
import { MailerService as MailerNestService } from '@nestjs-modules/mailer';
import { ConfigMailDTO } from './dto/config-mail.dto';

@Injectable()
export class MailerCustomService {
  constructor(private readonly mailerService: MailerNestService) {}

  async sendMail(config: ConfigMailDTO) {
    try {
      await this.mailerService.sendMail({ ...config });
      return true;
    } catch (error) {
      //make a logger
      console.log(error);
      return false;
    }
  }
}
