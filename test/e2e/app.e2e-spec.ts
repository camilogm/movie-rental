import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        {
          module: AppModule,
          imports: [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'camilo',
              password: '123',
              database: 'rental-movies-dump',
              entities: ['src/**/*.entity{.ts,.js}'],
              autoLoadEntities: true,
            }),
          ],
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.listen(3000);
    await app.init();
  });

  it('should be defined', async () => {
    expect(app).toBeDefined();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1/movies').expect(200);
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
