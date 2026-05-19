'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { checkRevenueCatPremium } from './config';

/**
 * Sincroniza el estado premium de RevenueCat al store de Zustand.
 * Llámalo una vez en el AuthProvider.
 *
 * Si RC dice premium pero Firestore no → llama updateLocalSubscription
 * para que useIsPremium() refleje correctamente (paridad web↔móvil).
 *
 * Espera a que userData esté cargado desde Firestore antes de comparar,
 * evitando una race condition donde RC resuelve antes que Firestore.
 */
export function useSyncRevenueCat(): void {
  const user = useAuthStore((s) => s.user);
  const userData = useAuthStore((s) => s.userData);
  const updateLocalSubscription = useAuthStore((s) => s.updateLocalSubscription);
  // Key por uid: evita re-llamar RC si userData cambia por otro motivo
  const syncedUid = useRef<string | null>(null);

  useEffect(() => {
    // Esperar a que user Y userData estén disponibles (userData carga async desde Firestore)
    if (!user || !userData) return;
    // Solo sincronizar una vez por sesión de usuario
    if (syncedUid.current === user.uid) return;

    syncedUid.current = user.uid;

    checkRevenueCatPremium(user.uid).then(({ isPremium, plan }) => {
      const firestorePremium = userData.suscripcion?.isActive ?? false;

      // Si RC dice premium pero Firestore no lo refleja, actualizar store local
      if (isPremium && !firestorePremium) {
        updateLocalSubscription(plan ?? 'monthly', true);
      }
    }).catch(() => {
      // Silencioso — no degradar la experiencia si RC falla
    });
  }, [user, userData, updateLocalSubscription]);
}
