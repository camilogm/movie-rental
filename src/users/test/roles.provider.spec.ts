import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ROLES_PROVIDER } from '../../constants';
import { RolesDTO } from '../dto/roles.dto';
import { RoleEntity } from '../entities/role.entity';
import { RolesDBProvider } from '../providers/roles.provider';

describe('roles provider', () => {
  let rolesProvider: RolesDTO;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'camilo',
          password: '123',
          database: 'moviesrental_dump',
          entities: ['src/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
        }),
      ],
      providers: [RolesDBProvider],
    }).compile();

    rolesProvider = module.get<RolesDTO>(ROLES_PROVIDER);
  });

  it('should be defined', () => {
    expect(rolesProvider).toBeDefined();
  });

  it('should be', () => {
    const roles = new RolesDTO(
      new RoleEntity(1, 'SUPERADMIN'),
      new RoleEntity(2, 'ADMIN'),
      new RoleEntity(3, 'CLIENT'),
    );

    expect(roles).toEqual(rolesProvider);
  });

  afterAll(async () => {
    if (module) await module.close();
  });
});
