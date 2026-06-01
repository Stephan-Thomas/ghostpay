/**
 * Shared Types
 * Common types used across frontend and backend
 */

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  masterWallet?: MasterWallet;
}

// ============================================
// Wallet Types
// ============================================

export interface MasterWallet {
  id: string;
  userId: string;
  publicKey: string;
  balanceXlm: number;
  balanceUsdc: number;
  lastSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DisposableWallet {
  id: string;
  userId: string;
  publicKey: string;
  alias?: string | null;
  label?: string | null;
  balanceXlm: number;
  balanceUsdc: number;
  isActive: boolean;
  isConsolidated: boolean;
  consolidatedAt?: Date;
  cycleId?: string | null;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletAlias {
  id: string;
  userId: string;
  alias: string;
  walletType: 'MASTER' | 'DISPOSABLE';
  walletId: string;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type WalletType = 'MASTER' | 'DISPOSABLE';

export interface WalletBalance {
  xlm: number;
  usdc: number;
  lastUpdated: Date;
}

// ============================================
// Transaction Types
// ============================================

export interface Transaction {
  id: string;
  userId: string;
  stellarTxHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  assetType: 'native' | 'credit_alphanum4' | 'credit_alphanum12';
  assetCode?: string | null;
  assetIssuer?: string | null;
  memo?: string | null;
  memoType?: string | null;
  fee: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  direction: 'INCOMING' | 'OUTGOING';
  isConsolidation: boolean;
  cycleId?: string | null;
  ledgerCloseTime?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionFilters {
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED';
  direction?: 'INCOMING' | 'OUTGOING';
  cycleId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

// ============================================
// Salary Cycle Types
// ============================================

export interface SalaryCycle {
  id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  expectedAmount?: number | null;
  currency: string;
  disposableWalletPublicKey?: string | null;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CONSOLIDATED';
  notes?: string | null;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: string; // PAYMENT_RECEIVED, CONSOLIDATION_COMPLETE, etc.
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
  createdAt: Date;
}

export type NotificationType = 'PAYMENT_RECEIVED' | 'CONSOLIDATION_COMPLETE' | 'WALLET_CREATED' | 'SECURITY_ALERT';

// ============================================
// Authentication Types
// ============================================

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  expiresIn: number; // in seconds
}

export interface AuthResponse {
  user: User;
  tokens: AuthToken;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============================================
// Error Types
// ============================================

export enum ErrorCode {
  // Auth errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Wallet errors
  WALLET_NOT_FOUND = 'WALLET_NOT_FOUND',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  WALLET_CREATION_FAILED = 'WALLET_CREATION_FAILED',

  // Transaction errors
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  TRANSACTION_NOT_FOUND = 'TRANSACTION_NOT_FOUND',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',

  // Not found
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

  // Forbidden
  FORBIDDEN = 'FORBIDDEN',
}

// ============================================
// Stellar Integration Types
// ============================================

export interface StellarAccount {
  id: string;
  publicKey: string;
  balance: StellarBalance[];
  sequenceNumber: string;
  nativeBalance: number;
}

export interface StellarBalance {
  balance: string;
  limit?: string;
  assetType: string;
  assetCode?: string;
  assetIssuer?: string;
}

export interface StellarTransaction {
  id: string;
  hash: string;
  ledger: number;
  createdAt: Date;
  sourceAccount: string;
  operations: StellarOperation[];
  memo?: {
    type: string;
    value: string;
  };
}

export interface StellarOperation {
  id: string;
  type: string;
  sourceAccount?: string;
  destination?: string;
  amount?: string;
  asset?: {
    type: string;
    code?: string;
    issuer?: string;
  };
}

// ============================================
// Audit Log Types
// ============================================

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// ============================================
// QR Code Types
// ============================================

export interface QRCodeData {
  type: 'payment' | 'wallet';
  address: string;
  amount?: number;
  memo?: string;
  metadata?: Record<string, any>;
}

// ============================================
// Consolidation Types
// ============================================

export interface ConsolidationJob {
  id: string;
  userId?: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  walletsCount: number;
  processedCount: number;
  failedCount: number;
  totalAmountXlm?: number;
  totalAmountUsdc?: number;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}
