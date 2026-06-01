/**
 * Request Validation Middleware
 * Uses Zod schemas for input validation
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from './errorHandler.js';

/**
 * Validate request body, query, or params against a Zod schema
 */
export const validateRequest = (schema: ZodSchema, location: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const data = req[location];
      const validated = schema.parse(data);

      // Replace the request data with the parsed (and potentially transformed) data
      req[location] = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        next(new ApiError('Validation failed', 400, true, { details }));
      } else {
        next(error);
      }
    }
  };
};

export default validateRequest;