/**
 * Wallet Store
 * Zustand store for wallet management
 */

import { create } from 'zustand';
import { MasterWallet, DisposableWallet, WalletAlias } from '@ghostpay/shared';

interface WalletState {
  masterWallet: MasterWallet | null;
  disposableWallets: DisposableWallet[];
  walletAliases: WalletAlias[];
  isLoading: boolean;
  
  setMasterWallet: (wallet: MasterWallet | null) => void;
  setDisposableWallets: (wallets: DisposableWallet[]) => void;
  setWalletAliases: (aliases: WalletAlias[]) => void;
  addDisposableWallet: (wallet: DisposableWallet) => void;
  removeDisposableWallet: (walletId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  masterWallet: null,
  disposableWallets: [],
  walletAliases: [],
  isLoading: false,

  setMasterWallet: (wallet) => set({ masterWallet: wallet }),
  
  setDisposableWallets: (wallets) => set({ disposableWallets: wallets }),
  
  setWalletAliases: (aliases) => set({ walletAliases: aliases }),
  
  addDisposableWallet: (wallet) =>
    set((state) => ({
      disposableWallets: [...state.disposableWallets, wallet],
    })),
  
  removeDisposableWallet: (walletId) =>
    set((state) => ({
      disposableWallets: state.disposableWallets.filter((w) => w.id !== walletId),
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
