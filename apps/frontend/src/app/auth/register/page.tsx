/**
 * Register Page
 * User account registration form
 */

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';

export default function RegisterPage() {
  // TODO: Implement registration form with validation
  // TODO: Add password strength indicator
  // TODO: Add terms acceptance checkbox
  // TODO: Implement email verification
  // TODO: Handle registration errors and loading states
  // TODO: Redirect on successful registration

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600"></div>
          </div>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join GhostPay today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* TODO: Connect form to registration API */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
              <p className="text-xs text-slate-600 mt-1">
                At least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1 rounded" />
              <label htmlFor="terms" className="text-xs text-slate-600">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button className="w-full">Create Account</Button>
          </form>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
