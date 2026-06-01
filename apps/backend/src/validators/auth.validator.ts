/**
 * Authentication Validators
 * Zod schemas for auth request validation
 */

import { z } from 'zod';

// Email regex pattern (basic validation)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Registration schema
 */
export const registerSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Invalid email address')
      .regex(emailRegex, 'Invalid email format')
      .max(255, 'Email must be less than 255 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be less than 128 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    firstName: z.string().max(100, 'First name must be less than 100 characters').optional(),
    lastName: z.string().max(100, 'Last name must be less than 100 characters').optional(),
  }),
});

/**
 * Login schema
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

/**
 * Update profile schema
 */
export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    displayName: z.string().max(100).optional(),
  }),
});

/**
 * Change password schema
 */
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .max(128, 'New password must be less than 128 characters')
      .regex(/[A-Z]/, 'New password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'New password must contain at least one number'),
  }),
});

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

/**
 * Reset password schema
 */
export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Reset token is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .max(128, 'New password must be less than 128 characters')
      .regex(/[A-Z]/, 'New password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'New password must contain at least one number'),
  }),
});

/**
 * Email verification schema
 */
export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Verification token is required'),
  }),
});

/**
 * 2FA verification schema
 */
export const verify2FASchema = z.object({
  body: z.object({
    code: z
      .string()
      .length(6, '2FA code must be 6 digits')
      .regex(/^[0-9]+$/, '2FA code must contain only digits'),
  }),
});

export default {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verify2FASchema,
};