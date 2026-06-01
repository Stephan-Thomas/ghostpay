/**
 * Global Error Handler Middleware
 * Handles all errors and returns appropriate responses
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error response interface
interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
  stack?: string;
}

// Error handler middleware
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: Record<string, unknown> | undefined;
  let stack: string | undefined;

  // Handle ApiError instances
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else {
    // Handle other errors
    message = err.message || message;
  }

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    stack = err.stack;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      details,
    },
    stack,
  });
};

// Async handler wrapper to catch promise rejections
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default errorHandler;