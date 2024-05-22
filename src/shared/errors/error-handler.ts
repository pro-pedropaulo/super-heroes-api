import type { NextFunction, Request, Response } from 'express';

import { logger } from '../container/providers/logger';

import AppError from './appError';
import { ValidationError } from './validationError';

export function ErrorRequestHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
    });
  }

  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json({
      message: error.message,
      error: error.issues,
    });
  }

  logger.error('Internal Server Error', error);

  return response.status(500).json({
    message: 'Internal Server Error',
    status: 'error',
    type: 'unknown',
    statusCode: 500,
  });
}
