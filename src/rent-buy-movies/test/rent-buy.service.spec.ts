import { Test } from '@nestjs/testing';
import { MoviesService } from '../../movies/providers/movies.service';
import { AccountsService } from '../../users/providers/accounts.service';
import { RentBuyService } from '../providers/rent-buy.service';
import {
  createMockRepository,
  mockQueryBuilder,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { InvoiceDetailEntity } from '../entities/invoice-detail.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BUY_OPERATION,
  RENT_OPERATION,
  STATES_MOVIES_PROVIDER,
} from '../../constants';
import { MovieEntity } from '../../movies/entities/movie.entity';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceEntity } from '../entities/invoice.entity';
import { MailerCustomService } from '../../mailer/mailer-custom.service';
import {
  expectedDataBuy,
  mockStates,
  mockBuyDetail,
  mockBuyMovieDTO,
  mockRentDetail,
  mockRentMovieDTO,
  mockMovie,
  expectedDataRent,
  mockMoviesArrayRent,
  mockDetailsEntityRent,
  expectedDetailsRent,
  mockDetailsEntityBuy,
  mockMoviesArrayBuy,
  expectedDetailsBuy,
  substracStock,
  mockUser,
  expectedInvoice,
} from './rent-buy.define';

const clientId = 1;
const movieId = 1;
const invoiceId = 1;

describe('rentbuy service', () => {
  let rentBuyService: RentBuyService;
  let invoiceDetailsRepository: MockRepository;
  let invoicerRepository: MockRepository;
  let moviesRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RentBuyService,
        {
          provide: MailerCustomService,
          useValue: { sendMail: jest.fn() },
        },
        {
          provide: AccountsService,
          useValue: { findOneById: () => mockUser() },
        },
        {
          provide: MoviesService,
          useValue: {
            findOneById: () => mockMovie(),
            updateByEntity: jest.fn(),
            updateManyByEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(InvoiceDetailEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(InvoiceEntity),
          useValue: createMockRepository(),
        },
        {
          provide: STATES_MOVIES_PROVIDER,
          useValue: mockStates(),
        },
      ],
    }).compile();

    rentBuyService = module.get<RentBuyService>(RentBuyService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    invoicerRepository = module.get<MockRepository>(
      getRepositoryToken(InvoiceEntity),
    );
    invoiceDetailsRepository = module.get<MockRepository>(
      getRepositoryToken(InvoiceDetailEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuyService).toBeDefined();
    expect(invoiceDetailsRepository).toBeDefined();
    expect(moviesRepository).toBeDefined();
    expect(invoicerRepository).toBeDefined();
  });

  describe('builderDetail', () => {
    describe('success', () => {
      it('get buy detail', async () => {
        invoiceDetailsRepository.create.mockReturnValue(mockBuyDetail());
        const data = await rentBuyService.builderDetail(
          { daysRent: 0, ...mockBuyMovieDTO() },
          BUY_OPERATION,
        );

        expect(data).toEqual(expectedDataBuy());
      });

      it('get rent detail', async () => {
        invoiceDetailsRepository.create.mockReturnValue(mockRentDetail());
        const data = await rentBuyService.builderDetail(
          mockRentMovieDTO(),
          RENT_OPERATION,
        );

        expect(data).toEqual(expectedDataRent());
      });
    });

    describe('otherwhise', () => {
      it('Not enough stock in rent/buy', async () => {
        try {
          await rentBuyService.builderDetail(
            {
              ...mockBuyMovieDTO(),
              quantity: mockMovie().stock + 1,
              daysRent: 0,
            },
            BUY_OPERATION,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });
    });
  });

  describe('Get InvoiceDetails', () => {
    describe('success', () => {
      it('Buy details', async () => {
        mockDetailsEntityBuy().forEach((detail) =>
          invoiceDetailsRepository.create.mockReturnValue(detail),
        );

        const setterRequest = mockMoviesArrayBuy();
        const data = await rentBuyService.invoiceDetailsBuilder(
          setterRequest,
          RENT_OPERATION,
        );

        const setterValue = expectedDetailsBuy();
        const expectedValues = substracStock(setterValue, setterRequest);

        const expectedDetailsBuilder = {
          details: expectedValues,
          subTotal: expectedValues.reduce((acc, curr) => acc + curr.price, 0),
        };

        expect(data).toEqual(expectedDetailsBuilder);
      });

      it('rent details', async () => {
        mockDetailsEntityRent().forEach((detail) =>
          invoiceDetailsRepository.create.mockReturnValue(detail),
        );
        const setterRequest = mockMoviesArrayBuy();

        const data = await rentBuyService.invoiceDetailsBuilder(
          setterRequest,
          RENT_OPERATION,
        );

        const setterValues = expectedDetailsRent();
        const expectedValues = substracStock(setterValues, setterRequest);

        const expectedDetailsBuilder = {
          details: expectedValues,
          subTotal: expectedValues.reduce((acc, curr) => acc + curr.price, 0),
        };

        expect(data).toEqual(expectedDetailsBuilder);
      });
    });

    describe('otherwise', () => {
      it('not enoguh stock in rent/buy', async () => {
        try {
          const mockMoviesRent = mockMoviesArrayRent();
          mockMoviesRent[0].quantity = mockMovie().stock + 1;

          await rentBuyService.invoiceDetailsBuilder(
            mockMoviesRent,
            RENT_OPERATION,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });
    });
  });

  describe('rent/buy', () => {
    describe('success', () => {
      it('buy', async () => {
        mockDetailsEntityBuy().forEach((detail) =>
          invoiceDetailsRepository.create.mockReturnValue(detail),
        );
        const expectedData = expectedInvoice();

        invoicerRepository.create.mockReturnValue(expectedData);
        invoicerRepository.save.mockReturnValue(expectedData);

        const data = await rentBuyService.buyRentMovies(
          clientId,
          mockMoviesArrayBuy(),
          undefined,
        );

        expect(data).toEqual(expectedData);
      });

      it('rent', async () => {
        mockDetailsEntityRent().forEach((detail) =>
          invoiceDetailsRepository.create.mockReturnValue(detail),
        );

        const expectedData = expectedInvoice();

        invoicerRepository.create.mockReturnValue(expectedData);
        invoicerRepository.save.mockReturnValue(expectedData);

        const data = await rentBuyService.buyRentMovies(
          clientId,
          undefined,
          mockMoviesArrayRent(),
        );

        expect(data).toEqual(expectedData);
      });
    });

    describe('otherwise', () => {
      it('Duplicating moviesId in buy and rent', async () => {
        try {
          await rentBuyService.buyRentMovies(
            clientId,
            mockMoviesArrayBuy(),
            mockMoviesArrayRent(),
          );
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });

      it('Empty buy and ret', async () => {
        try {
          await rentBuyService.buyRentMovies(clientId, undefined, undefined);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });

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

  describe('return movies', () => {
    describe('success', () => {
      it('returned', async () => {
        invoicerRepository.createQueryBuilder = jest.fn(() => ({
          ...mockQueryBuilder(),
          getOne: () => ({
            details: [],
          }),
        }));

        const data = await rentBuyService.returnMovies(clientId, invoiceId);
        expect(data).toBeTruthy();
      });
    });

    describe('failed', () => {
      it('conflict', async () => {
        invoicerRepository.createQueryBuilder = jest.fn(() => ({
          ...mockQueryBuilder(),
          getOne: () => undefined,
        }));
        try {
          await rentBuyService.returnMovies(clientId, invoiceId);
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });
    });
  });

  describe('Get client invoices', () => {
    const expectedData = [];

    describe('success', () => {
      it('founded', async () => {
        invoicerRepository.find.mockReturnValue(expectedData);
        const data = await rentBuyService.getMyInvoices(clientId);
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed', () => {
      it('typeerror', async () => {
        invoicerRepository.find.mockReturnValue(expectedData);
        try {
          await rentBuyService.getMyInvoices(clientId);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  });

  describe('Get invoice detail', () => {
    const invoiceId = 1;
    const expectedData = {};

    describe('success', () => {
      it('get', async () => {
        invoicerRepository.findOne.mockReturnValue(expectedData);
        const data = await rentBuyService.getInvoiceDetail(clientId, invoiceId);
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed', () => {
      it('badRequest', async () => {
        invoicerRepository.createQueryBuilder = jest.fn(() => ({
          ...mockQueryBuilder(),
          getOne: () => undefined,
        }));

        try {
          await rentBuyService.getInvoiceDetail(clientId, invoiceId);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});
