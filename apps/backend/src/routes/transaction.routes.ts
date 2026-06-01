/**
 * Transaction Routes
 * View and manage transaction history
 */

import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { TransactionService } from '../services/transaction.service.js';

const router = Router();
const transactionService = new TransactionService();

/**
 * GET /transactions
 * Get all transactions for the current user with pagination and filtering
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const {
      page = '1',
      limit = '20',
      status,
      assetType,
      direction,
      startDate,
      endDate,
      cycleId,
    } = req.query;

    const transactions = await transactionService.getUserTransactions(userId, {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      status: status as string,
      assetType: assetType as string,
      direction: direction as string,
      startDate: startDate as string,
      endDate: endDate as string,
      cycleId: cycleId as string,
    });

    res.json({
      success: true,
      data: transactions,
    });
  })
);

/**
 * GET /transactions/:id
 * Get a specific transaction by ID
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const transaction = await transactionService.getTransaction(userId, id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: { message: 'Transaction not found' },
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  })
);

/**
 * GET /transactions/:id/verify
 * Verify a transaction on the Stellar network
 */
router.get(
  '/:id/verify',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // TODO: Implement Stellar network verification
    res.json({
      success: true,
      data: {
        verified: true,
        stellarTxHash: 'TODO: Fetch from Stellar',
        confirmations: 0,
      },
    });
  })
);

/**
 * GET /transactions/summary
 * Get transaction summary statistics
 */
router.get(
  '/summary',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const { startDate, endDate } = req.query;

    const summary = await transactionService.getTransactionSummary(userId, {
      startDate: startDate as string,
      endDate: endDate as string,
    });

    res.json({
      success: true,
      data: summary,
    });
  })
);

/**
 * GET /transactions/export
 * Export transactions as CSV
 */
router.get(
  '/export',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { startDate, endDate, format = 'csv' } = req.query;

    const data = await transactionService.exportTransactions(userId, {
      startDate: startDate as string,
      endDate: endDate as string,
      format: format as string,
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=transactions-${Date.now()}.csv`
    );

    res.send(data);
  })
);

/**
 * POST /transactions/:id/memo
 * Add a memo/note to a transaction
 */
router.post(
  '/:id/memo',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { memo } = req.body;

    const transaction = await transactionService.addTransactionMemo(userId, id, memo);

    res.json({
      success: true,
      message: 'Memo added successfully',
      data: transaction,
    });
  })
);

export default router;