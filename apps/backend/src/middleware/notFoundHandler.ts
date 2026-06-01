/**
 * 404 Not Found Handler
 * Handles requests to non-existent routes
 */

import { Request, Response } from 'express';
import { ApiError } from './errorHandler.js';

export const notFoundHandler = (req: Request, _res: Response): void => {
  throw new ApiError(
    `Route ${req.originalUrl} not found`,
    404,
    true,
    {
      path: req.path,
      method: req.method,
    }
  );
};

export default notFoundHandler;