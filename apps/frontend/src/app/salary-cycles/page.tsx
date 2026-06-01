/**
 * Salary Cycles Page
 * Create and manage salary cycles
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Plus, Calendar, DollarSign, Wallet } from 'lucide-react';

export default function SalaryCyclesPage() {
  // TODO: Fetch salary cycles from API
  // TODO: Implement cycle creation form
  // TODO: Show consolidation status
  // TODO: Add cycle editing and deletion
  // TODO: Display expected vs actual amounts

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Salary Cycles</h1>
          <p className="text-slate-600">Track and manage your salary payment cycles</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Cycle
        </Button>
      </div>

      {/* Cycles Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* TODO: Render salary cycles from API */}
        {Array.from({ length: 6 }).map((_, i) => {
          const months = ['January', 'February', 'March', 'April', 'May', 'June'];
          const status = i < 2 ? 'ACTIVE' : i < 4 ? 'COMPLETED' : 'PENDING';

          return (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg">{months[i]} 2024</CardTitle>
                <CardDescription>
                  {status === 'ACTIVE' ? 'In Progress' : status === 'COMPLETED' ? 'Completed' : 'Upcoming'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">Mar 1 - Mar 31, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold">$5,000.00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wallet className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">Disposable Wallet Assigned</span>
                  </div>
                </div>

                {status === 'ACTIVE' && (
                  <div>
                    <p className="text-xs text-slate-600 mb-2">Progress</p>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div className="h-full w-2/3 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">$3,333.33 received</p>
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* TODO: Add cycle creation modal */}
      {/* TODO: Add cycle details view */}
      {/* TODO: Add consolidation workflow */}
    </div>
  );
}
