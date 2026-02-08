/**
 * RevenueCat Web SDK - Integration Layer (STUBS)
 *
 * This file provides the interface for the RevenueCat Web SDK integration.
 * Currently all functions are STUBS that return mock data or no-ops.
 *
 * When RevenueCat is fully configured (API key + Stripe connected):
 * 1. Install: npm install @revenuecat/purchases-js
 * 2. Set NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY in .env.local
 * 3. Replace stubs below with real SDK calls
 *
 * RevenueCat Web SDK Docs:
 * @see https://www.revenuecat.com/docs/web/web-sdk
 * @see https://github.com/nicklawls/purchases-js
 *
 * Project: Vectium SpA / Farmateca
 * Dashboard: https://app.revenuecat.com/projects/fa1ef75c/overview
 */

const REVENUECAT_WEB_API_KEY = process.env.NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY || '';

// ============================================================
// Types (match RevenueCat SDK types for future compatibility)
// ============================================================

/** Represents a purchasable package within an offering */
export interface FarmatecaPackage {
  /** RevenueCat package identifier (e.g., '$rc_monthly', '$rc_annual') */
  identifier: string;
  /** Display name for the package */
  displayName: string;
  /** Price in CLP */
  priceInCLP: number;
  /** Formatted price string */
  priceString: string;
  /** Billing period */
  period: 'monthly' | 'annual';
}

/** Represents the available offerings */
export interface FarmatecaOfferings {
  current: {
    monthly: FarmatecaPackage;
    annual: FarmatecaPackage;
  } | null;
}

/** Represents the subscription status */
export interface FarmatecaSubscriptionStatus {
  isActive: boolean;
  plan: 'monthly' | 'annual' | null;
  expiresAt: Date | null;
  entitlementId: string | null;
}

// ============================================================
// Mock Data (used while RevenueCat is not connected)
// ============================================================

const MOCK_OFFERINGS: FarmatecaOfferings = {
  current: {
    monthly: {
      identifier: '$rc_monthly',
      displayName: 'Premium Mensual',
      priceInCLP: 3790,
      priceString: '$3.790 CLP/mes',
      period: 'monthly',
    },
    annual: {
      identifier: '$rc_annual',
      displayName: 'Premium Anual',
      priceInCLP: 34990,
      priceString: '$34.990 CLP/año',
      period: 'annual',
    },
  },
};

// ============================================================
// SDK Functions (STUBS)
// ============================================================

/**
 * Initialize RevenueCat Web SDK with a user ID.
 *
 * STUB: Logs a warning. Will initialize Purchases.configure() when API key is set.
 *
 * @param userId - Firebase UID of the authenticated user
 *
 * TODO: Replace with real implementation:
 * ```ts
 * import { Purchases } from '@revenuecat/purchases-js';
 * Purchases.configure(REVENUECAT_WEB_API_KEY, userId);
 * ```
 */
export function initializeRevenueCatWeb(userId: string): void {
  if (typeof window === 'undefined') return;

  if (!REVENUECAT_WEB_API_KEY) {
    console.warn(
      '[Farmateca RC Web] Not configured. Set NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY. ' +
      'Subscription features will use mock data.'
    );
    return;
  }

  // TODO: Uncomment when @revenuecat/purchases-js is installed and key is set
  // import { Purchases } from '@revenuecat/purchases-js';
  // Purchases.configure(REVENUECAT_WEB_API_KEY, userId);

  console.log('[Farmateca RC Web] Stub initialized for user:', userId);
}

/**
 * Get available offerings (packages for purchase).
 *
 * STUB: Returns mock data with monthly and annual plans.
 *
 * @returns Promise with offerings object containing monthly and annual packages
 *
 * TODO: Replace with real implementation:
 * ```ts
 * import { Purchases } from '@revenuecat/purchases-js';
 * const offerings = await Purchases.getSharedInstance().getOfferings();
 * return offerings;
 * ```
 */
export async function getOfferingsWeb(): Promise<FarmatecaOfferings> {
  console.warn('[Farmateca RC Web] getOfferingsWeb() is a stub. Returning mock data.');

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return MOCK_OFFERINGS;
}

/**
 * Purchase a package (initiate checkout via Stripe through RevenueCat).
 *
 * STUB: Logs the intent and returns a simulated success.
 *
 * @param packageId - The package identifier to purchase ('$rc_monthly' or '$rc_annual')
 * @returns Promise resolving to a success indicator
 *
 * TODO: Replace with real implementation:
 * ```ts
 * import { Purchases } from '@revenuecat/purchases-js';
 * const { customerInfo } = await Purchases.getSharedInstance().purchase({ rcPackage });
 * return customerInfo;
 * ```
 */
export async function purchasePackageWeb(
  packageId: string
): Promise<{ success: boolean; message: string }> {
  console.log('[Farmateca RC Web] Purchase requested for package:', packageId);
  console.warn(
    '[Farmateca RC Web] purchasePackageWeb() is a stub. ' +
    'Connect RevenueCat + Stripe to enable real purchases.'
  );

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // STUB: Always return pending status
  return {
    success: false,
    message: 'Integración de pagos pendiente. RevenueCat Web SDK no configurado.',
  };
}

/**
 * Check the current subscription status for the authenticated user.
 *
 * STUB: Returns not-subscribed status.
 *
 * @returns Promise with subscription status object
 *
 * TODO: Replace with real implementation:
 * ```ts
 * import { Purchases } from '@revenuecat/purchases-js';
 * const customerInfo = await Purchases.getSharedInstance().getCustomerInfo();
 * const entitlement = customerInfo.entitlements.active['Farmateca Premium'];
 * return {
 *   isActive: !!entitlement,
 *   plan: entitlement ? (entitlement.productIdentifier.includes('annual') ? 'annual' : 'monthly') : null,
 *   expiresAt: entitlement ? new Date(entitlement.expirationDate) : null,
 *   entitlementId: entitlement ? entitlement.identifier : null,
 * };
 * ```
 */
export async function checkSubscriptionStatusWeb(): Promise<FarmatecaSubscriptionStatus> {
  console.warn('[Farmateca RC Web] checkSubscriptionStatusWeb() is a stub. Returning not-subscribed.');

  return {
    isActive: false,
    plan: null,
    expiresAt: null,
    entitlementId: null,
  };
}

/**
 * Restore purchases for the current user.
 *
 * STUB: Returns not-subscribed status.
 *
 * @returns Promise with subscription status after restore attempt
 *
 * TODO: Replace with real implementation:
 * ```ts
 * import { Purchases } from '@revenuecat/purchases-js';
 * const customerInfo = await Purchases.getSharedInstance().restorePurchases();
 * // ... check entitlements
 * ```
 */
export async function restorePurchasesWeb(): Promise<FarmatecaSubscriptionStatus> {
  console.warn('[Farmateca RC Web] restorePurchasesWeb() is a stub. Nothing to restore.');

  return {
    isActive: false,
    plan: null,
    expiresAt: null,
    entitlementId: null,
  };
}

/**
 * RevenueCat Web configuration constants.
 * Must match the RevenueCat Dashboard configuration.
 */
export const REVENUECAT_WEB_CONFIG = {
  /** Entitlement ID configured in RevenueCat dashboard */
  entitlementId: 'Farmateca Premium',
  /** Default offering identifier */
  offeringId: 'default',
  /** Monthly product identifier (must match dashboard) */
  monthlyProductId: 'farmateca_premium_monthly',
  /** Annual product identifier (must match dashboard) */
  annualProductId: 'farmateca_premium_annual',
};
