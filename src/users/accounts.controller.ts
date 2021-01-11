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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { changePasswordDTO } from './dto/user-dtos/change-password.dto';
import { ResetPasswordDTO } from './dto/user-dtos/reset-password.dto';
import { UpdatePasswordService } from './providers/update-password.service';

@Controller('accounts')
@ApiTags('Accounts endpoints')
@ApiBearerAuth()
@AllowedRoles(ROLE_ADMIN, ROLE_CLIENT)
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly updatePasswordService: UpdatePasswordService,
  ) {}

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
  @ApiOperation({
    description: 'The use of the field password produces a 400',
  })
  update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    const user: PayloadDTO = request.user;
    return this.accountsService.updateById(user.sub, updateUserDto);
  }

  @Delete('/me')
  @OwnProfileChanges()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMe(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.accountsService.remove(user.sub);
  }

  @Patch('/:idUser/role/:idRole')
  @OverrideAllowedRoles(ROLE_SUPER_ADMIN, ROLE_ADMIN)
  changeRole(@Param('idUser') idUser: string, @Param('idRole') idRole: string) {
    return this.accountsService.updateRole(+idUser, +idRole);
  }

  @Patch('/change/password')
  @OwnProfileChanges()
  @HttpCode(HttpStatus.NO_CONTENT)
  changePassword(@Req() request, @Body() changePasswordDTO: changePasswordDTO) {
    const user: PayloadDTO = request.user;
    return this.updatePasswordService.changePassword(
      user.sub,
      changePasswordDTO.newPassword,
    );
  }

  @Public()
  @Get('/reset/password/:username')
  @HttpCode(HttpStatus.NO_CONTENT)
  recoveryPassword(@Param('username') username: string) {
    return this.updatePasswordService.recoveryPassword(username);
  }

  @Public()
  @Post('/reset/password/:token')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDTO: ResetPasswordDTO,
  ) {
    return this.updatePasswordService.resetPassword(token, resetPasswordDTO);
  }
}
