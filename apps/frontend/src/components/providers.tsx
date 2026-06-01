/**
 * Frontend Providers
 * Client-side providers and context setup
 */

'use client';

import { ReactNode } from 'react';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from '@/lib/api-client';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // TODO: Add React Query provider
  // TODO: Add auth context provider
  // TODO: Add notification provider
  // TODO: Add theme provider

  return <>{children}</>;
}
