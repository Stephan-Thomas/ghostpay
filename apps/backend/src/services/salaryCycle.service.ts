/**
 * Salary Cycle Service
 * Manages salary payment cycles
 */

import { prisma } from '@ghostpay/database';
import { ApiError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

// TODO: Implement automatic cycle creation
// TODO: Add cycle reminders and notifications
// TODO: Implement cycle-based reporting

interface CreateCycleInput {
  name: string;
  startDate: Date;
  endDate: Date;
  expectedAmount?: number;
  currency?: string;
  notes?: string;
}

interface UpdateCycleInput {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  expectedAmount?: number;
  notes?: string;
  status?: string;
}

interface GenerateWalletInput {
  alias?: string;
}

export class SalaryCycleService {
  /**
   * Get all salary cycles for a user
   */
  async getUserCycles(
    userId: string,
    filter: { status?: string; year?: number; month?: number } = {}
  ) {
    const { status, year, month } = filter;
    const where: Record<string, unknown> = { userId };

    if (status) where.status = status;

    if (year && month) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      where.startDate = where.startDate || {};
      (where.startDate as Record<string, unknown>).lte = endDate;
      where.endDate = where.endDate || {};
      (where.endDate as Record<string, unknown>).gte = startDate;
    } else if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);
      where.startDate = where.startDate || {};
      (where.startDate as Record<string, unknown>).gte = startOfYear;
      where.endDate = where.endDate || {};
      (where.endDate as Record<string, unknown>).lte = endOfYear;
    }

    return prisma.salaryCycle.findMany({
      where,
      orderBy: { startDate: 'desc' },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        expectedAmount: true,
        currency: true,
        status: true,
        createdAt: true,
      },
    });
  }

  /**
   * Get a specific salary cycle
   */
  async getCycle(userId: string, cycleId: string) {
    return prisma.salaryCycle.findFirst({
      where: { id: cycleId, userId },
      include: {
        transactions: {
          select: {
            id: true,
            amount: true,
            assetCode: true,
            direction: true,
            createdAt: true,
          },
        },
      },
    });
  }

  /**
   * Create a new salary cycle
   */
  async createCycle(userId: string, input: CreateCycleInput) {
    // Validate dates
    if (input.endDate <= input.startDate) {
      throw new ApiError('End date must be after start date', 400);
    }

    return prisma.salaryCycle.create({
      data: {
        userId,
        ...input,
      },
    });
  }

  /**
   * Update a salary cycle
   */
  async updateCycle(userId: string, cycleId: string, input: UpdateCycleInput) {
    const cycle = await this.getCycle(userId, cycleId);
    if (!cycle) {
      throw new ApiError('Salary cycle not found', 404);
    }

    // Prevent updates to completed cycles
    if (cycle.status === 'COMPLETED' || cycle.status === 'CONSOLIDATED') {
      throw new ApiError('Cannot update completed salary cycle', 400);
    }

    return prisma.salaryCycle.update({
      where: { id: cycleId },
      data: input,
    });
  }

  /**
   * Delete a salary cycle
   */
  async deleteCycle(userId: string, cycleId: string) {
    const cycle = await this.getCycle(userId, cycleId);
    if (!cycle) {
      throw new ApiError('Salary cycle not found', 404);
    }

    // Prevent deletion of cycles with transactions
    if (cycle.transactions && cycle.transactions.length > 0) {
      throw new ApiError('Cannot delete cycle with transactions', 400);
    }

    await prisma.salaryCycle.delete({
      where: { id: cycleId },
    });

    // Log the action
    await this.logAuditAction(userId, 'SALARY_CYCLE_DELETED', {
      cycleId,
    });

    logger.info(`Salary cycle deleted for user: ${userId}`);
  }

  /**
   * Generate a disposable wallet for a salary cycle
   */
  async generateWalletForCycle(userId: string, cycleId: string, input: GenerateWalletInput) {
    const cycle = await this.getCycle(userId, cycleId);
    if (!cycle) {
      throw new ApiError('Salary cycle not found', 404);
    }

    // Check if wallet already exists
    if (cycle.disposableWalletPublicKey) {
      throw new ApiError('Wallet already generated for this cycle', 400);
    }

    // TODO: Generate disposable wallet using WalletService
    // For now, return placeholder
    const mockPublicKey = `TODO:GENERATE_WALLET_FOR_CYCLE_${cycleId}`;

    await prisma.salaryCycle.update({
      where: { id: cycleId },
      data: {
        disposableWalletPublicKey: mockPublicKey,
        status: 'ACTIVE',
      },
    });

    return {
      cycleId,
      walletPublicKey: mockPublicKey,
      alias: input.alias || cycle.name,
    };
  }

  /**
   * Mark a salary cycle as complete
   */
  async completeCycle(userId: string, cycleId: string) {
    const cycle = await this.getCycle(userId, cycleId);
    if (!cycle) {
      throw new ApiError('Salary cycle not found', 404);
    }

    if (cycle.status === 'COMPLETED' || cycle.status === 'CONSOLIDATED') {
      throw new ApiError('Cycle already completed', 400);
    }

    return prisma.salaryCycle.update({
      where: { id: cycleId },
      data: {
        status: 'COMPLETED',
      },
    });
  }

  /**
   * Consolidate funds from a cycle's disposable wallet
   */
  async consolidateCycle(userId: string, cycleId: string) {
    const cycle = await this.getCycle(userId, cycleId);
    if (!cycle) {
      throw new ApiError('Salary cycle not found', 404);
    }

    if (!cycle.disposableWalletPublicKey) {
      throw new ApiError('No wallet associated with this cycle', 400);
    }

    // TODO: Implement actual consolidation logic
    // TODO: Transfer funds from disposable wallet to master wallet
    // TODO: Update transaction records

    await prisma.salaryCycle.update({
      where: { id: cycleId },
      data: {
        status: 'CONSOLIDATED',
      },
    });

    // Log the action
    await this.logAuditAction(userId, 'CYCLE_CONSOLIDATED', {
      cycleId,
    });

    logger.info(`Salary cycle consolidated for user: ${userId}`);

    return {
      cycleId,
      consolidatedAt: new Date(),
    };
  }

  /**
   * Get all transactions for a salary cycle
   */
  async getCycleTransactions(userId: string, cycleId: string) {
    const cycle = await this.getCycle(userId, cycleId);
    if (!cycle) {
      throw new ApiError('Salary cycle not found', 404);
    }

    return prisma.transaction.findMany({
      where: { cycleId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get salary cycle statistics
   */
  async getCycleStats(userId: string) {
    const cycles = await prisma.salaryCycle.findMany({
      where: { userId },
      select: {
        status: true,
        expectedAmount: true,
        createdAt: true,
      },
    });

    const stats = {
      totalCycles: cycles.length,
      activeCycles: cycles.filter((c) => c.status === 'ACTIVE').length,
      completedCycles: cycles.filter((c) => c.status === 'COMPLETED').length,
      consolidatedCycles: cycles.filter((c) => c.status === 'CONSOLIDATED').length,
      totalExpected: cycles.reduce((sum, c) => sum + (parseFloat(c.expectedAmount?.toString() || '0')), 0),
    };

    return stats;
  }

  /**
   * Log audit action
   */
  private async logAuditAction(
    userId: string,
    action: string,
    metadata: Record<string, unknown>
  ): Promise<void> {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata,
      },
    });
  }
}