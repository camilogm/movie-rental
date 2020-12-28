import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ROLES_PROVIDER } from '../../constants';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user-dtos/create-user.dto';
import { UpdateUserDto } from '../dto/user-dtos/update-user.dto';
import { Role } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { AccountsService } from '../providers/accounts.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
});

describe('UsersService', () => {
  let service: AccountsService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Role), useValue: createMockRepository() },
        { provide: ROLES_PROVIDER, useValue: [0, 1] },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    userRepository = module.get<MockRepository>(getRepositoryToken(UserEntity));
  });

  it('user service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user account exists', () => {
      it('should a user by a userId', async () => {
        const userId = 1;
        const expectedUser = {};
        userRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findOneById(userId);
        expect(user).toEqual(expectedUser);
      });

      it('should return a user by an username ', async () => {
        const userName = 'gmcamiloe';
        const expectedUser = {};
        userRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findOneByUserName(userName);
        expect(user).toEqual(expectedUser);
      });
    });

    describe('otherwise', () => {
      it(`must throw when the userid doesn't exist`, async () => {
        const userId = 1;
        userRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOneById(userId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });

      it(`must throw when the username doesn't exist`, async () => {
        const userName = 'gmcamiloe';
        userRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOneByUserName(userName);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); //ends findOne

  describe('createOne', () => {
    describe('success create user', () => {
      it('client created', async () => {
        const user: CreateUserDto = {
          userName: 'gmcamiloe',
          firstName: 'Camilo',
          lastName: 'Gonzalez',
          password: '123',
        };

        const expectedResult: UserEntity = {
          id: 1,
          ...user,
          role: new Role(3, 'CLIENT'),
        };

        userRepository.save.mockReturnValue(expectedResult);
        const userCreated = await service.createClient(user);

        expect(userCreated).toEqual(expectedResult);
      });
    });

    describe('failed create client', () => {
      it('must be a throw exception ', async () => {
        const user: CreateUserDto = {
          userName: 'gmcamiloe',
          firstName: 'Camilo',
          lastName: 'Gonzalez',
          password: '123',
        };

        userRepository.save.mockReturnValue(undefined);
        try {
          await service.createClient(user);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of create one

  describe('updateOne', () => {
    describe('success edit account', () => {
      it('updated account client', async () => {
        const id = 1;

        const registeredUser = {
          id,
          userName: 'gmcamiloe',
          firstName: 'Camilo',
          lastName: 'Gonzalez',
          role: new Role(3, 'CLIENT'),
        };

        const updatedUserData: UpdateUserDto = {
          firstName: 'Juan',
        };

        const expectedData = {
          ...registeredUser,
          ...updatedUserData,
        };

        userRepository.save.mockReturnValue(expectedData);
        const userUpdated = await service.update(id, updatedUserData);

        expect(userUpdated).toEqual(expectedData);
      });
    });

    describe('throw edit account', () => {
      it('failed edit account', async () => {
        const id = 1;

        const updatedUserData: UpdateUserDto = {};

        userRepository.save.mockReturnValue(undefined);
        try {
          await service.update(id, updatedUserData);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });

      it(`profile doesn't exit`, async () => {
        const id = 1;
        const updateUserDto: UpdateUserDto = {};
        try {
          await service.update(id, updateUserDto);
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
        const deletedUser = await service.remove(id);
        expect(deletedUser).toBeTruthy();
      });
    });

    describe('throw removed user', () => {
      it('throw removing client', async () => {
        const id = 1;
        try {
          await service.remove(id);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });

      it(`userid doesn't exist`, async () => {
        const id = 1;
        try {
          await service.remove(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); //end of delete user
});
