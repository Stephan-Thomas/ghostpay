/**
 * Winston Logger Configuration
 * Centralized logging for the application
 */

import winston from 'winston';
import { config } from '../config/index.js';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// Create logger instance
export const logger = winston.createLogger({
  level: config.logLevel,
  format: logFormat,
  transports: [
    // Console transport for all environments
    new winston.transports.Console({
      format: config.nodeEnv === 'production' ? logFormat : consoleFormat,
    }),
  ],
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Stream object for morgan HTTP logging
export const stream = {
  write: (message: string): void => {
    logger.info(message.trim());
  },
};

// Log unhandled rejections and exceptions
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

export default logger;