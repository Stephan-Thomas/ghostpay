/**
 * GhostPay Backend Server
 * Main entry point for the Express application
 */

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectDb } from '@ghostpay/database';

// Route imports
import authRoutes from './routes/auth.routes.js';
import walletRoutes from './routes/wallet.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import salaryCycleRoutes from './routes/salaryCycle.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import healthRoutes from './routes/health.routes.js';

// TODO: Import swagger documentation
// import { setupSwagger } from './utils/swagger.js';

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// Security Middleware
// ============================================

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Too many requests',
    message: 'You have exceeded the rate limit. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ============================================
// Body Parsing & Other Middleware
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// HTTP request logging
if (NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// ============================================
// API Routes
// ============================================

// Health check endpoint
app.use('/health', healthRoutes);

// API versioning
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Public routes
app.use(`${API_PREFIX}/auth`, authRoutes);

// Protected routes (authentication required)
// TODO: Add authentication middleware to protected routes
app.use(`${API_PREFIX}/wallets`, walletRoutes);
app.use(`${API_PREFIX}/transactions`, transactionRoutes);
app.use(`${API_PREFIX}/salary-cycles`, salaryCycleRoutes);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);

// ============================================
// Swagger Documentation (TODO)
// ============================================

// TODO: Setup Swagger/OpenAPI documentation
// setupSwagger(app);

// ============================================
// Error Handling
// ============================================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============================================
// Server Startup
// ============================================

const startServer = async () => {
  try {
    // Connect to database
    await connectDb();
    logger.info('Connected to database successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`GhostPay API server running on port ${PORT}`);
      logger.info(`Environment: ${NODE_ENV}`);
      logger.info(`API Prefix: ${API_PREFIX}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
      logger.info(`API docs: http://localhost:${PORT}/api-docs (TODO)`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received. Closing HTTP server...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received. Closing HTTP server...');
  process.exit(0);
});

// Start the server
startServer();

export default app;