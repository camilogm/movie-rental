import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PayloadDTO } from 'src/auth/dto/payload.dto';
import {
  AllowedRoles,
  ROLE_CLIENT,
} from 'src/common/decorators/authorization.decorator';
import { BUY_OPERATION, RENT_OPERATION, RETURN_OPERATION } from 'src/constants';
import { CreateOperationDTO } from '../dto/movies-dto/create-operation.dto';
import { ClientOperationsService } from '../providers/client-operations.service';

@Controller('accounts/me/movie')
@AllowedRoles(ROLE_CLIENT)
export class ClientOperationsController {
  constructor(
    private readonly clientOperationsService: ClientOperationsService,
  ) {}

  @Post('/rent')
  @HttpCode(HttpStatus.OK)
  clientRentMovie(
    @Req() request,
    @Body() rentOrBuyMovieDTO: CreateOperationDTO,
  ) {
    const user: PayloadDTO = request.user;
    return this.clientOperationsService.operation(
      user.sub,
      rentOrBuyMovieDTO,
      RENT_OPERATION,
    );
  }

  @Post('/buy')
  @HttpCode(HttpStatus.OK)
  clientBuyMovie(
    @Req() request,
    @Body() rentOrBuyMovieDTO: CreateOperationDTO,
  ) {
    const user: PayloadDTO = request.user;
    return this.clientOperationsService.operation(
      user.sub,
      rentOrBuyMovieDTO,
      BUY_OPERATION,
    );
  }

  @Patch('/return')
  @HttpCode(HttpStatus.NO_CONTENT)
  returnRentedMovie(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.clientOperationsService.returnOrBuyMovieRented(
      user.sub,
      RETURN_OPERATION,
    );
  }

  @Post('/rent/buy')
  @HttpCode(HttpStatus.OK)
  buyRentedMovie(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.clientOperationsService.returnOrBuyMovieRented(
      user.sub,
      BUY_OPERATION,
    );
  }
}
