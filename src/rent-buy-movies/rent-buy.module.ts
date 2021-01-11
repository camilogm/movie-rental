import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from '../movies/movies.module';
import { UsersModule } from '../users/users.module';
import { InvoiceDetailEntity } from './entities/invoice-detail.entity';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoicesController } from './controllers/invoices.controller';
import { MoviesStatesProviders } from './providers/movies-state.provider';
import { RentBuyService } from './providers/rent-buy.service';
import { RentBuyController } from './controllers/rent-buy.controller';
import { MailerCustomService } from '../mailer/mailer-custom.service';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  controllers: [RentBuyController, InvoicesController],
  providers: [MoviesStatesProviders, RentBuyService],
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity, InvoiceDetailEntity]),
    UsersModule,
    MoviesModule,
    MailerCustomService,
    MailerModule,
  ],
})
export class RentBuyMovieModule {}
