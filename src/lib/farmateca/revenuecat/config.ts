'use client';

/**
 * RevenueCat Web SDK — Farmateca
 * Dashboard: https://app.revenuecat.com/projects/fa1ef75c/overview
 *
 * Requiere: NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY en .env.local
 * Crear en: RevenueCat Dashboard → Apps → Add new app → Web → Public API Key
 */

import { Purchases, type CustomerInfo } from '@revenuecat/purchases-js';

const REVENUECAT_WEB_API_KEY = process.env.NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY ?? '';

export const REVENUECAT_CONFIG = {
  entitlementId: 'premium',
  offeringId: 'default',
} as const;

export function isRevenueCatConfigured(): boolean {
  return Boolean(REVENUECAT_WEB_API_KEY);
}

/**
 * Inicializa RevenueCat Web SDK con el uid de Firebase.
 * Llama esto una vez al hacer login. No-op si falta la API key.
 */
export function initializeRevenueCat(userId: string): void {
  if (typeof window === 'undefined') return;
  if (!REVENUECAT_WEB_API_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Farmateca RC] NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY no configurado. ' +
        'Crea una app Web en RevenueCat Dashboard para activar esta integración.'
      );
    }
    return;
  }

  try {
    if (!Purchases.isConfigured()) {
      Purchases.configure(REVENUECAT_WEB_API_KEY, userId);
    }
  } catch (e) {
    console.warn('[Farmateca RC] Error al inicializar:', e);
  }
}

/**
 * Obtiene la info del cliente (entitlements activos).
 * Retorna null si RevenueCat no está configurado o hay error.
 */
export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!REVENUECAT_WEB_API_KEY) return null;
  try {
    return await Purchases.getSharedInstance().getCustomerInfo();
  } catch {
    return null;
  }
}

/**
 * Verifica si el usuario tiene el entitlement 'premium' activo en RevenueCat.
 */
export function isUserPremium(customerInfo: CustomerInfo | null): boolean {
  if (!customerInfo) return false;
  return customerInfo.entitlements.active[REVENUECAT_CONFIG.entitlementId]?.isActive === true;
}

/**
 * Obtiene el plan del usuario desde RevenueCat ('monthly' | 'yearly' | null).
 */
export function getUserPlan(customerInfo: CustomerInfo | null): 'monthly' | 'yearly' | null {
  if (!customerInfo) return null;
  const entitlement = customerInfo.entitlements.active[REVENUECAT_CONFIG.entitlementId];
  if (!entitlement?.isActive) return null;
  const productId = entitlement.productIdentifier ?? '';
  return productId.includes('annual') || productId.includes('yearly') || productId === 'Anual'
    ? 'yearly'
    : 'monthly';
}
