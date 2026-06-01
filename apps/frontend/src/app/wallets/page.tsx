/**
 * Wallets Page
 * Display and manage all user wallets
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Copy, Eye, EyeOff, QrCode, Trash2, Plus } from 'lucide-react';

export default function WalletsPage() {
  // TODO: Fetch wallets from API
  // TODO: Implement wallet creation
  // TODO: Implement wallet deletion
  // TODO: Show QR codes for each wallet
  // TODO: Implement fund consolidation UI

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Wallets</h1>
          <p className="text-slate-600">Manage your master and disposable wallets</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Wallet
        </Button>
      </div>

      {/* Master Wallet Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Master Wallet</h2>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Main Vault</CardTitle>
                <CardDescription className="font-mono text-xs">
                  GBVD...XYZW{' '}
                  <Button variant="ghost" size="icon" className="h-4 w-4">
                    <Copy className="h-3 w-3" />
                  </Button>
                </CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Balance</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold">10,250.50 XLM</p>
                <p className="text-sm text-slate-600">$7,500.00 USDC</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disposable Wallets Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Disposable Wallets</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* TODO: Render disposable wallets list */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">Cycle {i + 1}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      GBXY...{String(i).padStart(4, '0')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <EyeOff className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <QrCode className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600">Balance</p>
                  <p className="text-sm font-semibold">{(Math.random() * 1000).toFixed(2)} XLM</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    Consolidate
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* TODO: Add wallet creation modal */}
      {/* TODO: Add wallet details modal */}
      {/* TODO: Add consolidation workflow */}
    </div>
  );
}
