import * as moment from 'moment';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { BuyMovieDTO } from '../dto/buy-dto/buy-movie.dto';
import { RentMovieDTO } from '../dto/rent.dto/rent-movie.dto';
import { StateMoviesDTO } from '../dto/state-movies.dto';
import { InvoiceDetailEntity } from '../entities/invoice-detail.entity';
import { InvoiceEntity } from '../entities/invoice.entity';
import { StateMovieEntity } from '../entities/state-movie.entity';

export const mockStates = () => {
  return new StateMoviesDTO(
    new StateMovieEntity(1, 'rent'),
    new StateMovieEntity(2, 'buy'),
    new StateMovieEntity(3, 'delayed'),
    new StateMovieEntity(1, 'returned'),
  );
};

export const mockUser = (): UserEntity => ({
  email: 'camilogit123@gmail.com',
  id: 1,
  firstName: 'Camilo',
  lastName: 'Gonzalez',
  password: undefined,
  role: undefined,
  userName: 'gmcamiloe',
});

export const mockMovie = (): MovieEntity => ({
  id: 1,
  availability: true,
  description: 'des',
  title: 'titleee',
  poster: 'www.google.com',
  trailerLink: 'www.youtube.com',
  stock: 8,
  salePrice: 15.4,
});

export const mockBuyMovieDTO = (): BuyMovieDTO => ({
  movieId: 1,
  quantity: 3,
});

export const mockRentMovieDTO = (): RentMovieDTO => ({
  ...mockBuyMovieDTO(),
  daysRent: 3,
});

export const mockBuyDetail = (): InvoiceDetailEntity => ({
  id: undefined,
  movie: mockMovie(),
  price: mockMovie().salePrice * mockBuyMovieDTO().quantity,
  quantity: mockBuyMovieDTO().quantity,
  returnDate: null,
  state: mockStates().BUY,
});

export const mockRentDetail = (): InvoiceDetailEntity => ({
  id: undefined,
  movie: mockMovie(),
  price:
    mockMovie().salePrice *
    0.1 *
    mockRentMovieDTO().daysRent *
    mockRentMovieDTO().quantity,
  quantity: mockRentMovieDTO().quantity,
  returnDate: new Date(
    moment().add(mockRentMovieDTO().daysRent, 'days').format(),
  ),
  state: mockStates().RENT,
});

export const expectedDataBuy = (): InvoiceDetailEntity => ({
  id: undefined,
  movie: mockMovie(),
  price: mockMovie().salePrice * mockBuyMovieDTO().quantity,
  returnDate: null,
  quantity: mockBuyMovieDTO().quantity,
  state: mockStates().BUY,
});

export const expectedDataRent = (): InvoiceDetailEntity => ({
  id: undefined,
  movie: mockMovie(),
  price:
    mockMovie().salePrice *
    0.1 *
    mockRentMovieDTO().quantity *
    mockRentMovieDTO().daysRent,
  quantity: mockRentMovieDTO().quantity,
  returnDate: new Date(
    moment().add(mockRentMovieDTO().daysRent, 'days').format(),
  ),
  state: mockStates().RENT,
});

export const expectedInvoice = (): InvoiceEntity => ({
  details: [mockBuyDetail()],
  id: undefined,
  total: [mockBuyDetail()].reduce((acc, curr) => acc + curr.price, 0),
  transactionDate: new Date(moment().format()),
  user: mockUser(),
});

export const mockMoviesArrayRent = (): RentMovieDTO[] => [mockRentMovieDTO()];
export const mockDetailsEntityRent = (): InvoiceDetailEntity[] => [
  mockRentDetail(),
];
export const expectedDetailsRent = (): InvoiceDetailEntity[] => [
  expectedDataRent(),
];

export const mockMoviesArrayBuy = (): RentMovieDTO[] => [
  { ...mockBuyMovieDTO(), daysRent: 0 },
];
export const mockDetailsEntityBuy = (): InvoiceDetailEntity[] => [
  mockBuyDetail(),
];
export const expectedDetailsBuy = (): InvoiceDetailEntity[] => [
  expectedDataBuy(),
];

export const substracStock = (
  setterValue: InvoiceDetailEntity[],
  setterRequest: RentMovieDTO[],
) => {
  return setterValue.map((entity) => {
    const find = setterRequest.find(
      (setter) => setter.movieId === entity.movie.id,
    );
    entity.movie.stock = entity.movie.stock - find.quantity;
    return entity;
  });
};
