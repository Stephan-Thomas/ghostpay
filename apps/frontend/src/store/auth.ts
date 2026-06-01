/**
 * Auth Store
 * Zustand store for authentication state
 */

import { create } from 'zustand';
import { User } from '@ghostpay/shared';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,

  login: (user, accessToken, refreshToken) => {
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    // TODO: Persist to localStorage
    // localStorage.setItem('accessToken', accessToken);
    // if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    // TODO: Clear localStorage
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
  },

  setLoading: (loading) => set({ isLoading: loading }),

  updateUser: (user) => set({ user }),
}));
