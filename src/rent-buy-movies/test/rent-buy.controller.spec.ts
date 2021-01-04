import { Test } from '@nestjs/testing';
import { MoviesService } from '../../movies/providers/movies.service';
import { AccountsService } from '../../users/providers/accounts.service';
import { RentBuyService } from '../providers/rent-buy.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { RentBuyEntity } from '../entities/rent-buy.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRentBuy } from '../dto/create-rent-buy.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RentBuyController } from '../rent-buy.controller';
import { PayloadDTO } from '../../auth/dto/payload.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { STATES_MOVIES_PROVIDER } from '../../constants';

const payLoad: PayloadDTO = {
  sub: 1,
  username: 'test',
  userRole: 'CLIENT',
};

const request = {
  user: payLoad,
};

describe('rentbuy service', () => {
  let rentBuyController: RentBuyController;
  let rentBuyMockRepository: MockRepository;
  let moviesRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RentBuyController],
      providers: [
        {
          provide: MailerService,
          useValue: { sendMail: jest.fn() },
        },
        RentBuyService,
        {
          provide: AccountsService,
          useValue: { findOneById: () => UserEntity },
        },
        {
          provide: MoviesService,
          useValue: {
            findOneById: () => MovieEntity,
            updateByEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(RentBuyEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
        {
          provide: STATES_MOVIES_PROVIDER,
          useValue: {
            RENT: {},
            BUY: {},
            DELAYED: {},
            RETURNED: {},
          },
        },
      ],
    }).compile();

    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    rentBuyController = module.get<RentBuyController>(RentBuyController);
    rentBuyMockRepository = module.get<MockRepository>(
      getRepositoryToken(RentBuyEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuyController).toBeDefined();
    expect(rentBuyMockRepository).toBeDefined();
    expect(moviesRepository).toBeDefined();
  });

  describe('buy or rent movie', () => {
    describe('success ', () => {
      it('rent movie', async () => {
        const rentMovieDTo: CreateRentBuy = {
          movieId: 1,
        };
        const expectedData = { movie: {} };

        rentBuyMockRepository.create.mockReturnValue(expectedData);
        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuyController.clientRentMovie(
          request,
          rentMovieDTo,
        );

        expect(data).toEqual(expectedData);
      });

      it('buy movie', async () => {
        const rentMovieDTO: CreateRentBuy = {
          movieId: 1,
        };
        const expectedData = { movie: {} };

        rentBuyMockRepository.create.mockReturnValue(expectedData);
        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuyController.clientBuyMovie(
          request,
          rentMovieDTO,
        );
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed buy/rent', () => {
      it('throw typeError', async () => {
        try {
          //Uses RENT_OPERATION or BUY_OPERATION is complety arbitrary for the test
          // is the same for both use cases
          await rentBuyController.clientRentMovie(request, {
            movieId: 1,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });

      it('throw notFoundException', async () => {
        const rentMovieDTo: CreateRentBuy = {
          movieId: 1,
        };
        const expectedData = { movie: {} };

        moviesRepository.save.mockReturnValue({});
        rentBuyMockRepository.create.mockReturnValue(expectedData);
        rentBuyMockRepository.save.mockReturnValue(expectedData);
        try {
          //Uses RENT_OPERATION or BUY_OPERATION is complety arbitrary for the test
          // is the same for both use cases

          await rentBuyController.clientBuyMovie(request, rentMovieDTo);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); // end of buy/rent operation

  describe('return or buy rented movie', () => {
    describe('success', () => {
      it('return the movie', async () => {
        //must have a movie defined
        const expectedData = {
          movie: {},
        };

        rentBuyMockRepository.findOne.mockReturnValue(expectedData);
        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuyController.returnRentedMovie(request);

        expect(data).toEqual(expectedData);
      });
    });

    it('buy the movie', async () => {
      //must have a movie defined
      const expectedData = {
        movie: {},
      };

      rentBuyMockRepository.findOne.mockReturnValue(expectedData);
      rentBuyMockRepository.create.mockReturnValue(expectedData);
      rentBuyMockRepository.save.mockReturnValue(expectedData);
      const data = await rentBuyController.buyRentedMovie(request);

      expect(data).toEqual(expectedData);
    });
  });

  describe('failed', () => {
    it('throw typeError', async () => {
      const expectedData = { movie: {} };

      try {
        // the use of return or buy operation is complety arbistrary
        // is the same for both use cases
        rentBuyMockRepository.findOne.mockReturnValue(expectedData);
        await rentBuyController.buyRentedMovie(request);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('throw Conflict', async () => {
      try {
        // the use of return or buy operation is complety arbistrary
        // is the same for both use cases
        rentBuyMockRepository.findOne.mockReturnValue(undefined);
        await rentBuyController.returnRentedMovie(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  }); //end of return or buy a rented movie

  describe('add likes', () => {
    it('success', async () => {
      const movieId = '1';

      const data = await rentBuyController.addLikeToMovie(request, movieId);
      expect(data).toBeTruthy();
    });

    it('not found exception', async () => {
      const movieId = '1';

      try {
        await rentBuyController.addLikeToMovie(request, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('type error exception', async () => {
      const movieId = '1';
      moviesRepository.save.mockReturnValue({});
      try {
        await rentBuyController.addLikeToMovie(request, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('remove like', () => {
    it('success', async () => {
      const movieId = '1';

      const data = await rentBuyController.removeLike(request, movieId);
      expect(data).toBeTruthy();
    });

    it('not found exception', async () => {
      const movieId = '1';

      try {
        await rentBuyController.removeLike(request, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('type error exception', async () => {
      const movieId = '1';
      moviesRepository.save.mockReturnValue({});
      try {
        await rentBuyController.removeLike(request, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
