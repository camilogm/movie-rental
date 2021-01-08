import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection, LessThan } from 'typeorm';
import * as moment from 'moment';
import { TokenPasswordEntity } from './entities/token-password.entity';
import { MINUTES_EXPIRES_TOKEN_RECOVERY_PASSWORD } from '../constants';

/**
 * deletes tokens to recovery password that are expired
 */
@Injectable()
export class DeleteTokenRecoveyTask {
  constructor(private readonly connection: Connection) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const tokenRepository = this.connection.getRepository(TokenPasswordEntity);
    const minutesAllowed = moment()
      .subtract(MINUTES_EXPIRES_TOKEN_RECOVERY_PASSWORD, 'minutes')
      .format();

    const tokensExpired = await tokenRepository.find({
      where: {
        createAt: LessThan(minutesAllowed),
      },
    });

    await tokenRepository.remove(tokensExpired);
  }
}
