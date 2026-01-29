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
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './config';

export interface SubscriptionStatus {
  plan: 'free' | 'monthly' | 'yearly';
  isActive: boolean;
  fechaInicio?: Date;
  fechaTermino?: Date;
}

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
  suscripcion: SubscriptionStatus;
  trialStartDate?: Date;
  trialEndDate?: Date;
  hasUsedTrial: boolean;
  preferences: {
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
  };
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

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  nombre: string,
  profesion: string,
  nivel?: string,
  area?: string
): Promise<AuthResult> {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: nombre });

    const now = new Date();
    const userData: UserData = {
      uid: userCredential.user.uid,
      email,
      nombre,
      profesion,
      nivel,
      area,
      fechaRegistro: now,
      ultimaSesion: now,
      suscripcion: { plan: 'free', isActive: false },
      hasUsedTrial: false,
      preferences: { theme: 'light', fontSize: 'medium' },
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userData.uid,
      email: userData.email,
      nombre: userData.nombre,
      profesion: userData.profesion,
      nivel: userData.nivel,
      area: userData.area,
      fecha_registro: Timestamp.fromDate(now),
      ultima_sesion: Timestamp.fromDate(now),
      suscripcion: { plan: 'free', is_active: false },
      has_used_trial: false,
      trial_start_date: null,
      trial_end_date: null,
      preferencias: { tema: userData.preferences.theme, notificaciones: true },
    });

    return { success: true, user: userData };
  } catch (error: unknown) {
    const err = error as { code?: string };
    return { success: false, error: getAuthErrorMessage(err.code || '') };
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

    if (!userDoc.exists()) {
      return { success: false, error: 'Usuario no encontrado en la base de datos' };
    }

    const data = userDoc.data();
    await updateDoc(doc(db, 'users', userCredential.user.uid), { ultima_sesion: Timestamp.now() });
    const userData = parseFirestoreUserData(data, userCredential.user.uid);

    return { success: true, user: userData };
  } catch (error: unknown) {
    const err = error as { code?: string };
    return { success: false, error: getAuthErrorMessage(err.code || '') };
  }
}

export function parseFirestoreUserData(data: Record<string, unknown>, uid: string): UserData {
  const suscripcion = data.suscripcion as Record<string, unknown> | undefined;
  const preferencias = data.preferencias as Record<string, unknown> | undefined;
  const preferences = data.preferences as Record<string, unknown> | undefined;

  return {
    uid: (data.uid as string) || uid,
    email: (data.email as string) || '',
    nombre: (data.nombre as string) || '',
    profesion: (data.profesion as string) || '',
    nivel: data.nivel as string | undefined,
    area: data.area as string | undefined,
    alias: data.alias as string | undefined,
    photoURL: data.photoURL as string | undefined,
    fechaRegistro: (data.fecha_registro as { toDate?: () => Date })?.toDate?.() || new Date(),
    ultimaSesion: (data.ultima_sesion as { toDate?: () => Date })?.toDate?.() || new Date(),
    suscripcion: {
      plan: (suscripcion?.plan as 'free' | 'monthly' | 'yearly') || 'free',
      isActive: (suscripcion?.is_active as boolean) || (suscripcion?.isActive as boolean) || false,
      fechaInicio: (suscripcion?.fecha_inicio as { toDate?: () => Date })?.toDate?.(),
      fechaTermino: (suscripcion?.fecha_termino as { toDate?: () => Date })?.toDate?.(),
    },
    trialStartDate: (data.trial_start_date as { toDate?: () => Date })?.toDate?.(),
    trialEndDate: (data.trial_end_date as { toDate?: () => Date })?.toDate?.(),
    hasUsedTrial: (data.has_used_trial as boolean) || false,
    preferences: {
      theme: ((preferencias?.tema as string) || (preferences?.theme as string) || 'light') as 'light' | 'dark',
      fontSize: ((preferences?.fontSize as string) || 'medium') as 'small' | 'medium' | 'large',
    },
    subscription: {
      isPremium: (suscripcion?.is_active as boolean) || false,
      plan: suscripcion?.plan === 'free' ? 'free' : 'premium',
      trialEndsAt: (data.trial_end_date as { toDate?: () => Date })?.toDate?.(),
    },
  };
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function resetPassword(email: string): Promise<AuthResult> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: string };
    return { success: false, error: getAuthErrorMessage(err.code || '') };
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Este correo electronico ya esta registrado',
    'auth/invalid-email': 'Correo electronico invalido',
    'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contrasena incorrecta',
    'auth/too-many-requests': 'Demasiados intentos. Intenta mas tarde',
    'auth/invalid-credential': 'Credenciales invalidas',
  };
  return errorMessages[errorCode] || 'Error al autenticar. Intenta nuevamente';
}

export async function startTrial(uid: string): Promise<{ success: boolean; error?: string }> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return { success: false, error: 'Usuario no encontrado' };

    const data = userDoc.data();
    if (data.has_used_trial) return { success: false, error: 'Ya has usado tu periodo de prueba gratuito' };

    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 7);

    await updateDoc(doc(db, 'users', uid), {
      trial_start_date: Timestamp.fromDate(now),
      trial_end_date: Timestamp.fromDate(trialEnd),
      has_used_trial: true,
    });

    return { success: true };
  } catch {
    return { success: false, error: 'Error al activar el periodo de prueba' };
  }
}

export function isTrialActive(userData: UserData | null): boolean {
  if (!userData?.trialStartDate || !userData?.trialEndDate || !userData?.hasUsedTrial) return false;
  return new Date() < userData.trialEndDate;
}

export function isPremiumUser(userData: UserData | null): boolean {
  if (!userData) return false;
  if (userData.suscripcion.isActive) return true;
  if (isTrialActive(userData)) return true;
  return false;
}

export function getTrialDaysRemaining(userData: UserData | null): number {
  if (!userData || !isTrialActive(userData) || !userData.trialEndDate) return 0;
  const diffTime = userData.trialEndDate.getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function isTrialExpiring(userData: UserData | null): boolean {
  if (!isTrialActive(userData)) return false;
  return getTrialDaysRemaining(userData) <= 2;
}

export function isTrialExpired(userData: UserData | null): boolean {
  if (!userData?.hasUsedTrial || !userData?.trialEndDate) return false;
  return new Date() > userData.trialEndDate;
}
