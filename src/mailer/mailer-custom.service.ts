import { Injectable, Logger } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as MailerNestService,
} from '@nestjs-modules/mailer';
@Injectable()
export class MailerCustomService {
  private readonly logger = new Logger(MailerCustomService.name);

  constructor(private readonly mailerService: MailerNestService) {}

  async sendMail(config: ISendMailOptions) {
    try {
      await this.mailerService.sendMail({ ...config });
      return true;
    } catch (error) {
      //make a logger
      this.logger.error(error);
      return false;
    }
  }
}
