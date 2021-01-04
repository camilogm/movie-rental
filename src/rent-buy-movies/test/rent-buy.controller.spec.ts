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
import { RentBuyController } from '../rent-buy.controller';
import { PayloadDTO } from '../../auth/dto/payload.dto';
import { MailerService } from '@nestjs-modules/mailer';

const payLoad: PayloadDTO = {
  sub: 1,
  username: 'test',
  userRole: 'CLIENT',
};

const request = {
  user: payLoad,
};

describe('rentbuy service', () => {
  let rentBuyService: RentBuyService;
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

    rentBuyService = module.get<RentBuyService>(RentBuyService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    rentBuyController = module.get<RentBuyController>(RentBuyController);
    rentBuyMockRepository = module.get<MockRepository>(
      getRepositoryToken(RentBuyEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuyService).toBeDefined();
    expect(rentBuyController).toBeDefined();
    expect(rentBuyMockRepository).toBeDefined();
    expect(moviesRepository).toBeDefined();
  });

  describe('find rented movie', () => {
    describe('success found op', () => {
      it('found movie rented by clientId', async () => {
        const clientId = 1;
        const rentedMovieExpected = {};

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuyService.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieExpected);
      });

      it(`client doesn't have rented movie`, async () => {
        const clientId = 1;
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
        const clientId = 1;
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
        price: salePrice * 0.25 * rentDays,
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
