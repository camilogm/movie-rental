import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ROLES_PROVIDER } from '../../constants';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { AccountsService } from '../providers/accounts.service';
import { AccountsController } from '../accounts.controller';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { RolesDTO } from '../dto/roles.dto';

describe('UsersService', () => {
  let accountsService: AccountsService;
  let userRepository: MockRepository;
  let rolesProvider: RolesDTO;

  beforeEach(async () => {
    const roles = new RolesDTO(
      new RoleEntity(1, 'SUPERADMIN'),
      new RoleEntity(2, 'ADMIN'),
      new RoleEntity(3, 'CLIENT'),
    );

    const module = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMockRepository(),
        },
        { provide: ROLES_PROVIDER, useValue: roles },
      ],
      controllers: [AccountsController],
    }).compile();

    userRepository = module.get<MockRepository>(getRepositoryToken(UserEntity));
    accountsService = module.get<AccountsService>(AccountsService);
    rolesProvider = module.get<RolesDTO>(ROLES_PROVIDER);
  });

  it('should be defined', () => {
    expect(accountsService).toBeDefined();
    expect(rolesProvider).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user account exists', () => {
      it(`must throw when the username doesn't exist`, async () => {
        const userName = 'gmcamiloe';
        userRepository.findOne.mockReturnValue(undefined);
        try {
          await accountsService.findOneByUserName(userName);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('otherwise', () => {
      it(`must throw when the userid doesn't exist`, async () => {
        userRepository.findOne.mockReturnValue(undefined);
        try {
          await accountsService.findOneByUserName('username');
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });

      it('must throw type error', async () => {
        userRepository.findOne.mockReturnValue({});
        try {
          await accountsService.findOneByUserName('username');
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //ends findOne
});
