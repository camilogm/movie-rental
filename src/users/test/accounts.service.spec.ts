import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ROLES_PROVIDER } from '../../constants';
import { CreateUserDto } from '../dto/user-dtos/create-user.dto';
import { UpdateUserDto } from '../dto/user-dtos/update-user.dto';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { AccountsService } from '../providers/accounts.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { RolesDTO } from '../dto/roles.dto';

const user: CreateUserDto = {
  userName: 'gmcamiloe',
  firstName: 'Camilo',
  lastName: 'Gonzalez',
  password: '123',
  email: 'gmcamiloe@gmail.com',
};

describe('Accounts service', () => {
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
      it('should a user by a userId', async () => {
        const expectedUser = {};
        const id = 1;
        userRepository.findOne.mockReturnValue(expectedUser);

        const user = await accountsService.findOneById(id);
        expect(user).toEqual(expectedUser);
      });

      it('should return a user by an username ', async () => {
        const userName = 'gmcamiloe';
        const expectedUser = {};
        userRepository.findOne.mockReturnValue(expectedUser);
        const user = await accountsService.findOneByUserName(userName);
        expect(user).toEqual(expectedUser);
      });
    });

    describe('otherwise', () => {
      it(`must throw when the userid doesn't exist`, async () => {
        const id = 1;
        userRepository.findOne.mockReturnValue(undefined);
        try {
          await accountsService.findOneById(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });

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
  }); //ends findOne

  describe('createOne', () => {
    describe('success create user', () => {
      it('client created', async () => {
        const expectedResult: UserEntity = {
          id: 1,
          ...user,
          role: rolesProvider.CLIENT,
        };

        userRepository.save.mockReturnValue(expectedResult);
        const userCreated = await accountsService.createClient(user);

        expect(userCreated).toEqual(expectedResult);
      });
    });

    describe('failed create client', () => {
      it('must be a throw exception ', async () => {
        userRepository.save.mockReturnValue(undefined);
        try {
          await accountsService.createClient(user);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of create one

  describe('updateOne', () => {
    describe('success edit account', () => {
      it('updated account client', async () => {
        const id = '1';

        const registeredUser = {
          id,
          userName: 'gmcamiloe',
          firstName: 'Camilo',
          lastName: 'Gonzalez',
          role: rolesProvider.CLIENT,
        };

        const updatedUserData: UpdateUserDto = {
          firstName: 'Juan',
        };

        const expectedData = {
          ...registeredUser,
          ...updatedUserData,
        };

        userRepository.findOne.mockReturnValue(expectedData);
        userRepository.save.mockReturnValue(expectedData);
        const userUpdated = await accountsService.updateById(
          Number(id),
          updatedUserData,
        );

        expect(userUpdated).toEqual(expectedData);
      });
    });

    describe('throw edit account', () => {
      it(`profile doesn't exit`, async () => {
        const id = 1;
        const updateUserDto: UpdateUserDto = {};
        try {
          await accountsService.updateById(id, updateUserDto);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); //end of update user

  describe('delete account', () => {
    describe('removed sucess user', () => {
      it('removed client', async () => {
        const id = 1;
        userRepository.findOne.mockReturnValue({});

        const deletedUser = await accountsService.remove(id);
        expect(deletedUser).toBeTruthy();
      });
    });

    describe('throw removed user', () => {
      it(`userid doesn't exist`, async () => {
        const id = 1;
        try {
          await accountsService.remove(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); //end of delete user

  describe('change role user', () => {
    describe('success', () => {
      it('change to admin', async () => {
        const idUser = '3';
        const idRole = '2';

        const expectedData: UserEntity = {
          id: 1,
          ...user,
          role: rolesProvider.ADMIN,
        };

        userRepository.findOne.mockReturnValue(expectedData);
        userRepository.save.mockReturnValue(expectedData);
        const data = await accountsService.updateRole(
          Number(idUser),
          Number(idRole),
        );
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed', () => {
      it('trying to change admin', async () => {
        const idUser = '1';
        const idRole = '2';

        userRepository.findOne.mockReturnValue({});
        try {
          await accountsService.updateRole(Number(idUser), Number(idRole));
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });

      it('tryng to add more superadmin', async () => {
        const idUser = '2';
        const idRole = '1';

        userRepository.findOne.mockReturnValue({});
        try {
          await accountsService.updateRole(Number(idUser), Number(idRole));
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });

      it('type error', async () => {
        const idUser = '3';
        const idRole = '2';

        userRepository.findOne.mockReturnValue({});
        userRepository.save.mockReturnValue({});

        try {
          await accountsService.updateRole(Number(idUser), Number(idRole));
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of change role
});
