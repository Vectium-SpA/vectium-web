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
  // Preferencias
  preferences: {
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
  };
  // Campos legacy para compatibilidad (se mantienen pero se ignoran)
  subscription?: {
    isPremium: boolean;
    plan: 'free' | 'premium';
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
    // Preferencias
    preferences: {
      theme: data.preferencias?.tema || data.preferences?.theme || 'light',
      fontSize: data.preferences?.fontSize || 'medium',
    },
    // Legacy subscription para compatibilidad con código existente
    subscription: {
      isPremium: data.suscripcion?.is_active || false,
      plan: data.suscripcion?.plan === 'free' ? 'free' : 'premium',
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
// FUNCIONES PREMIUM
// ==========================================

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
 * Verifica si el usuario tiene acceso Premium.
 * Fuente de verdad: suscripción activa (cubre pagos Flow, admin override
 * y RevenueCat sincronizado). Idéntico al modelo de la app móvil (build 42).
 */
export function isPremiumUser(userData: UserData | null): boolean {
  if (!userData) return false;
  return userData.suscripcion.isActive;
}
