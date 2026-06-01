/**
 * Authentication Service
 * Handles user registration, login, and token management
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@ghostpay/database';
import { config } from '../config/index.js';
import { ApiError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

// TODO: Implement proper encryption for sensitive data
// TODO: Add rate limiting for authentication attempts
// TODO: Implement email verification
// TODO: Add 2FA support

interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResult {
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  };
}

export class AuthService {
  /**
   * Register a new user
   */
  async register(input: RegisterInput): Promise<AuthResult> {
    const { email, password, firstName, lastName } = input;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError('User with this email already exists', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    // Log the registration
    await this.logAuditAction(user.id, 'USER_REGISTERED', {
      email,
      timestamp: new Date().toISOString(),
    });

    logger.info(`User registered: ${email}`);

    return {
      user,
      tokens,
    };
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResult> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        firstName: true,
        lastName: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new ApiError('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new ApiError('Account is deactivated', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new ApiError('Invalid credentials', 401);
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
      },
    });

    // Log the login
    await this.logAuditAction(user.id, 'USER_LOGIN', {
      timestamp: new Date().toISOString(),
    });

    logger.info(`User logged in: ${email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      tokens,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresAt: Date }> {
    try {
      const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as {
        id: string;
        email: string;
      };

      // Verify user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, isActive: true },
      });

      if (!user || !user.isActive) {
        throw new ApiError('User not found or inactive', 401);
      }

      // Generate new access token
      const accessToken = this.generateAccessToken(decoded.id, decoded.email);
      const expiresAt = this.getTokenExpiration(config.jwtExpiresIn);

      return {
        accessToken,
        expiresAt,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError('Refresh token expired', 401);
      }
      throw new ApiError('Invalid refresh token', 401);
    }
  }

  /**
   * Generate JWT tokens
   */
  private generateTokens(userId: string, email: string): AuthResult['tokens'] {
    const accessToken = this.generateAccessToken(userId, email);
    const refreshToken = this.generateRefreshToken(userId, email);
    const expiresAt = this.getTokenExpiration(config.jwtExpiresIn);

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }

  /**
   * Generate access token
   */
  private generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
      {
        id: userId,
        email,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn,
      }
    );
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(userId: string, email: string): string {
    return jwt.sign(
      {
        id: userId,
        email,
      },
      config.jwtRefreshSecret,
      {
        expiresIn: config.jwtRefreshExpiresIn,
      }
    );
  }

  /**
   * Get token expiration date
   */
  private getTokenExpiration(expiresIn: string): Date {
    const match = expiresIn.match(/^(\d+)([dhms])$/);
    if (!match) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    let milliseconds: number;
    switch (unit) {
      case 'd':
        milliseconds = value * 24 * 60 * 60 * 1000;
        break;
      case 'h':
        milliseconds = value * 60 * 60 * 1000;
        break;
      case 'm':
        milliseconds = value * 60 * 1000;
        break;
      case 's':
        milliseconds = value * 1000;
        break;
      default:
        milliseconds = value * 24 * 60 * 60 * 1000;
    }

    return new Date(Date.now() + milliseconds);
  }

  /**
   * Log audit action
   */
  private async logAuditAction(
    userId: string,
    action: string,
    metadata: Record<string, unknown>
  ): Promise<void> {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata,
      },
    });
  }
}