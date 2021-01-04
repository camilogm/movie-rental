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
  Param,
} from '@nestjs/common';
import { AccountsService } from './providers/accounts.service';
import { CreateUserDto } from './dto/user-dtos/create-user.dto';
import { UpdateUserDto } from './dto/user-dtos/update-user.dto';
import {
  AllowedRoles,
  OverrideAllowedRoles,
  OwnProfileChanges,
  Public,
  ROLE_ADMIN,
  ROLE_CLIENT,
  ROLE_SUPER_ADMIN,
} from '../common/decorators/authorization.decorator';
import { PayloadDTO } from '../auth/dto/payload.dto';

@Controller('accounts')
@AllowedRoles(ROLE_ADMIN, ROLE_CLIENT)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.accountsService.createClient(createUserDto);
  }

  @Get('/me')
  findOne(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.accountsService.findOneById(user.sub);
  }

  @Patch('/me')
  update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    const user: PayloadDTO = request.user;
    return this.accountsService.update(user.sub, updateUserDto);
  }

  @Delete('/me')
  @OwnProfileChanges()
  @HttpCode(HttpStatus.NO_CONTENT)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.accountsService.remove(user.sub);
  }

  @Patch('/:idUser/role/:idRole')
  @OverrideAllowedRoles(ROLE_SUPER_ADMIN)
  changeRole(@Param('idUser') idUser: string, @Param('idRole') idRole: string) {
    return this.accountsService.updateRole(+idUser, +idRole);
  }
}
