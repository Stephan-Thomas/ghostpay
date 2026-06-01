/**
 * Transactions Page
 * View and filter transactions
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { ArrowUpRight, ArrowDownLeft, Filter, Download } from 'lucide-react';

export default function TransactionsPage() {
  // TODO: Fetch transactions from API with filters
  // TODO: Implement pagination
  // TODO: Add search functionality
  // TODO: Add export to CSV
  // TODO: Show transaction details modal

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-slate-600">View and manage all your transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
          <input
            placeholder="Search by address or memo..."
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>All Types</option>
            <option>Incoming</option>
            <option>Outgoing</option>
            <option>Consolidation</option>
          </select>
          <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <Button>Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Your complete transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-sm font-semibold text-slate-900">Type</th>
                  <th className="text-left text-sm font-semibold text-slate-900">Amount</th>
                  <th className="text-left text-sm font-semibold text-slate-900">Address</th>
                  <th className="text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="text-right text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO: Render transactions from API */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {i % 2 === 0 ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="text-sm font-medium">
                          {i % 2 === 0 ? 'Incoming' : 'Outgoing'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-semibold">
                      {i % 2 === 0 ? '+' : '-'}${(Math.random() * 1000).toFixed(2)}
                    </td>
                    <td className="font-mono text-xs py-4 text-slate-600">GB...XYZW</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          i % 3 === 0
                            ? 'bg-green-100 text-green-700'
                            : i % 3 === 1
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {i % 3 === 0 ? 'Confirmed' : i % 3 === 1 ? 'Pending' : 'Failed'}
                      </span>
                    </td>
                    <td className="text-sm text-slate-600 py-4">2 days ago</td>
                    <td className="text-right py-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">Showing 1-10 of 250 transactions</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TODO: Add transaction detail modal */}
    </div>
  );
}
