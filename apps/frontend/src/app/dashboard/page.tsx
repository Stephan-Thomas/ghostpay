/**
 * Dashboard Page
 * Main user dashboard showing overview of wallets and recent activity
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function DashboardPage() {
  // TODO: Fetch user dashboard data from API
  // TODO: Display wallet balances
  // TODO: Display recent transactions
  // TODO: Display salary cycle information
  // TODO: Add charts and analytics

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,456.50</div>
            <p className="text-xs text-slate-600">XLM + USDC combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
            <Wallet className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-slate-600">1 master + 7 disposable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,200.00</div>
            <p className="text-xs text-slate-600">Incoming payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-600">Confirmations awaited</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add transaction list */}
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2">
                      {i % 2 === 0 ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {i % 2 === 0 ? 'Incoming Transfer' : 'Outgoing Transfer'}
                      </p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${i % 2 === 0 ? 'text-green-600' : 'text-slate-900'}`}>
                    {i % 2 === 0 ? '+' : '-'}$500.00
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Salary Cycles */}
        <Card>
          <CardHeader>
            <CardTitle>Current Cycles</CardTitle>
            <CardDescription>Active salary cycles</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add salary cycle list */}
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-medium">March 2024</p>
                <p className="text-xs text-slate-600">$3,000.00 / $5,000.00</p>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-full w-3/5 rounded-full bg-blue-600"></div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-medium">April 2024</p>
                <p className="text-xs text-slate-600">Pending</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
