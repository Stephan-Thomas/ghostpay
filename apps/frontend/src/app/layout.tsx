import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GhostPay - Privacy-Focused Payroll Wallet',
  description: 'A privacy-focused payroll and salary wallet system built on the Stellar blockchain',
  keywords: ['stellar', 'blockchain', 'payroll', 'privacy', 'cryptocurrency', 'wallet'],
  authors: [{ name: 'GhostPay Team' }],
  openGraph: {
    title: 'GhostPay - Privacy-Focused Payroll Wallet',
    description: 'A privacy-focused payroll and salary wallet system built on the Stellar blockchain',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}