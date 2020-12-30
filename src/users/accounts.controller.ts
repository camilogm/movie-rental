import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AccountsService } from './providers/accounts.service';
import { CreateUserDto } from './dto/user-dtos/create-user.dto';
import { UpdateUserDto } from './dto/user-dtos/update-user.dto';
import {
  AllowedRoles,
  Public,
  ROLE_ADMIN,
  ROLE_CLIENT,
} from '../common/decorators/authorization.decorator';
import { PayloadDTO } from '../auth/dto/payload.dto';

@Controller('accounts')
@AllowedRoles(ROLE_ADMIN, ROLE_CLIENT)
export class AccountsController {
  constructor(private readonly usersService: AccountsService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createClient(createUserDto);
  }

  @Get('/me')
  findOne(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.usersService.findOneById(user.sub);
  }

  @Patch('/me')
  update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    const user: PayloadDTO = request.user;
    return this.usersService.update(user.sub, updateUserDto);
  }

  @Delete('/me')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.usersService.remove(user.sub);
  }
}
