/**
 * Login Page
 * User authentication login form
 */

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';

export default function LoginPage() {
  // TODO: Implement login form with validation
  // TODO: Add email/password authentication
  // TODO: Add "Remember me" functionality
  // TODO: Add password recovery link
  // TODO: Handle login errors and loading states
  // TODO: Redirect on successful login

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600"></div>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your GhostPay account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* TODO: Connect form to auth API */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>

            <Button className="w-full">Sign In</Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or</span>
            </div>
          </div>

          <div>
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-semibold text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
