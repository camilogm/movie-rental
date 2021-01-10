import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PayloadDTO } from '../../auth/dto/payload.dto';
import {
  AllowedRoles,
  ROLE_CLIENT,
} from '../../common/decorators/authorization.decorator';
import { BuyManyMoviesDTO } from '../dto/buy-dto/buy-many-movies.dto';
import { RentManyMoviesDTO } from '../dto/rent.dto/rent-many.movie.dto';
import { RentBuyService } from '../providers/rent-buy.service';

@Controller('me/movies')
@ApiTags('Client interaction with movies')
@ApiBearerAuth()
@AllowedRoles(ROLE_CLIENT)
export class RentBuyController {
  constructor(private readonly rentBuyService: RentBuyService) {}

  @Post('/buy')
  @HttpCode(HttpStatus.OK)
  transaction(@Req() request, @Body() buyMovies: BuyManyMoviesDTO) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.buyRentMovies(user.sub, buyMovies.buyMovies);
  }

  @Post('/rent')
  @HttpCode(HttpStatus.OK)
  reafd(@Req() request, @Body() rentMovies: RentManyMoviesDTO) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.buyRentMovies(
      user.sub,
      undefined,
      rentMovies.rentMovies,
    );
  }

  @Get('/return/:invoiceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  returnRentedMovie(@Req() request, @Param('invoiceId') invoiceId: string) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.returnMovies(user.sub, Number(invoiceId));
  }

  @Post('/like/:movieId')
  @HttpCode(HttpStatus.NO_CONTENT)
  addLikeToMovie(@Req() request, @Param('movieId') movieId: string) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.addLikeToMovie(user.sub, +movieId);
  }

  @Delete('/like/:movieId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeLike(@Req() request, @Param('movieId') movieId: string) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.removeLikeToMovie(user.sub, +movieId);
  }
}
