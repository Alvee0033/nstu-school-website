import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message, details } = this.resolve(exception);

    if (status >= 500) {
      this.logger.error(exception instanceof Error ? exception.stack : exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      details: details ?? undefined,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private resolve(exception: unknown): { status: number; message: string; details?: object[] } {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'object' && 'message' in res) {
        const msg = (res as Record<string, unknown>).message;
        if (Array.isArray(msg)) {
          return {
            status: exception.getStatus(),
            message: 'Validation failed',
            details: msg.map((m) => ({ message: m })),
          };
        }
        return { status: exception.getStatus(), message: String(msg) };
      }
      return { status: exception.getStatus(), message: String(res) };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') return { status: HttpStatus.CONFLICT, message: 'Record already exists' };
      if (exception.code === 'P2025') return { status: HttpStatus.NOT_FOUND, message: 'Record not found' };
    }

    return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
  }
}
