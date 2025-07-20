import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to handle 404 Not Found errors
 * This should be the last middleware in the chain
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    error: 'Not Found',
  });
};

export default notFoundHandler;