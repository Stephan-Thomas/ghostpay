/**
 * Salary Cycle Routes
 * Manage salary payment cycles
 */

import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { SalaryCycleService } from '../services/salaryCycle.service.js';

const router = Router();
const salaryCycleService = new SalaryCycleService();

/**
 * GET /salary-cycles
 * Get all salary cycles for the current user
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const { status, year, month } = req.query;

    const cycles = await salaryCycleService.getUserCycles(userId, {
      status: status as string,
      year: year ? parseInt(year as string, 10) : undefined,
      month: month ? parseInt(month as string, 10) : undefined,
    });

    res.json({
      success: true,
      data: cycles,
    });
  })
);

/**
 * GET /salary-cycles/:id
 * Get a specific salary cycle
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const cycle = await salaryCycleService.getCycle(userId, id);

    if (!cycle) {
      return res.status(404).json({
        success: false,
        error: { message: 'Salary cycle not found' },
      });
    }

    res.json({
      success: true,
      data: cycle,
    });
  })
);

/**
 * POST /salary-cycles
 * Create a new salary cycle
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const {
      name,
      startDate,
      endDate,
      expectedAmount,
      currency = 'XLM',
      notes,
    } = req.body;

    const cycle = await salaryCycleService.createCycle(userId, {
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      expectedAmount,
      currency,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Salary cycle created successfully',
      data: cycle,
    });
  })
);

/**
 * PATCH /salary-cycles/:id
 * Update a salary cycle
 */
router.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const updates = req.body;

    const cycle = await salaryCycleService.updateCycle(userId, id, updates);

    res.json({
      success: true,
      message: 'Salary cycle updated successfully',
      data: cycle,
    });
  })
);

/**
 * DELETE /salary-cycles/:id
 * Delete a salary cycle
 */
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    await salaryCycleService.deleteCycle(userId, id);

    res.json({
      success: true,
      message: 'Salary cycle deleted successfully',
    });
  })
);

/**
 * POST /salary-cycles/:id/generate-wallet
 * Generate a disposable wallet for a salary cycle
 */
router.post(
  '/:id/generate-wallet',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const { alias } = req.body;

    const result = await salaryCycleService.generateWalletForCycle(userId, id, {
      alias,
    });

    res.json({
      success: true,
      message: 'Disposable wallet generated for salary cycle',
      data: result,
    });
  })
);

/**
 * POST /salary-cycles/:id/complete
 * Mark a salary cycle as complete
 */
router.post(
  '/:id/complete',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const cycle = await salaryCycleService.completeCycle(userId, id);

    res.json({
      success: true,
      message: 'Salary cycle marked as complete',
      data: cycle,
    });
  })
);

/**
 * POST /salary-cycles/:id/consolidate
 * Consolidate funds from the cycle's disposable wallet
 */
router.post(
  '/:id/consolidate',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const result = await salaryCycleService.consolidateCycle(userId, id);

    res.json({
      success: true,
      message: 'Funds consolidated successfully',
      data: result,
    });
  })
);

/**
 * GET /salary-cycles/:id/transactions
 * Get all transactions for a salary cycle
 */
router.get(
  '/:id/transactions',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const transactions = await salaryCycleService.getCycleTransactions(userId, id);

    res.json({
      success: true,
      data: transactions,
    });
  })
);

/**
 * GET /salary-cycles/stats
 * Get salary cycle statistics
 */
router.get(
  '/stats',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const stats = await salaryCycleService.getCycleStats(userId);

    res.json({
      success: true,
      data: stats,
    });
  })
);

export default router;