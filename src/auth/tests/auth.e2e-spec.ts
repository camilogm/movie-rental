import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import request from 'supertest';

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
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/POST login`, () => {
    return request(app.getHttpServer()).post('/login').expect(200).expect({
      data: authService.login(),
    });
  });
});
