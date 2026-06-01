/**
 * Notification Routes
 * Manage user notifications
 */

import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { NotificationService } from '../services/notification.service.js';

const router = Router();
const notificationService = new NotificationService();

/**
 * GET /notifications
 * Get all notifications for the current user
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const {
      page = '1',
      limit = '20',
      type,
      isRead,
    } = req.query;

    const notifications = await notificationService.getUserNotifications(userId, {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      type: type as string,
      isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
    });

    res.json({
      success: true,
      data: notifications,
    });
  })
);

/**
 * GET /notifications/unread-count
 * Get count of unread notifications
 */
router.get(
  '/unread-count',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const count = await notificationService.getUnreadCount(userId);

    res.json({
      success: true,
      data: { count },
    });
  })
);

/**
 * PATCH /notifications/:id/read
 * Mark a notification as read
 */
router.patch(
  '/:id/read',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const notification = await notificationService.markAsRead(userId, id);

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  })
);

/**
 * PATCH /notifications/read-all
 * Mark all notifications as read
 */
router.patch(
  '/read-all',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const result = await notificationService.markAllAsRead(userId);

    res.json({
      success: true,
      message: 'All notifications marked as read',
      data: result,
    });
  })
);

/**
 * DELETE /notifications/:id
 * Delete a notification
 */
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    await notificationService.deleteNotification(userId, id);

    res.json({
      success: true,
      message: 'Notification deleted',
    });
  })
);

/**
 * DELETE /notifications
 * Delete all notifications (or all read notifications)
 */
router.delete(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder
    const { onlyRead } = req.query;

    await notificationService.deleteAllNotifications(userId, onlyRead === 'true');

    res.json({
      success: true,
      message: 'Notifications deleted',
    });
  })
);

/**
 * GET /notifications/:id/action
 * Execute notification action (if any)
 */
router.get(
  '/:id/action',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: Extract userId from authenticated request
    const userId = 'current-user-id'; // Placeholder

    const result = await notificationService.executeAction(userId, id);

    res.json({
      success: true,
      data: result,
    });
  })
);

export default router;