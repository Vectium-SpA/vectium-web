'use client';

import { create } from 'zustand';
import { User } from 'firebase/auth';
import {
  UserData,
  isPremiumUser,
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
 * Fuente de verdad: suscripción activa (pagos Flow + admin override + RevenueCat).
 */
export function useIsPremium(): boolean {
  const userData = useAuthStore((state) => state.userData);
  return isPremiumUser(userData);
}

/**
 * Hook que devuelve todos los estados de suscripción de una vez.
 * Útil para componentes que necesitan varios estados.
 */
export function useSubscriptionStatus() {
  const userData = useAuthStore((state) => state.userData);

  return {
    isPremium: isPremiumUser(userData),
    plan: userData?.suscripcion.plan || 'free',
    isSubscriptionActive: userData?.suscripcion.isActive || false,
  };
}
