/**
 * Header Component
 * Top navigation bar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { Button } from '../Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600"></div>
          <span className="hidden font-bold text-slate-900 sm:inline">GhostPay</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100">
            Dashboard
          </Link>
          <Link href="/wallets" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100">
            Wallets
          </Link>
          <Link href="/transactions" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100">
            Transactions
          </Link>
          <Link href="/salary-cycles" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100">
            Salary Cycles
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/settings" className="rounded-md p-2 hover:bg-slate-100 md:hidden">
            <Settings className="h-5 w-5" />
          </Link>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/settings">Settings</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => console.log('logout')}>
            <LogOut className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden rounded-md p-2 hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col">
            <Link href="/dashboard" className="border-b border-slate-100 px-4 py-3 text-sm hover:bg-slate-50">
              Dashboard
            </Link>
            <Link href="/wallets" className="border-b border-slate-100 px-4 py-3 text-sm hover:bg-slate-50">
              Wallets
            </Link>
            <Link href="/transactions" className="border-b border-slate-100 px-4 py-3 text-sm hover:bg-slate-50">
              Transactions
            </Link>
            <Link href="/salary-cycles" className="px-4 py-3 text-sm hover:bg-slate-50">
              Salary Cycles
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
