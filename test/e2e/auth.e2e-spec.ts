import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserEntity } from '../../src/users/entities/user.entity';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../src/users/entities/role.entity';
import { UsersModule } from '../../src/users/users.module';

class JWTResposneDTO {
  jwt: string;
}

describe('auth endpoints', () => {
  let app: INestApplication;
  const authService = {
    validateUser: async () => UserEntity,
    login: async () => JWTResposneDTO,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it(`/POST login`, () => {
    return request(app.getHttpServer()).post('/login').expect(200).expect({
      data: authService.login(),
    });
  });
});
