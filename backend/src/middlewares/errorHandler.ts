import { Request, Response, NextFunction } from 'express';
import { ValidationError, Result, validationResult } from 'express-validator';

export interface HttpError extends Error {
  statusCode?: number;
  data?: any;
  code?: number;
  errors?: ValidationError[];
}

type ExtendedValidationError = ValidationError & {
  param?: string;
  location?: string;
  value?: any;
  msg: any;
};

export function logErrors(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error('Stack:', err.stack);
  next(err);
}

export function errorHandler(
  err: HttpError | (ValidationError & { statusCode?: number })[],
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // If headers have already been sent, delegate to the default Express error handler
  if (res.headersSent) {
    next(err as HttpError);
    return;
  }

  // Handle validation errors from express-validator
  if (Array.isArray(err) && err.length > 0 && (err[0] as any).msg) {
    const validationErrors = err as ExtendedValidationError[];
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validationErrors.map(e => ({
        param: e.param || 'unknown',
        message: e.msg?.message || e.msg || 'Invalid value',
        location: e.location || 'body',
        value: e.value,
      })),
    });
    return;
  }

  // Handle specific error types
  const statusCode = (err as HttpError).statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : (err as Error).message;

  // In development, include the error stack
  const response: any = {
    status: 'error',
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.error = {
      name: (err as Error).name,
      message: (err as Error).message,
      stack: (err as Error).stack,
    };
  }

  res.status(statusCode).json(response);
}

// Helper function to create custom HTTP errors
export function createError(
  statusCode: number,
  message: string,
  data?: any,
  errors?: ValidationError[]
): HttpError {
  const error = new Error(message) as HttpError;
  error.statusCode = statusCode;
  if (data) {
    error.data = data;
  }
  if (errors) {
    error.errors = errors;
  }
  return error;
}

// Helper to format validation errors
export function formatValidationErrors(result: Result): ValidationError[] {
  return result.array();
}
