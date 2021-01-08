import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from '../../src/movies/movies.module';
import * as request from 'supertest';
import { MoviesService } from '../../src/movies/providers/movies.service';
import { PayloadDTO } from '../../src/auth/dto/payload.dto';

const payload: PayloadDTO = {
  sub: 2,
  username: 'gmcamiloe',
  userRole: 'CLIENT',
};
const mock_SuccessJWTGuard: CanActivate = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = payload;

    return true;
  },
};

describe('Movie controller', () => {
  let app: INestApplication;
  let movieService: MoviesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        {
          module: MoviesModule,
          imports: [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'camilo',
              password: '123',
              database: 'movierental_dump',
              entities: ['src/**/*.entity{.ts,.js}'],
              autoLoadEntities: true,
            }),
          ],
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalGuards(mock_SuccessJWTGuard);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
    app.setGlobalPrefix('');
    movieService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(movieService).toBeDefined();
  });

  it('/GET movies', async () => {
    const response = await request(app.getHttpServer()).get('/movies');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(await movieService.findFilterMovies());
  });

  it('/GET moviedetail', async () => {
    const id = 1;
    const response = await request(app.getHttpServer()).get(`/movies/${id}`);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(await movieService.findOneById(id));
  });

  describe('(POST) /movie', () => {
    describe('success', () => {
      it('/POST create movie', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await request(app.getHttpServer())
          .post('/movies')
          .send({});
      });
    });

    describe('failed', () => {
      it('/bad body', async () => {
        const response = await request(app.getHttpServer())
          .post('/movies')
          .send({});

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
