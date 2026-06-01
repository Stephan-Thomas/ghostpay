/**
 * API Types
 * Type definitions for API requests and responses
 */

import { User, Transaction, SalaryCycle, Notification } from '@ghostpay/shared';

// ============================================
// Auth API
// ============================================

export interface RegisterResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresAt: string;
}

// ============================================
// Wallet API
// ============================================

export interface CreateWalletRequest {
  alias?: string;
  label?: string;
}

export interface CreateWalletResponse {
  id: string;
  publicKey: string;
  alias?: string;
  createdAt: string;
}

export interface ConsolidateWalletRequest {
  walletId: string;
}

export interface ConsolidateWalletResponse {
  success: boolean;
  transactionHash: string;
  amount: number;
}

// ============================================
// Transaction API
// ============================================

export interface CreateTransactionRequest {
  toAddress: string;
  amount: number;
  assetCode?: string;
  memo?: string;
}

export interface CreateTransactionResponse {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  transactionHash?: string;
}

export interface GetTransactionsResponse {
  data: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============================================
// Salary Cycle API
// ============================================

export interface CreateSalaryCycleRequest {
  name: string;
  startDate: string;
  endDate: string;
  expectedAmount?: number;
  currency?: string;
}

export interface CreateSalaryCycleResponse {
  id: string;
  name: string;
  createdAt: string;
}

export interface GetSalaryCyclesResponse {
  data: SalaryCycle[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============================================
// Notification API
// ============================================

export interface GetNotificationsResponse {
  data: Notification[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface MarkNotificationAsReadRequest {
  notificationId: string;
}

// ============================================
// Generic API Response
// ============================================

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// TODO: Add request/response types for:
// - User profile updates
// - Settings changes
// - Advanced wallet operations
// - Batch operations
