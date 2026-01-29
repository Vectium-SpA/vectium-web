'use client';

import { create } from 'zustand';
import { User } from 'firebase/auth';
import {
  UserData,
  isTrialActive as checkTrialActive,
  isPremiumUser,
  getTrialDaysRemaining,
  isTrialExpiring as checkTrialExpiring,
  isTrialExpired as checkTrialExpired,
} from '@/lib/farmateca/firebase/auth';

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setUserData: (userData: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  updateLocalTrialData: (trialStartDate: Date, trialEndDate: Date) => void;
  updateLocalSubscription: (plan: 'monthly' | 'yearly', isActive: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  loading: true,

  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),
  setLoading: (loading) => set({ loading }),
  clearAuth: () => set({ user: null, userData: null, loading: false }),

  updateLocalTrialData: (trialStartDate, trialEndDate) => {
    const { userData } = get();
    if (!userData) return;
    set({
      userData: {
        ...userData,
        trialStartDate,
        trialEndDate,
        hasUsedTrial: true,
        subscription: {
          isPremium: userData.subscription?.isPremium ?? false,
          plan: userData.subscription?.plan ?? 'free',
          trialEndsAt: trialEndDate,
        },
      },
    });
  },

  updateLocalSubscription: (plan, isActive) => {
    const { userData } = get();
    if (!userData) return;
    set({
      userData: {
        ...userData,
        suscripcion: { ...userData.suscripcion, plan, isActive, fechaInicio: isActive ? new Date() : undefined },
        subscription: {
          isPremium: isActive,
          plan: isActive ? 'premium' : 'free',
          trialEndsAt: userData.subscription?.trialEndsAt,
        },
      },
    });
  },
}));

export function useIsPremium(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return isPremiumUser(userData);
}

export function useIsTrialActive(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return checkTrialActive(userData);
}

export function useHasUsedTrial(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return userData?.hasUsedTrial || false;
}

export function useTrialDaysRemaining(): number {
  const userData = useAuthStore((state) => state.userData);
  return getTrialDaysRemaining(userData);
}

export function useIsTrialExpiring(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return checkTrialExpiring(userData);
}

export function useIsTrialExpired(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return checkTrialExpired(userData);
}

export function useSubscriptionStatus() {
  const userData = useAuthStore((state) => state.userData);
  return {
    isPremium: isPremiumUser(userData),
    isTrialActive: checkTrialActive(userData),
    hasUsedTrial: userData?.hasUsedTrial || false,
    trialDaysRemaining: getTrialDaysRemaining(userData),
    isTrialExpiring: checkTrialExpiring(userData),
    isTrialExpired: checkTrialExpired(userData),
    plan: userData?.suscripcion.plan || 'free',
    isSubscriptionActive: userData?.suscripcion.isActive || false,
  };
}
