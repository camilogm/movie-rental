import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/users/providers/accounts.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { classToPlain, plainToClass } from 'class-transformer';
import { PayloadDTO } from './dto/payload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async validateUser(loginDTO: LoginDTO) {
    try {
      const { username, password } = loginDTO;
      const user = await this.accountsService.findOneByUserName(username);

      const matchUser = await bcrypt.compare(password, user?.password);
      if (matchUser) {
        return user;
      }
    } catch (error) {}

    throw new UnauthorizedException();
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);
    const plainUser = classToPlain(user);

    const payload = plainToClass(PayloadDTO, plainUser, {
      excludeExtraneousValues: true,
    });
    const jwt = await this.jwtService.signAsync({ ...payload });
    const token = this.tokenRepository.create({
      user,
      token: jwt,
      createAt: moment().format(),
    });

    await this.tokenRepository.save(token);

    return {
      jwt,
    };
  }
}
