/**
 * Express Backend Type Configuration
 * TypeScript ambient declarations for Express
 */

import { Request } from 'express';

// TODO: Extend Express Request with custom properties
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: {
        id: string;
        email: string;
        role?: string;
      };
      correlationId?: string;
    }
  }
}

export {};
