import { Module } from '@nestjs/common';
import { AccountsService } from './providers/accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RolesDBProvider } from './providers/roles.provider';
import { TokenPasswordEntity } from './entities/token-password.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { UpdatePasswordService } from './providers/update-password.service';
import { DeleteTokenRecoveyTask } from './delete-token-recovery.task';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, UpdatePasswordService, RolesDBProvider],
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenPasswordEntity]),
    MailerModule,
    DeleteTokenRecoveyTask,
  ],
  exports: [AccountsService],
})
export class UsersModule {}
