/**
 * Application Configuration
 * Centralized configuration management
 */

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Application
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'GhostPay',
  appVersion: process.env.APP_VERSION || '0.1.0',
  appUrl: process.env.APP_URL || 'http://localhost:3000',

  // Server
  port: parseInt(process.env.BACKEND_PORT || '4000', 10),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',

  // Stellar
  stellarNetwork: process.env.STELLAR_NETWORK || 'testnet',
  stellarHorizonUrl:
    process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org',
  stellarNetworkPassphrase:
    process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',

  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  encryptionKey: process.env.ENCRYPTION_KEY || 'dev-encryption-key-change-in-production',

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  // Consolidation Job
  consolidationCron: process.env.CONSOLIDATION_CRON || '0 */6 * * *',
  consolidationEnabled: process.env.CONSOLIDATION_ENABLED !== 'false',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  logFormat: process.env.LOG_FORMAT || 'combined',
};

// Validate required configuration
const requiredEnvVars = ['DATABASE_URL'];
for (const envVar of requiredEnvVars) {
  if (!config.databaseUrl && envVar === 'DATABASE_URL') {
    console.warn(`Warning: ${envVar} is not set. Application may not function correctly.`);
  }
}

export default config;