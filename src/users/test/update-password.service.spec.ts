import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  mockQueryBuilder,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { ResetPasswordDTO } from '../dto/user-dtos/reset-password.dto';
import { TokenPasswordEntity } from '../entities/token-password.entity';
import { UserEntity } from '../entities/user.entity';
import { AccountsService } from '../providers/accounts.service';
import { UpdatePasswordService } from '../providers/update-password.service';
import * as moment from 'moment';
import {
  ConflictException,
  GoneException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailerCustomService } from '../../mailer/mailer.service';

const email = 'mock@mock.com';
const userMock = new UserEntity();
userMock.email = email;
userMock.userName = 'gmcamiloe';

const tokenPasswordMockRepository = <T = any>(): MockRepository<T> => ({
  ...createMockRepository(),
  createQueryBuilder: jest.fn(() => ({
    ...mockQueryBuilder(),
    getOne: () => {
      return {
        user: userMock,
      };
    },
  })),
});

describe('UpdatePassword Service', () => {
  let updatePasswordService: UpdatePasswordService;
  let tokenPasswordMock: MockRepository;
  let userMockRepository: MockRepository;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdatePasswordService,
        {
          provide: AccountsService,
          useValue: {
            findOneById: async () => new UserEntity(),
            findOneByUserName: async () => userMock,
            updateByEntity: async () => new UserEntity(),
          },
        },
        {
          provide: MailerCustomService,
          useValue: { sendMail: () => Boolean },
        },
        {
          provide: getRepositoryToken(TokenPasswordEntity),
          useValue: tokenPasswordMockRepository(),
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    updatePasswordService = module.get<UpdatePasswordService>(
      UpdatePasswordService,
    );
    tokenPasswordMock = module.get<MockRepository>(
      getRepositoryToken(TokenPasswordEntity),
    );
    userMockRepository = module.get<MockRepository>(
      getRepositoryToken(UserEntity),
    );
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(updatePasswordService).toBeDefined();
    expect(tokenPasswordMock).toBeDefined();
    expect(userMockRepository).toBeDefined();
    expect(accountsService).toBeDefined();
  });

  describe('Change password', () => {
    const id = 1;
    const password = '';
    const expectedData = {};

    describe('success', () => {
      it('changed', async () => {
        userMockRepository.findOne.mockReturnValue(expectedData);
        userMockRepository.save.mockReturnValue(expectedData);
        const data = await updatePasswordService.changePassword(id, password);

        expect(data).toEqual(expectedData);
      });
    });

    describe('failed', () => {
      it('Not found', async () => {
        userMockRepository.findOne.mockReturnValue(undefined);

        try {
          await updatePasswordService.changePassword(id, password);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });

      it('Type error', async () => {
        userMockRepository.findOne.mockReturnValue(expectedData);
        userMockRepository.save.mockReturnValue(expectedData);
        try {
          await updatePasswordService.changePassword(id, password);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  });

  describe('Recovery password', () => {
    const userName = 'gmcamiloe';
    const tokenExpected = { token: '' };

    describe('succes', () => {
      it('Success', async () => {
        tokenPasswordMock.save.mockReturnValue(tokenExpected);
        const data = await updatePasswordService.recoveryPassword(userName);
        expect(data).toBeTruthy();
      });
    });

    describe('fail', () => {
      it('Not reach email or connection', async () => {
        tokenPasswordMock.save.mockReturnValue(tokenExpected);
        try {
          await updatePasswordService.recoveryPassword(userName);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
          expect(error).toBeInstanceOf(ConflictException);
        }
      });

      it('Not found user', async () => {
        tokenPasswordMock.createQueryBuilder = jest.fn(() => ({
          ...mockQueryBuilder(),
          getOne: () => undefined,
        }));

        accountsService.findOneByUserName = () => {
          throw new NotFoundException();
        };
        userMockRepository.findOne.mockReturnValue(undefined);
        try {
          await updatePasswordService.recoveryPassword(userName);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('reset password', () => {
    const token = '';
    const expectedToken = {
      token,
      createAt: new Date(moment().format()),
      user: userMock,
    };
    const resetPasswordDTO: ResetPasswordDTO = {
      password: '',
      username: 'gmcamiloe',
    };

    describe('success', () => {
      it('success', async () => {
        tokenPasswordMock.findOne.mockReturnValue(expectedToken);
        const data = await updatePasswordService.resetPassword(
          token,
          resetPasswordDTO,
        );
        expect(data).toBeTruthy();
      });
    });

    describe('otherwise', () => {
      it('Not found token', async () => {
        tokenPasswordMock.findOne.mockReturnValue(undefined);
        try {
          await updatePasswordService.resetPassword(token, resetPasswordDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(GoneException);
        }
      });

      it('token expired', async () => {
        const expiredToken = {
          ...expectedToken,
          createAt: new Date(moment().subtract(11, 'minutes').format()),
        };
        tokenPasswordMock.findOne.mockReturnValue(expiredToken);
        try {
          await updatePasswordService.resetPassword(token, resetPasswordDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(GoneException);
        }
      });

      it('not match userName', async () => {
        const notMatchedUser: ResetPasswordDTO = {
          ...resetPasswordDTO,
          username: 'otherAccount',
        };
        tokenPasswordMock.findOne.mockReturnValue(expectedToken);
        try {
          await updatePasswordService.resetPassword(token, notMatchedUser);
        } catch (error) {
          expect(error).toBeInstanceOf(UnauthorizedException);
        }
      });

      it('type error', async () => {
        tokenPasswordMock.findOne.mockReturnValue(expectedToken);
        try {
          await updatePasswordService.resetPassword(token, resetPasswordDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  });
});
