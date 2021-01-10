import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PayloadDTO } from '../../auth/dto/payload.dto';
import { RentBuyService } from '../providers/rent-buy.service';

@Controller('my/invoices')
@ApiTags('Invoices')
@ApiBearerAuth()
export class InvoicesController {
  constructor(private readonly rentBuyService: RentBuyService) {}

  @Get('')
  getMyInvoices(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.getMyInvoices(user.sub);
  }

  @Get(':invoiceId')
  getInvoiceDetail(@Req() request, @Param('invoiceId') invoiceId: string) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.getInvoiceDetail(user.sub, Number(invoiceId));
  }
}
