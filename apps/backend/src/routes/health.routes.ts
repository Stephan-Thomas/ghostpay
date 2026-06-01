/**
 * Health Check Routes
 * Simple endpoints for monitoring application health
 */

import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /health
 * Basic health check endpoint
 */
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'ghostpay-api',
    });
  })
);

/**
 * GET /health/ready
 * Readiness check - verifies database connection
 */
router.get(
  '/ready',
  asyncHandler(async (_req: Request, res: Response) => {
    // TODO: Add database connectivity check
    // TODO: Add Redis connectivity check
    res.json({
      status: 'ready',
      checks: {
        database: 'ok', // TODO: Implement actual check
        redis: 'ok', // TODO: Implement actual check
      },
    });
  })
);

/**
 * GET /health/live
 * Liveness check - confirms the application is running
 */
router.get(
  '/live',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({
      status: 'alive',
    });
  })
);

export default router;