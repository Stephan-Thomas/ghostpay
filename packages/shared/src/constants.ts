/**
 * Shared Constants
 * Constants used across the application
 */

// ============================================
// Stellar Network
// ============================================

export const STELLAR_NETWORK = {
  PUBLIC: 'public',
  TESTNET: 'testnet',
} as const;

export const STELLAR_NETWORK_PASSPHRASE = {
  PUBLIC: 'Public Global Stellar Network ; September 2015',
  TESTNET: 'Test SDF Network ; September 2015',
} as const;

export const STELLAR_HORIZON_URL = {
  PUBLIC: 'https://horizon.stellar.org',
  TESTNET: 'https://horizon-testnet.stellar.org',
} as const;

export const STELLAR_BASE_FEE = 100; // stroops
export const STELLAR_MIN_ACCOUNT_BALANCE = 1; // XLM

// ============================================
// Asset Types
// ============================================

export const ASSET_TYPES = {
  NATIVE: 'native',
  CREDIT_ALPHANUM4: 'credit_alphanum4',
  CREDIT_ALPHANUM12: 'credit_alphanum12',
} as const;

export const SUPPORTED_ASSETS = {
  XLM: {
    code: 'XLM',
    issuer: null,
    type: ASSET_TYPES.NATIVE,
    decimals: 7,
    name: 'Stellar Lumens',
  },
  USDC: {
    code: 'USDC',
    issuer: 'GBUQWP3BOUZX34ULNQG23RQ6F4YUSXHTQSXUSMIQSTBE2EURIDVXL6B',
    type: ASSET_TYPES.CREDIT_ALPHANUM4,
    decimals: 6,
    name: 'USD Coin',
  },
} as const;

// ============================================
// Transaction Status
// ============================================

export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED',
} as const;

export const TRANSACTION_DIRECTION = {
  INCOMING: 'INCOMING',
  OUTGOING: 'OUTGOING',
} as const;

// ============================================
// Salary Cycle Status
// ============================================

export const SALARY_CYCLE_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CONSOLIDATED: 'CONSOLIDATED',
} as const;

// ============================================
// Notification Types
// ============================================

export const NOTIFICATION_TYPES = {
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  CONSOLIDATION_COMPLETE: 'CONSOLIDATION_COMPLETE',
  WALLET_CREATED: 'WALLET_CREATED',
  WALLET_DELETED: 'WALLET_DELETED',
  SECURITY_ALERT: 'SECURITY_ALERT',
  SYSTEM_UPDATE: 'SYSTEM_UPDATE',
} as const;

// ============================================
// Audit Log Actions
// ============================================

export const AUDIT_ACTIONS = {
  USER_REGISTERED: 'USER_REGISTERED',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  MASTER_WALLET_CREATED: 'MASTER_WALLET_CREATED',
  DISPOSABLE_WALLET_CREATED: 'DISPOSABLE_WALLET_CREATED',
  WALLET_DELETED: 'WALLET_DELETED',
  WALLET_CONSOLIDATED: 'WALLET_CONSOLIDATED',
  TRANSACTION_INITIATED: 'TRANSACTION_INITIATED',
  TRANSACTION_CONFIRMED: 'TRANSACTION_CONFIRMED',
  SALARY_CYCLE_CREATED: 'SALARY_CYCLE_CREATED',
  SALARY_CYCLE_UPDATED: 'SALARY_CYCLE_UPDATED',
  CONSOLIDATION_JOB_STARTED: 'CONSOLIDATION_JOB_STARTED',
  CONSOLIDATION_JOB_COMPLETED: 'CONSOLIDATION_JOB_COMPLETED',
  SECURITY_2FA_ENABLED: 'SECURITY_2FA_ENABLED',
  SECURITY_2FA_DISABLED: 'SECURITY_2FA_DISABLED',
} as const;

// ============================================
// Consolidation Job Status
// ============================================

export const CONSOLIDATION_JOB_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

// ============================================
// Error Codes
// ============================================

export const ERROR_CODES = {
  // Authentication
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',

  // Wallet
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  WALLET_CREATION_FAILED: 'WALLET_CREATION_FAILED',

  // Transaction
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  TRANSACTION_NOT_FOUND: 'TRANSACTION_NOT_FOUND',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',

  // Server
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
} as const;

// ============================================
// HTTP Status Codes
// ============================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================
// Rate Limiting
// ============================================

export const RATE_LIMITS = {
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
  },
  TRANSACTION: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50,
  },
} as const;

// ============================================
// Pagination Defaults
// ============================================

export const PAGINATION = {
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0,
} as const;

// ============================================
// JWT
// ============================================

export const JWT_EXPIRY = {
  ACCESS_TOKEN: '24h',
  REFRESH_TOKEN: '7d',
} as const;

// ============================================
// Feature Flags
// ============================================

export const FEATURE_FLAGS = {
  ENABLE_2FA: false, // TODO: Implement 2FA
  ENABLE_MULTI_SIG: false, // TODO: Implement multi-signature support
  ENABLE_STAKING: false, // TODO: Implement staking
  ENABLE_ANALYTICS: false, // TODO: Implement analytics
} as const;
