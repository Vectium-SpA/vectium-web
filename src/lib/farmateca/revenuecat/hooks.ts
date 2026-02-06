'use client';

import { useEffect, useState } from 'react';
import { getCustomerInfo, isUserPremium } from './config';

/**
 * Hook para verificar estado de suscripción via RevenueCat.
 * STUB: Returns isPremium=false until RevenueCat is fully integrated.
 */
export function useRevenueCatSubscription() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      try {
        const customerInfo = await getCustomerInfo();
        setIsPremium(isUserPremium(customerInfo));
      } catch (error) {
        console.error('[Farmateca RevenueCat] Error checking subscription:', error);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();
  }, []);

  return { isPremium, loading };
}
