/**
 * Re-exports del módulo principal de RevenueCat Web.
 * Mantenido para compatibilidad con imports existentes.
 */
export {
  initializeRevenueCat as initializeRevenueCatWeb,
  getCustomerInfo,
  isUserPremium,
  getUserPlan,
  isRevenueCatConfigured,
  REVENUECAT_CONFIG as REVENUECAT_WEB_CONFIG,
} from './config';

// Tipos para compatibilidad con código existente
export interface FarmatecaSubscriptionStatus {
  isActive: boolean;
  plan: 'monthly' | 'yearly' | null;
  expiresAt: Date | null;
}
