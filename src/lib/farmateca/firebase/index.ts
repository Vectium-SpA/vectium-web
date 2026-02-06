/**
 * Firebase - Archivo de índice centralizado para Farmateca
 *
 * Re-exporta todas las instancias y funciones de Firebase desde un solo lugar.
 * Usa named app 'farmateca' para evitar colisiones con otras instancias Firebase.
 *
 * Uso recomendado:
 * import { db, auth, app } from '@/lib/farmateca/firebase';
 * import { signInWithEmail, signOut } from '@/lib/farmateca/firebase';
 */

// Re-exportar instancias de Firebase desde config
export { app, auth, db, storage, FARMATECA_APP_NAME } from './config';

// Re-exportar funciones de autenticación
export {
  signInWithEmail,
  signUpWithEmailAndPassword,
  signOut,
  onAuthStateChange,
  parseFirestoreUserData,
  resetPassword,
  startTrial,
  upgradeToPremiumMock,
  cancelPremiumMock,
  getCurrentUser,
  isTrialActive,
  isPremiumUser,
  getTrialDaysRemaining,
  isTrialExpiring,
  isTrialExpired,
  type UserData,
  type SubscriptionStatus,
} from './auth';
