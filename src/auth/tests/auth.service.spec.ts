import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { UserEntity } from '../../users/entities/user.entity';
import { AccountsService } from '../../users/providers/accounts.service';
import { AuthService } from '../auth.service';
import { LoginDTO } from '../dto/login.dto';
import { TokenEntity } from '../entities/token.entity';

describe('Auth Service', () => {
  let authService: AuthService;
  let accountsService: AccountsService;
  let tokenMockRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AccountsService,
          useValue: { findOneByUserName: () => UserEntity },
        },
        {
          provide: JwtService,
          useValue: { signAsync: async () => String },
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    authService = module.get<AuthService>(AuthService);
    tokenMockRepository = module.get<MockRepository>(
      getRepositoryToken(TokenEntity),
    );
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(tokenMockRepository).toBeDefined();
    expect(accountsService).toBeDefined();
  });

  describe('validate user', () => {
    describe('success', () => {
      it('match credentials', async () => {
        const loginDTO: LoginDTO = { username: 'gm', password: 'tarea6secret' };
        const registeredUser = {
          password:
            '$2b$10$TlE9g55QPrr4wLdi43VY/Oz8dCfyUX1ug1VGUkAeUjgxCCFGLff5O',
        };

        (await accountsService.findOneByUserName(loginDTO.username)).password =
          registeredUser.password;

        const data = await authService.validateUser(loginDTO);
        expect(data).toBeDefined();
      });
    });

    describe('fail', () => {
      it('no match credentials', async () => {
        const loginDTO: LoginDTO = { username: 'gm', password: '123' };

        try {
          await authService.validateUser(loginDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(UnauthorizedException);
        }
      });

      it('internal error', async () => {
        const loginDTO: LoginDTO = { username: 'gm', password: '123' };

        try {
          (
            await accountsService.findOneByUserName(loginDTO.username)
          ).password = undefined;

          await authService.validateUser(loginDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
        }
      });
    });
  }); // end of validate user

  describe('login', () => {
    describe('success', () => {
      it('match credentials', async () => {
        const loginDTO: LoginDTO = { username: 'gm', password: 'tarea6secret' };
        const registeredUser = {
          password:
            '$2b$10$TlE9g55QPrr4wLdi43VY/Oz8dCfyUX1ug1VGUkAeUjgxCCFGLff5O',
        };

        (await accountsService.findOneByUserName(loginDTO.username)).password =
          registeredUser.password;

        const data = await authService.login(loginDTO);
        expect(data).toBeDefined();
      });
    });
  });

  describe('logout', () => {
    it('success', async () => {
      const token = '';

      tokenMockRepository.findOne.mockReturnValue({});
      const data = await authService.logout(token);
      expect(data).toBeTruthy();
    });
  });
});
