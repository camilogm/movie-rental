import {
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenPasswordEntity } from '../entities/token-password.entity';
import { AccountsService } from './accounts.service';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { ResetPasswordDTO } from '../dto/user-dtos/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { MINUTES_EXPIRES_TOKEN_RECOVERY_PASSWORD } from '../../constants';
import { MailerCustomService } from '../../mailer/mailer-custom.service';

@Injectable()
export class UpdatePasswordService {
  constructor(
    private readonly accountsService: AccountsService,
    @InjectRepository(TokenPasswordEntity)
    private readonly tokenPasswordRepository: Repository<TokenPasswordEntity>,
    private readonly mailService: MailerCustomService,
  ) {}

  async changePassword(idUser: number, newPassword: string) {
    const [user, password] = await Promise.all([
      this.accountsService.findOneById(idUser),
      bcrypt.hash(newPassword, 10),
    ]);

    return await this.accountsService.updateByEntity(user, {
      password,
    });
  }

  async recoveryPassword(userName: string) {
    const currentRecoveryToken = await this.tokenPasswordRepository
      .createQueryBuilder('TokensPassword')
      .leftJoinAndSelect(
        'TokensPassword.user',
        'user',
        'user.userName = :userName',
        { userName },
      )
      .getOne();

    const promiseUser = currentRecoveryToken
      ? currentRecoveryToken.user
      : this.accountsService.findOneByUserName(userName);

    const deleteCurrentToken = currentRecoveryToken
      ? this.tokenPasswordRepository.remove(currentRecoveryToken)
      : null;

    const [user] = await Promise.all([promiseUser, deleteCurrentToken]);

    const newPasswordToken = await this.tokenPasswordRepository.save({
      createAt: moment().format(),
      token: uuid(),
      user,
    });

    return await this.mailService.sendMail({
      to: user.email,
      from: 'no-reply',
      subject: 'Recovery password',
      template: 'recovery-password',
      context: { token: newPasswordToken.token },
    });
  }

  async resetPassword(tokenStr: string, resetPasswordDTO: ResetPasswordDTO) {
    const tokenPasswordQuery = this.tokenPasswordRepository.findOne({
      where: { token: tokenStr },
      relations: ['user'],
    });

    const [token, password] = await Promise.all([
      tokenPasswordQuery,
      bcrypt.hash(resetPasswordDTO.password, 10),
    ]);

    const user = token?.user;
    const tokenExpired = moment(token?.createAt).isAfter(
      moment().subtract(MINUTES_EXPIRES_TOKEN_RECOVERY_PASSWORD, 'minutes'),
    );

    if (!token || !tokenExpired)
      throw new GoneException(
        `It seems the token is expired or doen't exist. Ask for new one`,
      );
    if (user?.userName !== resetPasswordDTO.username)
      throw new UnauthorizedException(`The userName doesn't match`);

    const updateUser = this.accountsService.updateByEntity(user, {
      password,
    });

    const deleteToken = this.tokenPasswordRepository.remove(token);

    await Promise.all([updateUser, deleteToken]);
    return true;
  }
}
