import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import {
  ALL_ROLES,
  ROLE_CLIENT,
  ROLE_SUPER_ADMIN,
} from '../../common/decorators/authorization.decorator';
import { RolesGuard } from '../guards/roles.guard';

interface ExecutionContext {
  switchToHttp(): any;
  getHandler(): any;
  getClass(): any;
  getArgs(): any;
  getArgByIndex(): any;
  switchToRpc(): any;
  switchToWs(): any;
  getType(): any;
}

interface Reflector {
  get(): any;
  getAll(): any;
  getAllAndMerge(): any;
  getAllAndOverride(): any;
}

const MockedContext: ExecutionContext = {
  getHandler: () => undefined,
  switchToHttp: () => HttpAdapterHost,
  getClass: jest.fn(),
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

const MockedReflector: Reflector = {
  get: () => undefined,
  getAll: jest.fn(),
  getAllAndMerge: jest.fn(),
  getAllAndOverride: jest.fn(),
};

describe('Roles guard ', () => {
  let rolesGuard: RolesGuard;
  let connectionMock: Connection;

  beforeEach(async () => {
    const mockConnection = () => ({
      transaction: jest.fn(),
    });

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile();

    connectionMock = module.get<Connection>(Connection);
    rolesGuard = new RolesGuard(MockedReflector, connectionMock);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
    expect(connectionMock).toBeDefined();
  });

  describe('allowed roles', () => {
    it('get a handler without metadata', async () => {
      const context = MockedContext;
      context.getHandler = () => undefined;
      const reflector = MockedReflector;
      reflector.get = () => undefined;

      const rolesGuard = new RolesGuard(reflector, connectionMock);

      const roles = rolesGuard.getAllowedRoles(context);
      expect(roles).toEqual(ALL_ROLES);
    });

    it('get handler with roles', async () => {
      const context = MockedContext;
      context.getHandler = () => ['SUPERADMIN', 'CLIENT'];
      const reflector = MockedReflector;
      reflector.get = () => context.getHandler();

      const rolesGuard = new RolesGuard(reflector, connectionMock);

      const roles = rolesGuard.getAllowedRoles(context);

      expect(roles).toEqual([ROLE_SUPER_ADMIN, ROLE_CLIENT]);
    });
  });
});
