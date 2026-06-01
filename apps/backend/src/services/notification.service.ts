/**
 * Notification Service
 * Manages user notifications
 */

import { prisma } from '@ghostpay/database';
import { ApiError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

// TODO: Implement real-time notifications (WebSocket/SSE)
// TODO: Add email notifications
// TODO: Add push notifications
// TODO: Implement notification preferences

interface GetNotificationsFilter {
  page?: number;
  limit?: number;
  type?: string;
  isRead?: boolean;
}

export class NotificationService {
  /**
   * Get all notifications for a user
   */
  async getUserNotifications(userId: string, filter: GetNotificationsFilter = {}) {
    const {
      page = 1,
      limit = 20,
      type,
      isRead,
    } = filter;

    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = { userId };

    if (type) where.type = type;
    if (isRead !== undefined) where.isRead = isRead;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get count of unread notifications
   */
  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(userId: string, notificationId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new ApiError('Notification not found', 404);
    }

    return prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string) {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return {
      markedCount: result.count,
    };
  }

  /**
   * Delete a notification
   */
  async deleteNotification(userId: string, notificationId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new ApiError('Notification not found', 404);
    }

    await prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  /**
   * Delete all notifications (or all read notifications)
   */
  async deleteAllNotifications(userId: string, onlyRead: boolean = false) {
    const where: Record<string, unknown> = { userId };
    if (onlyRead) {
      where.isRead = true;
    }

    const result = await prisma.notification.deleteMany({
      where,
    });

    return {
      deletedCount: result.count,
    };
  }

  /**
   * Execute notification action
   */
  async executeAction(userId: string, notificationId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new ApiError('Notification not found', 404);
    }

    if (!notification.actionUrl) {
      throw new ApiError('No action associated with this notification', 400);
    }

    // Mark as read
    await this.markAsRead(userId, notificationId);

    return {
      actionUrl: notification.actionUrl,
    };
  }

  /**
   * Create a notification (internal use)
   */
  async createNotification(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    actionUrl?: string;
    notificationData?: Record<string, unknown>;
  }) {
    return prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        actionUrl: data.actionUrl,
        data: data.notificationData,
      },
    });
  }

  /**
   * Send payment received notification
   */
  async notifyPaymentReceived(userId: string, data: {
    amount: string;
    assetCode: string;
    fromAddress: string;
    txHash: string;
  }) {
    return this.createNotification({
      userId,
      type: 'PAYMENT_RECEIVED',
      title: 'Payment Received',
      message: `You received ${data.amount} ${data.assetCode} from ${data.fromAddress.slice(0, 8)}...`,
      actionUrl: `/transactions/${data.txHash}`,
      notificationData: data,
    });
  }

  /**
   * Send consolidation complete notification
   */
  async notifyConsolidationComplete(userId: string, data: {
    totalAmount: string;
    walletCount: number;
  }) {
    return this.createNotification({
      userId,
      type: 'CONSOLIDATION_COMPLETE',
      title: 'Consolidation Complete',
      message: `Successfully consolidated ${data.totalAmount} from ${data.walletCount} wallets`,
      actionUrl: '/wallets',
      notificationData: data,
    });
  }
}