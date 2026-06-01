/**
 * Wallet Routes
 * CRUD operations for master and disposable wallets
 */

import { Router, Request, Response } from 'express';
import { asyncHandler, ApiError } from '../middleware/errorHandler.js';
import { WalletService } from '../services/wallet.service.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
const walletService = new WalletService();

// All wallet routes require authentication
// TODO: Add protect middleware to all routes
// router.use(protect);

/**
 * GET /wallets
 * Get all wallets for the current user
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const wallets = await walletService.getUserWallets(userId);

    res.json({
      success: true,
      data: wallets,
    });
  })
);

/**
 * GET /wallets/master
 * Get user's master wallet
 */
router.get(
  '/master',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const masterWallet = await walletService.getMasterWallet(userId);

    if (!masterWallet) {
      throw new ApiError('Master wallet not found', 404);
    }

    res.json({
      success: true,
      data: masterWallet,
    });
  })
);

/**
 * POST /wallets/master/create
 * Create a new master wallet for the user
 */
router.post(
  '/master/create',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const masterWallet = await walletService.createMasterWallet(userId);

    res.status(201).json({
      success: true,
      message: 'Master wallet created successfully',
      data: masterWallet,
    });
  })
);

/**
 * GET /wallets/disposable
 * Get all disposable wallets for the current user
 */
router.get(
  '/disposable',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { isActive, isConsolidated } = req.query;

    const wallets = await walletService.getDisposableWallets(userId, {
      isActive: isActive === 'true',
      isConsolidated: isConsolidated === 'true',
    });

    res.json({
      success: true,
      data: wallets,
    });
  })
);

/**
 * GET /wallets/disposable/:id
 * Get a specific disposable wallet
 */
router.get(
  '/disposable/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const wallet = await walletService.getDisposableWallet(userId, id);

    if (!wallet) {
      throw new ApiError('Disposable wallet not found', 404);
    }

    res.json({
      success: true,
      data: wallet,
    });
  })
);

/**
 * POST /wallets/disposable/create
 * Create a new disposable wallet
 */
router.post(
  '/disposable/create',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { alias, label, cycleId } = req.body;

    const wallet = await walletService.createDisposableWallet(userId, {
      alias,
      label,
      cycleId,
    });

    res.status(201).json({
      success: true,
      message: 'Disposable wallet created successfully',
      data: wallet,
    });
  })
);

/**
 * PATCH /wallets/disposable/:id
 * Update a disposable wallet
 */
router.patch(
  '/disposable/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { alias, label } = req.body;

    const wallet = await walletService.updateDisposableWallet(userId, id, {
      alias,
      label,
    });

    res.json({
      success: true,
      message: 'Wallet updated successfully',
      data: wallet,
    });
  })
);

/**
 * DELETE /wallets/disposable/:id
 * Delete (deactivate) a disposable wallet
 */
router.delete(
  '/disposable/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    await walletService.deleteDisposableWallet(userId, id);

    res.json({
      success: true,
      message: 'Wallet deleted successfully',
    });
  })
);

/**
 * POST /wallets/disposable/:id/consolidate
 * Manually trigger consolidation of a disposable wallet
 */
router.post(
  '/disposable/:id/consolidate',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const result = await walletService.consolidateWallet(userId, id);

    res.json({
      success: true,
      message: 'Wallet consolidated successfully',
      data: result,
    });
  })
);

/**
 * GET /wallets/:id/balance
 * Get wallet balance (XLM and stablecoins)
 */
router.get(
  '/:id/balance',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // TODO: Implement balance fetching from Stellar network
    // For now, return placeholder data
    res.json({
      success: true,
      data: {
        walletId: id,
        xlm: '0.0000000',
        usdc: '0.00',
        lastUpdated: new Date().toISOString(),
      },
    });
  })
);

/**
 * GET /wallets/:id/qr
 * Generate QR code for wallet address
 */
router.get(
  '/:id/qr',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const qrData = await walletService.generateQRCode(userId, id);

    res.json({
      success: true,
      data: qrData,
    });
  })
);

/**
 * POST /wallets/alias
 * Create or update a wallet alias
 */
router.post(
  '/alias',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { walletId, walletType, alias, isPrimary } = req.body;

    const result = await walletService.createOrUpdateAlias(userId, {
      walletId,
      walletType,
      alias,
      isPrimary,
    });

    res.json({
      success: true,
      message: 'Alias created successfully',
      data: result,
    });
  })
);

/**
 * DELETE /wallets/alias/:alias
 * Delete a wallet alias
 */
router.delete(
  '/alias/:alias',
  asyncHandler(async (req: Request, res: Response) => {
    const { alias } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    await walletService.deleteAlias(userId, alias);

    res.json({
      success: true,
      message: 'Alias deleted successfully',
    });
  })
);

export default router;