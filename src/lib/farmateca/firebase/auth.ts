'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './config';

/**
 * Interfaz de suscripción compatible con la app Flutter.
 * Usa los mismos campos que la app móvil para sincronización.
 */
export interface SubscriptionStatus {
  plan: 'free' | 'monthly' | 'yearly';
  isActive: boolean;
  fechaInicio?: Date;
  fechaTermino?: Date;
}

/**
 * Interfaz de usuario compatible con la app Flutter.
 * Los campos de trial usan snake_case en Firestore para compatibilidad.
 */
export interface UserData {
  uid: string;
  email: string;
  nombre: string;
  profesion: string;
  nivel?: string;
  area?: string;
  alias?: string;
  photoURL?: string;
  fechaRegistro: Date;
  ultimaSesion: Date;
  // Campos de suscripción (compatibles con app Flutter)
  suscripcion: SubscriptionStatus;
  // Campos de Trial de 7 días (compatibles con app Flutter)
  trialStartDate?: Date;
  trialEndDate?: Date;
  hasUsedTrial: boolean;
  // Preferencias
  preferences: {
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
  };
  // Campos legacy para compatibilidad (se mantienen pero se ignoran)
  subscription?: {
    isPremium: boolean;
    plan: 'free' | 'premium';
    trialEndsAt?: Date;
  };
}

export interface AuthResult {
  success: boolean;
  user?: UserData;
  error?: string;
}

/**
 * Guard: returns false if Firebase auth is not configured.
 */
function ensureAuth(): boolean {
  if (!auth || !db) {
    console.warn('[Farmateca Auth] Firebase not configured. Auth operations disabled.');
    return false;
  }
  return true;
}

/**
 * Register new user with email and password.
 * Compatible con la estructura de datos de la app Flutter.
 */
export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  nombre: string,
  profesion: string,
  nivel?: string,
  area?: string
): Promise<AuthResult> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth!,
      email,
      password
    );

    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName: nombre,
    });

    const now = new Date();

    // Create user document in Firestore (compatible con app Flutter)
    const userData: UserData = {
      uid: userCredential.user.uid,
      email,
      nombre,
      profesion,
      nivel,
      area,
      fechaRegistro: now,
      ultimaSesion: now,
      // Suscripción compatible con app Flutter
      suscripcion: {
        plan: 'free',
        isActive: false,
      },
      // Trial: el usuario nuevo NO ha usado trial aún
      hasUsedTrial: false,
      trialStartDate: undefined,
      trialEndDate: undefined,
      preferences: {
        theme: 'light',
        fontSize: 'medium',
      },
    };

    // Guardar en Firestore con nombres de campos snake_case (compatible con Flutter)
    await setDoc(doc(db!, 'users', userCredential.user.uid), {
      uid: userData.uid,
      email: userData.email,
      nombre: userData.nombre,
      profesion: userData.profesion,
      nivel: userData.nivel,
      area: userData.area,
      fecha_registro: Timestamp.fromDate(now),
      ultima_sesion: Timestamp.fromDate(now),
      // Suscripción (snake_case para Flutter)
      suscripcion: {
        plan: 'free',
        is_active: false,
      },
      // Trial fields (snake_case para Flutter)
      has_used_trial: false,
      trial_start_date: null,
      trial_end_date: null,
      // Preferencias
      preferencias: {
        tema: userData.preferences.theme,
        notificaciones: true,
      },
    });

    return { success: true, user: userData };
  } catch (error: any) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  }
}

/**
 * Sign in user with email and password.
 * Lee datos compatibles con la app Flutter (snake_case en Firestore).
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth!,
      email,
      password
    );

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db!, 'users', userCredential.user.uid));

    if (!userDoc.exists()) {
      return {
        success: false,
        error: 'Usuario no encontrado en la base de datos',
      };
    }

    const data = userDoc.data();

    // Update last login (snake_case para Flutter)
    await updateDoc(doc(db!, 'users', userCredential.user.uid), {
      ultima_sesion: Timestamp.now(),
    });

    // Parsear datos compatibles con Flutter (snake_case)
    const userData = parseFirestoreUserData(data, userCredential.user.uid);

    return { success: true, user: userData };
  } catch (error: any) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  }
}

/**
 * Parsea los datos de Firestore (snake_case) a UserData (camelCase).
 * Compatible con la estructura de la app Flutter.
 */
export function parseFirestoreUserData(data: any, uid: string): UserData {
  return {
    uid: data.uid || uid,
    email: data.email || '',
    nombre: data.nombre || '',
    profesion: data.profesion || '',
    nivel: data.nivel,
    area: data.area,
    alias: data.alias,
    photoURL: data.photoURL,
    fechaRegistro: data.fecha_registro?.toDate?.() || data.fechaRegistro?.toDate?.() || new Date(),
    ultimaSesion: data.ultima_sesion?.toDate?.() || data.ultimaSesion?.toDate?.() || new Date(),
    // Suscripción (compatible con Flutter)
    suscripcion: {
      plan: data.suscripcion?.plan || 'free',
      isActive: data.suscripcion?.is_active || data.suscripcion?.isActive || false,
      fechaInicio: data.suscripcion?.fecha_inicio?.toDate?.(),
      fechaTermino: data.suscripcion?.fecha_termino?.toDate?.(),
    },
    // Trial fields (compatible con Flutter - snake_case)
    trialStartDate: data.trial_start_date?.toDate?.(),
    trialEndDate: data.trial_end_date?.toDate?.(),
    hasUsedTrial: data.has_used_trial || false,
    // Preferencias
    preferences: {
      theme: data.preferencias?.tema || data.preferences?.theme || 'light',
      fontSize: data.preferences?.fontSize || 'medium',
    },
    // Legacy subscription para compatibilidad con código existente
    subscription: {
      isPremium: data.suscripcion?.is_active || false,
      plan: data.suscripcion?.plan === 'free' ? 'free' : 'premium',
      trialEndsAt: data.trial_end_date?.toDate?.(),
    },
  };
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  if (!auth) return;
  await firebaseSignOut(auth);
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    await sendPasswordResetEmail(auth!, email);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  }
}

/**
 * Sign in with Google
 * Compatible con la estructura de datos de la app Flutter.
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const userCredential = await signInWithPopup(auth!, provider);
    const user = userCredential.user;

    // Check if user document exists in Firestore
    const userDoc = await getDoc(doc(db!, 'users', user.uid));

    const now = new Date();

    if (!userDoc.exists()) {
      // New user - create document with Flutter-compatible structure
      const userData: UserData = {
        uid: user.uid,
        email: user.email || '',
        nombre: user.displayName || user.email?.split('@')[0] || 'Usuario',
        profesion: 'No especificado',
        photoURL: user.photoURL || undefined,
        fechaRegistro: now,
        ultimaSesion: now,
        // Suscripción compatible con app Flutter
        suscripcion: {
          plan: 'free',
          isActive: false,
        },
        // Trial: el usuario nuevo NO ha usado trial aún
        hasUsedTrial: false,
        trialStartDate: undefined,
        trialEndDate: undefined,
        preferences: {
          theme: 'light',
          fontSize: 'medium',
        },
      };

      // Save to Firestore with snake_case (compatible with Flutter)
      await setDoc(doc(db!, 'users', user.uid), {
        uid: userData.uid,
        email: userData.email,
        nombre: userData.nombre,
        profesion: userData.profesion,
        photoURL: userData.photoURL,
        fecha_registro: Timestamp.fromDate(now),
        ultima_sesion: Timestamp.fromDate(now),
        // Suscripción (snake_case para Flutter)
        suscripcion: {
          plan: 'free',
          is_active: false,
        },
        // Trial fields (snake_case para Flutter)
        has_used_trial: false,
        trial_start_date: null,
        trial_end_date: null,
        // Preferencias
        preferencias: {
          tema: userData.preferences.theme,
          notificaciones: true,
        },
      });

      return { success: true, user: userData };
    } else {
      // Existing user - update last login
      await updateDoc(doc(db!, 'users', user.uid), {
        ultima_sesion: Timestamp.now(),
      });

      // Parse user data from Firestore
      const data = userDoc.data();
      const userData = parseFirestoreUserData(data, user.uid);

      return { success: true, user: userData };
    }
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    return {
      success: false,
      error: getAuthErrorMessage(error.code),
    };
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  if (!auth) {
    // If not configured, call back immediately with null
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  if (!auth) return null;
  return auth.currentUser;
}

/**
 * Convert Firebase error codes to user-friendly messages
 */
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Este correo electrónico ya está registrado',
    'auth/invalid-email': 'Correo electrónico inválido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
    'auth/network-request-failed': 'Error de red. Verifica tu conexión',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/popup-blocked': 'Popup bloqueado. Permite popups para iniciar sesión',
    'auth/popup-closed-by-user': 'Inicio de sesión cancelado',
    'auth/cancelled-popup-request': 'Inicio de sesión cancelado',
    'auth/unauthorized-domain': 'Dominio no autorizado. Contacta a soporte',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con este correo usando otro método',
  };

  return errorMessages[errorCode] || 'Error al autenticar. Intenta nuevamente';
}

// ==========================================
// TRIAL DE 7 DÍAS Y FUNCIONES PREMIUM
// ==========================================

/**
 * Activa el trial de 7 días para el usuario actual.
 * Solo se puede activar UNA VEZ por usuario.
 * Compatible con la app Flutter (usa snake_case en Firestore).
 */
export async function startTrial(uid: string): Promise<{ success: boolean; error?: string }> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    // Verificar si ya usó el trial
    const userDoc = await getDoc(doc(db!, 'users', uid));
    if (!userDoc.exists()) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    const data = userDoc.data();
    if (data.has_used_trial) {
      return { success: false, error: 'Ya has usado tu período de prueba gratuito' };
    }

    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 7);

    // Actualizar Firestore (snake_case para Flutter)
    await updateDoc(doc(db!, 'users', uid), {
      trial_start_date: Timestamp.fromDate(now),
      trial_end_date: Timestamp.fromDate(trialEnd),
      has_used_trial: true,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error activando trial:', error);
    return { success: false, error: 'Error al activar el período de prueba' };
  }
}

/**
 * Simula la compra de un plan premium (mock para desarrollo).
 * En producción, esto se reemplazará por RevenueCat/Stripe.
 */
export async function upgradeToPremiumMock(
  uid: string,
  plan: 'monthly' | 'yearly'
): Promise<{ success: boolean; error?: string }> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    const now = new Date();
    const endDate = new Date(now);

    // Calcular fecha de término según el plan
    if (plan === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Actualizar Firestore (snake_case para Flutter)
    await updateDoc(doc(db!, 'users', uid), {
      suscripcion: {
        plan: plan,
        is_active: true,
        fecha_inicio: Timestamp.fromDate(now),
        fecha_termino: Timestamp.fromDate(endDate),
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error actualizando suscripción:', error);
    return { success: false, error: 'Error al procesar la suscripción' };
  }
}

/**
 * Cancela la suscripción premium (mock para desarrollo).
 */
export async function cancelPremiumMock(uid: string): Promise<{ success: boolean; error?: string }> {
  if (!ensureAuth()) {
    return { success: false, error: 'Firebase no configurado' };
  }

  try {
    await updateDoc(doc(db!, 'users', uid), {
      suscripcion: {
        plan: 'free',
        is_active: false,
        fecha_inicio: null,
        fecha_termino: null,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error cancelando suscripción:', error);
    return { success: false, error: 'Error al cancelar la suscripción' };
  }
}

// ==========================================
// FUNCIONES HELPER PARA CALCULAR ESTADOS
// ==========================================

/**
 * Verifica si el trial está activo (dentro del período de 7 días).
 */
export function isTrialActive(userData: UserData | null): boolean {
  if (!userData) return false;
  if (!userData.trialStartDate || !userData.trialEndDate) return false;
  if (!userData.hasUsedTrial) return false;
  return new Date() < userData.trialEndDate;
}

/**
 * Verifica si el usuario tiene acceso Premium.
 * Considera: 1) Suscripción activa, 2) Trial activo
 */
export function isPremiumUser(userData: UserData | null): boolean {
  if (!userData) return false;
  // 1. Verificar suscripción activa
  if (userData.suscripcion.isActive) return true;
  // 2. Verificar Trial activo
  if (isTrialActive(userData)) return true;
  return false;
}

/**
 * Calcula los días restantes del trial.
 */
export function getTrialDaysRemaining(userData: UserData | null): number {
  if (!userData) return 0;
  if (!isTrialActive(userData)) return 0;
  if (!userData.trialEndDate) return 0;

  const now = new Date();
  const diffTime = userData.trialEndDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Verifica si el trial está por expirar (≤2 días restantes).
 */
export function isTrialExpiring(userData: UserData | null): boolean {
  if (!isTrialActive(userData)) return false;
  return getTrialDaysRemaining(userData) <= 2;
}

/**
 * Verifica si el trial ya expiró (usó trial pero ya pasó la fecha).
 */
export function isTrialExpired(userData: UserData | null): boolean {
  if (!userData) return false;
  if (!userData.hasUsedTrial) return false;
  if (!userData.trialEndDate) return false;
  return new Date() > userData.trialEndDate;
}
