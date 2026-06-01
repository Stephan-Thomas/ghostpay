/**
 * Frontend Hooks
 * Custom React hooks for common operations
 */

import { useCallback, useState } from 'react';
import apiClient from '@/lib/api-client';

/**
 * useApi Hook
 * Generic hook for API calls with loading and error states
 */
export function useApi<T>(
  url: string,
  options?: { method?: string; immediate?: boolean }
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (body?: any) => {
      setIsLoading(true);
      setError(null);
      try {
        // TODO: Implement proper API call
        // const response = await apiClient.request({ url, method: options?.method, data: body });
        // setData(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setIsLoading(false);
        throw err;
      }
    },
    [url, options]
  );

  return { data, error, isLoading, execute };
}

/**
 * useLocalStorage Hook
 * Manage localStorage with hooks
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

/**
 * useAsync Hook
 * Handle async operations with loading and error states
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  // TODO: Add useEffect for immediate execution

  return { execute, status, data, error };
}

// TODO: Add more custom hooks
// - useAuth - Auth-related operations
// - useWallet - Wallet operations
// - useTransaction - Transaction operations
// - useNotification - Notification handling
// - useDebounce - Debounced values
// - useTheme - Theme management
