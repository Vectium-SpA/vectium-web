export { app, auth, db, storage } from './config';
export {
  signInWithEmail,
  signUpWithEmailAndPassword,
  signOut,
  onAuthStateChange,
  parseFirestoreUserData,
  resetPassword,
  startTrial,
  getCurrentUser,
  isTrialActive,
  isPremiumUser,
  getTrialDaysRemaining,
  isTrialExpiring,
  isTrialExpired,
  type UserData,
  type SubscriptionStatus,
} from './auth';
