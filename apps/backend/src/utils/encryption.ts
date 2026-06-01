/**
 * Encryption Utilities
 * Handle encryption and decryption of sensitive data
 */

import crypto from 'crypto';
import { config } from '../config/index.js';
import { logger } from './logger.js';

// TODO: Implement proper encryption algorithms
// TODO: Add key rotation support
// TODO: Implement secure key derivation

const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypt sensitive data
 */
export function encryptData(plaintext: string): string {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(config.encryptionKey, 'hex'), iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    logger.error('Encryption failed:', error);
    throw new Error('Encryption failed');
  }
}

/**
 * Decrypt sensitive data
 */
export function decryptData(encrypted: string): string {
  try {
    const parts = encrypted.split(':');
    if (parts.length !== 3) throw new Error('Invalid encrypted data format');

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedData = parts[2];

    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(config.encryptionKey, 'hex'), iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    logger.error('Decryption failed:', error);
    throw new Error('Decryption failed');
  }
}

/**
 * Hash a string
 */
export function hashString(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Generate random token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
