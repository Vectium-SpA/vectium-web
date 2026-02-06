/**
 * RevenueCat Web SDK Configuration (STUB)
 * Unified subscriptions for mobile (Flutter) + web (Next.js)
 *
 * Project: Vectium SpA / Farmateca
 * Dashboard: https://app.revenuecat.com/projects/fa1ef75c/overview
 *
 * NOTE: This is a stub implementation. The actual @revenuecat/purchases-js
 * dependency will be added when RevenueCat integration is activated.
 * For now, all functions are no-ops that log warnings.
 */

// RevenueCat API Key (Web platform)
const REVENUECAT_WEB_API_KEY = process.env.NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY || '';

if (!REVENUECAT_WEB_API_KEY && typeof window !== 'undefined') {
  console.warn(
    '[Farmateca RevenueCat] Missing NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY. ' +
    'Get it from RevenueCat Dashboard → Apps → Web → Public API Key. ' +
    'Subscription features will be disabled.'
  );
}

/**
 * Initialize RevenueCat SDK (client-side only)
 * STUB: Logs a warning and returns. Will be implemented when dependency is added.
 */
export function initializeRevenueCat(userId: string): void {
  if (typeof window === 'undefined') return; // Server-side guard

  if (!REVENUECAT_WEB_API_KEY) {
    console.warn('[Farmateca RevenueCat] Not configured. Skipping initialization.');
    return;
  }

  // TODO: Uncomment when @revenuecat/purchases-js is installed
  // import { Purchases } from '@revenuecat/purchases-js';
  // Purchases.configure({
  //   apiKey: REVENUECAT_WEB_API_KEY,
  //   appUserId: userId,
  // });

  console.log('[Farmateca RevenueCat] Stub initialized for user:', userId);
}

/**
 * Get customer info (subscription status, entitlements)
 * STUB: Returns null. Will be implemented when dependency is added.
 */
export async function getCustomerInfo(): Promise<any> {
  console.warn('[Farmateca RevenueCat] getCustomerInfo() is a stub. Returning null.');
  return null;
}

/**
 * Get current offerings (packages available for purchase)
 * STUB: Returns null. Will be implemented when dependency is added.
 */
export async function getCurrentOfferings(): Promise<any> {
  console.warn('[Farmateca RevenueCat] getCurrentOfferings() is a stub. Returning null.');
  return null;
}

/**
 * Purchase a package
 * STUB: Returns null. Will be implemented when dependency is added.
 */
export async function purchasePackage(packageToPurchase: any): Promise<any> {
  console.warn('[Farmateca RevenueCat] purchasePackage() is a stub. Returning null.');
  return null;
}

/**
 * Check if user has active premium subscription
 * STUB: Returns false. Will be implemented when dependency is added.
 */
export function isUserPremium(customerInfo: any): boolean {
  if (!customerInfo) return false;
  // Verificar entitlement "Farmateca Premium" (configurado en dashboard)
  const entitlement = customerInfo?.entitlements?.active?.['Farmateca Premium'];
  return !!entitlement;
}

/**
 * RevenueCat configuration constants
 */
export const REVENUECAT_CONFIG = {
  entitlementId: 'Farmateca Premium', // Debe coincidir con dashboard
  offeringId: 'default', // Offering configurado en dashboard
};
