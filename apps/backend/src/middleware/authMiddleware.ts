/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user to request
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { ApiError } from './errorHandler.js';
import { prisma } from '@ghostpay/database';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

// JWT payload interface
interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Protect routes - verify JWT token
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new ApiError('Not authorized to access this route', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new ApiError('User no longer exists or is inactive', 401);
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError('Invalid token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError('Token expired', 401));
    } else {
      next(error);
    }
  }
};

/**
 * Optional authentication - attach user if token exists but don't fail if not
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, isActive: true },
      });

      if (user && user.isActive) {
        req.user = {
          id: user.id,
          email: user.email,
        };
      }
    }

    next();
  } catch {
    // Continue without authentication
    next();
  }
};

/**
 * Check if user has required role (TODO: implement role-based access)
 */
export const requireRole = (...roles: string[]) => {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    // TODO: Implement role-based access control
    // For now, just check if user is authenticated
    if (!req.user) {
      throw new ApiError('Authentication required', 401);
    }
    next();
  };
};

export default { protect, optionalAuth, requireRole };