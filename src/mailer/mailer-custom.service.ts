import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as MailerNestService,
} from '@nestjs-modules/mailer';
@Injectable()
export class MailerCustomService {
  constructor(private readonly mailerService: MailerNestService) {}

  async sendMail(config: ISendMailOptions) {
    try {
      await this.mailerService.sendMail({ ...config });
      return true;
    } catch (error) {
      //make a logger
      return false;
    }
  }
}
