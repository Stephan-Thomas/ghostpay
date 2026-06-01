/**
 * Sidebar Component
 * Left navigation sidebar (optional)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, TrendingUp, Clock, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/wallets', label: 'Wallets', icon: Wallet },
  { href: '/transactions', label: 'Transactions', icon: TrendingUp },
  { href: '/salary-cycles', label: 'Salary Cycles', icon: Clock },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 lg:block">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* TODO: Add sidebar widgets */}
      {/* - Quick stats */}
      {/* - Recent activity */}
      {/* - Help & Support */}
    </aside>
  );
}
