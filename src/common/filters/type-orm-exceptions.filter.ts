import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionsFilter<T extends QueryFailedError>
  implements ExceptionFilter {
  catch(typeOrmException: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (typeOrmException.message.includes('UQ')) {
      const badRequest = new BadRequestException(
        'Your fields contains that must not be duplicated',
      );
      const status = badRequest.getStatus();
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: badRequest.message,
      });
    }
  }
}
