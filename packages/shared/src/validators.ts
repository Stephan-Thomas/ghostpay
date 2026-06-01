/**
 * Shared Validators
 * Zod schemas for common data structures
 */

import { z } from 'zod';

// ============================================
// Authentication Validators
// ============================================

export const emailSchema = z.string().email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  displayName: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional(),
});

// ============================================
// Wallet Validators
// ============================================

export const stellarAddressSchema = z
  .string()
  .regex(/^G[A-Z2-7]{55}$/, 'Invalid Stellar address format');

export const walletAliasSchema = z.object({
  alias: z
    .string()
    .min(1, 'Alias is required')
    .max(50, 'Alias must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Alias can only contain letters, numbers, underscores, and hyphens'),
  walletType: z.enum(['MASTER', 'DISPOSABLE']),
  walletId: stellarAddressSchema,
  isPrimary: z.boolean().default(false),
});

export const createWalletSchema = z.object({
  alias: z.string().max(100).optional(),
  label: z.string().max(500).optional(),
});

// ============================================
// Transaction Validators
// ============================================

export const amountSchema = z
  .number()
  .positive('Amount must be greater than 0')
  .max(922337203685.4775, 'Amount exceeds maximum value');

export const createTransactionSchema = z.object({
  fromAddress: stellarAddressSchema,
  toAddress: stellarAddressSchema,
  amount: amountSchema,
  assetCode: z.string().max(12).optional(),
  memo: z.string().max(256).optional(),
});

export const transactionFilterSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'FAILED']).optional(),
  direction: z.enum(['INCOMING', 'OUTGOING']).optional(),
  cycleId: z.string().optional(),
  startDate: z.string().datetime().transform((val) => new Date(val)).optional(),
  endDate: z.string().datetime().transform((val) => new Date(val)).optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

// ============================================
// Salary Cycle Validators
// ============================================

export const createSalaryCycleSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  startDate: z.string().datetime().transform((val) => new Date(val)),
  endDate: z.string().datetime().transform((val) => new Date(val)),
  expectedAmount: amountSchema.optional(),
  currency: z.string().default('XLM'),
  notes: z.string().max(1000).optional(),
});

export const updateSalaryCycleSchema = createSalaryCycleSchema.partial();

// ============================================
// Notification Validators
// ============================================

export const notificationFilterSchema = z.object({
  type: z.string().optional(),
  isRead: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

// ============================================
// Consolidation Validators
// ============================================

export const consolidationFilterSchema = z.object({
  status: z.enum(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED']).optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

// ============================================
// General Pagination
// ============================================

export const paginationSchema = z.object({
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
  page: z.number().min(1).optional(),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type TransactionFilter = z.infer<typeof transactionFilterSchema>;
export type CreateSalaryCycleInput = z.infer<typeof createSalaryCycleSchema>;
export type UpdateSalaryCycleInput = z.infer<typeof updateSalaryCycleSchema>;
export type NotificationFilter = z.infer<typeof notificationFilterSchema>;
