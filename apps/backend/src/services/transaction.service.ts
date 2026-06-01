/**
 * Transaction Service
 * Handles transaction history and management
 */

import { prisma } from '@ghostpay/database';
import { logger } from '../utils/logger.js';

// TODO: Implement Stellar transaction indexing
// TODO: Add real-time transaction monitoring
// TODO: Implement transaction categorization

interface GetTransactionsFilter {
  page?: number;
  limit?: number;
  status?: string;
  assetType?: string;
  direction?: string;
  startDate?: string;
  endDate?: string;
  cycleId?: string;
}

interface TransactionSummary {
  totalReceived: number;
  totalSent: number;
  totalCount: number;
  byAsset: Record<string, { received: number; sent: number; count: number }>;
}

export class TransactionService {
  /**
   * Get all transactions for a user with pagination
   */
  async getUserTransactions(userId: string, filter: GetTransactionsFilter = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      assetType,
      direction,
      startDate,
      endDate,
      cycleId,
    } = filter;

    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = { userId };

    if (status) where.status = status;
    if (assetType) where.assetType = assetType;
    if (direction) where.direction = direction;
    if (cycleId) where.cycleId = cycleId;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) (where.createdAt as Record<string, unknown>).gte = new Date(startDate);
      if (endDate) (where.createdAt as Record<string, unknown>).lte = new Date(endDate);
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          stellarTxHash: true,
          fromAddress: true,
          toAddress: true,
          amount: true,
          assetType: true,
          assetCode: true,
          status: true,
          direction: true,
          ledgerCloseTime: true,
          createdAt: true,
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a specific transaction
   */
  async getTransaction(userId: string, txId: string) {
    return prisma.transaction.findFirst({
      where: { id: txId, userId },
      include: {
        salaryCycle: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Get transaction summary statistics
   */
  async getTransactionSummary(userId: string, filter: { startDate?: string; endDate?: string } = {}) {
    const { startDate, endDate } = filter;
    const where: Record<string, unknown> = { userId, status: 'CONFIRMED' };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) (where.createdAt as Record<string, unknown>).gte = new Date(startDate);
      if (endDate) (where.createdAt as Record<string, unknown>).lte = new Date(endDate);
    }

    // TODO: Optimize this query for large datasets
    const transactions = await prisma.transaction.findMany({
      where,
      select: {
        amount: true,
        assetType: true,
        assetCode: true,
        direction: true,
      },
    });

    const summary: TransactionSummary = {
      totalReceived: 0,
      totalSent: 0,
      totalCount: transactions.length,
      byAsset: {},
    };

    for (const tx of transactions) {
      const assetKey = tx.assetCode || tx.assetType;
      if (!summary.byAsset[assetKey]) {
        summary.byAsset[assetKey] = { received: 0, sent: 0, count: 0 };
      }

      summary.byAsset[assetKey].count++;
      const amount = parseFloat(tx.amount.toString());

      if (tx.direction === 'INCOMING') {
        summary.totalReceived += amount;
        summary.byAsset[assetKey].received += amount;
      } else {
        summary.totalSent += amount;
        summary.byAsset[assetKey].sent += amount;
      }
    }

    return summary;
  }

  /**
   * Export transactions as CSV
   */
  async exportTransactions(
    userId: string,
    filter: { startDate?: string; endDate?: string; format?: string } = {}
  ) {
    // TODO: Implement proper CSV export
    // TODO: Add support for other formats (JSON, Excel)
    const transactions = await this.getUserTransactions(userId, {
      ...filter,
      limit: 10000, // Max export limit
    });

    // Simple CSV format
    const headers = ['Date', 'Tx Hash', 'From', 'To', 'Amount', 'Asset', 'Direction', 'Status'];
    const rows = transactions.transactions.map((tx) => [
      tx.ledgerCloseTime || tx.createdAt,
      tx.stellarTxHash,
      tx.fromAddress,
      tx.toAddress,
      tx.amount,
      tx.assetCode || tx.assetType,
      tx.direction,
      tx.status,
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }

  /**
   * Add a memo/note to a transaction
   */
  async addTransactionMemo(userId: string, txId: string, memo: string) {
    const transaction = await this.getTransaction(userId, txId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const metadata = transaction.metadata as Record<string, unknown> || {};
    (metadata as { userMemo?: string }).userMemo = memo;

    return prisma.transaction.update({
      where: { id: txId },
      data: { metadata },
    });
  }

  /**
   * Record a new transaction (called by blockchain listener)
   */
  async recordTransaction(txData: {
    userId: string;
    stellarTxHash: string;
    fromAddress: string;
    toAddress: string;
    amount: string;
    assetType?: string;
    assetCode?: string;
    assetIssuer?: string;
    memo?: string;
    memoType?: string;
    fee?: string;
    ledgerSequence?: number;
    ledgerCloseTime?: Date;
    operationType?: string;
    cycleId?: string;
    isConsolidation?: boolean;
    direction: 'INCOMING' | 'OUTGOING';
  }) {
    // TODO: Add deduplication logic
    // TODO: Validate transaction on Stellar network

    return prisma.transaction.create({
      data: {
        ...txData,
        amount: parseFloat(txData.amount),
        fee: txData.fee ? parseFloat(txData.fee) : 0,
        status: 'CONFIRMED',
      },
    });
  }
}