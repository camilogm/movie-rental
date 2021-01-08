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
import {
  BUY_OPERATION,
  RENT_OPERATION,
  STATES_MOVIES_PROVIDER,
} from '../../constants';
import { CreateRentBuy } from '../dto/create-rent-buy.dto';
import * as moment from 'moment';
import { UserEntity } from '../../users/entities/user.entity';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

const clientId = 1;
const movieId = 1;

describe('rentbuy service', () => {
  let rentBuyService: RentBuyService;
  let rentBuyMockRepository: MockRepository;
  let moviesRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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

    rentBuyService = module.get<RentBuyService>(RentBuyService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    rentBuyMockRepository = module.get<MockRepository>(
      getRepositoryToken(RentBuyEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuyService).toBeDefined();
    expect(rentBuyMockRepository).toBeDefined();
    expect(moviesRepository).toBeDefined();
  });

  describe('find rented movie', () => {
    describe('success found op', () => {
      it('found movie rented by clientId', async () => {
        const rentedMovieExpected = {};

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuyService.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieExpected);
      });

      it(`client doesn't have rented movie`, async () => {
        const rentedMovieExpected = undefined;

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuyService.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieDetail);
      });
    });

    describe('failed success found', () => {
      it('throw type error ', async () => {
        try {
          await rentBuyService.getMovieRentedByClientId(clientId);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); // end of get movie rented

  describe('get buy/rent data', () => {
    it('rent information (sale and date) is setting well', () => {
      const salePrice = 2;
      const rentDays = 10;

      const expectedData = {
        price: salePrice * 0.1 * rentDays,
        returnDate: moment().add(rentDays, 'days').format(),
        state: {},
      };

      const data = rentBuyService.getBuyRentData(
        salePrice,
        rentDays,
        RENT_OPERATION,
      );

      expect(data).toEqual(expectedData);
    });

    it('buy information is setting well', () => {
      const salePrice = 2;

      const expectedData = {
        price: salePrice,
        returnDate: null,
        state: {},
      };
      const data = rentBuyService.getBuyRentData(salePrice, 0, BUY_OPERATION);

      expect(data).toEqual(expectedData);
    });
  }); //end of check data

  describe('buy or rent movie', () => {
    describe('success ', () => {
      it('rent movie', async () => {
        const rentMovieDTo: CreateRentBuy = {
          movieId: 1,
        };

        const expectedData = { movie: {} };

        rentBuyMockRepository.create.mockReturnValue(expectedData);
        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuyService.rentBuyTransaction(
          clientId,
          rentMovieDTo,
          RENT_OPERATION,
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
        const data = await rentBuyService.rentBuyTransaction(
          clientId,
          rentMovieDTO,
          BUY_OPERATION,
        );
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed buy/rent', () => {
      it('throw typeError', async () => {
        try {
          //Uses RENT_OPERATION or BUY_OPERATION is complety arbitrary for the test
          // is the same for both use cases
          await rentBuyService.rentBuyTransaction(
            clientId,
            {
              movieId: 1,
            },
            RENT_OPERATION,
          );
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

          await rentBuyService.rentBuyTransaction(
            clientId,
            rentMovieDTo,
            BUY_OPERATION,
          );
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
        const data = await rentBuyService.returnRentedMovie(clientId);

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
      const data = await rentBuyService.buyRentedMovie(clientId);

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
        await rentBuyService.buyRentedMovie(clientId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('throw Conflict', async () => {
      try {
        // the use of return or buy operation is complety arbistrary
        // is the same for both use cases
        rentBuyMockRepository.findOne.mockReturnValue(undefined);
        await rentBuyService.returnRentedMovie(clientId);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  }); //end of return or buy a rented movie

  describe('send facture', () => {
    describe('success', () => {
      it('sended mail', async () => {
        const clientId = '1';
        const typeOperation = BUY_OPERATION;

        rentBuyMockRepository.create.mockReturnValue({});
        const repo = await rentBuyService.rentOrBuyBuilder(
          +clientId,
          {
            movieId: 1,
          },
          typeOperation,
        );

        const sendedMail = rentBuyService.sendFacture(
          repo.user,
          repo,
          typeOperation,
        );
        expect(sendedMail).toBeTruthy();
      });
    });

    describe('fail', () => {
      it('type error', async () => {
        const clientId = '1';
        const typeOperation = BUY_OPERATION;

        rentBuyMockRepository.create.mockReturnValue({});
        const repo = await rentBuyService.rentOrBuyBuilder(
          +clientId,
          {
            movieId: 1,
          },
          typeOperation,
        );

        try {
          rentBuyService.sendFacture(repo.user, repo, typeOperation);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of send mail

  describe('add likes', () => {
    it('success', async () => {
      const data = await rentBuyService.addLikeToMovie(clientId, movieId);
      expect(data).toBeTruthy();
    });

    it('not found exception', async () => {
      try {
        await rentBuyService.addLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('type error exception', async () => {
      moviesRepository.save.mockReturnValue({});
      try {
        await rentBuyService.addLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('remove like', () => {
    it('success', async () => {
      const data = await rentBuyService.removeLikeToMovie(clientId, movieId);
      expect(data).toBeTruthy();
    });

    it('not found exception', async () => {
      try {
        await rentBuyService.removeLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('type error exception', async () => {
      moviesRepository.save.mockReturnValue({});
      try {
        await rentBuyService.removeLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
