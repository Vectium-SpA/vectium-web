/**
 * Re-exports del módulo principal de RevenueCat.
 * Mantenido para compatibilidad con imports existentes.
 */
export { checkRevenueCatPremium, REVENUECAT_CONFIG } from './config';

export interface FarmatecaSubscriptionStatus {
  isActive: boolean;
  plan: 'monthly' | 'yearly' | null;
}
