import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection, LessThan } from 'typeorm';
import * as moment from 'moment';
import { MINUTES_EXPIRES_TOKEN_JWT } from 'src/constants';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class DeleteTokenTask {
  constructor(private readonly connection: Connection) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const tokenRepository = this.connection.getRepository(TokenEntity);
    const minutesAllowed = moment()
      .subtract(MINUTES_EXPIRES_TOKEN_JWT, 'minutes')
      .format();

    const tokensExpired = await tokenRepository.find({
      where: {
        createAt: LessThan(minutesAllowed),
      },
    });

    await tokenRepository.remove(tokensExpired);
  }
}
