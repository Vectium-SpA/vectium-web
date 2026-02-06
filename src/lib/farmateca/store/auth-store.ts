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
  // Estado base
  user: User | null;
  userData: UserData | null;
  loading: boolean;

  // Acciones
  setUser: (user: User | null) => void;
  setUserData: (userData: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;

  // Helpers para actualizar datos localmente después de acciones
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

  // Actualiza datos locales de trial (evita tener que recargar desde Firestore)
  updateLocalTrialData: (trialStartDate, trialEndDate) => {
    const { userData } = get();
    if (!userData) return;

    set({
      userData: {
        ...userData,
        trialStartDate,
        trialEndDate,
        hasUsedTrial: true,
        // También actualizar el campo legacy
        subscription: {
          isPremium: userData.subscription?.isPremium ?? false,
          plan: userData.subscription?.plan ?? 'free',
          trialEndsAt: trialEndDate,
        },
      },
    });
  },

  // Actualiza datos locales de suscripción
  updateLocalSubscription: (plan, isActive) => {
    const { userData } = get();
    if (!userData) return;

    set({
      userData: {
        ...userData,
        suscripcion: {
          ...userData.suscripcion,
          plan,
          isActive,
          fechaInicio: isActive ? new Date() : undefined,
        },
        // También actualizar el campo legacy
        subscription: {
          isPremium: isActive,
          plan: isActive ? 'premium' : 'free',
          trialEndsAt: userData.subscription?.trialEndsAt,
        },
      },
    });
  },
}));

// ==========================================
// HOOKS SELECTORES PARA ESTADOS COMPUTADOS
// ==========================================

/**
 * Hook para verificar si el usuario tiene acceso Premium.
 * Considera: suscripción activa O trial activo.
 */
export function useIsPremium(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return isPremiumUser(userData);
}

/**
 * Hook para verificar si el trial está activo.
 */
export function useIsTrialActive(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return checkTrialActive(userData);
}

/**
 * Hook para verificar si el usuario ya usó su trial.
 */
export function useHasUsedTrial(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return userData?.hasUsedTrial || false;
}

/**
 * Hook para obtener los días restantes del trial.
 */
export function useTrialDaysRemaining(): number {
  const userData = useAuthStore((state) => state.userData);
  return getTrialDaysRemaining(userData);
}

/**
 * Hook para verificar si el trial está por expirar (≤2 días).
 */
export function useIsTrialExpiring(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return checkTrialExpiring(userData);
}

/**
 * Hook para verificar si el trial ya expiró.
 */
export function useIsTrialExpired(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return checkTrialExpired(userData);
}

/**
 * Hook que devuelve todos los estados de suscripción de una vez.
 * Útil para componentes que necesitan varios estados.
 */
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
