import { Module } from '@nestjs/common';
import { AccountsService } from './providers/accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { RolesDBProvider } from './providers/roles.provider';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, RolesDBProvider],
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  exports: [AccountsService],
})
export class UsersModule {}
