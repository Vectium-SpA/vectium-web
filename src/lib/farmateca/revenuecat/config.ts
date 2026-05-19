'use client';

/**
 * RevenueCat — Farmateca Web
 * Dashboard: https://app.revenuecat.com/projects/fa1ef75c/overview
 *
 * Usa REST API server-side via /api/farmateca/revenuecat/check
 * No requiere Stripe ni web SDK. Funciona con la secret key del proyecto.
 */

export const REVENUECAT_CONFIG = {
  entitlementId: 'premium',
} as const;

/**
 * Consulta el estado premium del usuario via nuestro API route server-side.
 * Retorna { isPremium, plan } — nunca lanza excepción.
 */
export async function checkRevenueCatPremium(uid: string): Promise<{
  isPremium: boolean;
  plan: 'monthly' | 'yearly' | null;
}> {
  try {
    const res = await fetch(`/api/farmateca/revenuecat/check?uid=${encodeURIComponent(uid)}`);
    if (!res.ok) return { isPremium: false, plan: null };
    const data = await res.json() as { isPremium: boolean; plan: 'monthly' | 'yearly' | null };
    return data;
  } catch {
    return { isPremium: false, plan: null };
  }
}
