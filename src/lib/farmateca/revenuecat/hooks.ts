'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { initializeRevenueCat, getCustomerInfo, isUserPremium, getUserPlan } from './config';

/**
 * Hook que inicializa RevenueCat y sincroniza el estado premium al store.
 * Llámalo UNA VEZ en el AuthProvider.
 *
 * Si RevenueCat dice premium pero Firestore no, actualiza el estado local
 * para que useIsPremium() refleje correctamente (paridad con la app móvil).
 */
export function useSyncRevenueCat(): void {
  const user = useAuthStore((s) => s.user);
  const userData = useAuthStore((s) => s.userData);
  const updateLocalSubscription = useAuthStore((s) => s.updateLocalSubscription);
  const synced = useRef(false);

  useEffect(() => {
    if (!user || synced.current) return;

    initializeRevenueCat(user.uid);

    getCustomerInfo().then((info) => {
      if (!info) return;
      const rcPremium = isUserPremium(info);
      const firestorePremium = userData?.suscripcion?.isActive ?? false;

      if (rcPremium && !firestorePremium) {
        const plan = getUserPlan(info) ?? 'monthly';
        updateLocalSubscription(plan, true);
      }

      synced.current = true;
    }).catch(() => {
      synced.current = true;
    });
  // userData excluido de deps a propósito: solo queremos sincronizar una vez al login
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, updateLocalSubscription]);
}
