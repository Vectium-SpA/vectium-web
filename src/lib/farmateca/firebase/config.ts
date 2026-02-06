import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Firebase configuration for Farmateca.
 * Uses NAMED app 'farmateca' to avoid collisions with Vectium's Firebase instance.
 *
 * Environment variables: NEXT_PUBLIC_FARMATECA_FIREBASE_*
 */

const FARMATECA_APP_NAME = 'farmateca';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FARMATECA_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FARMATECA_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FARMATECA_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FARMATECA_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FARMATECA_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FARMATECA_FIREBASE_APP_ID,
};

// Check if config is provided (graceful degradation if not configured)
const isConfigured = !!firebaseConfig.apiKey;

// Initialize Firebase with named app (singleton pattern)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (typeof window !== 'undefined' && isConfigured) {
  // Client-side initialization with named app
  try {
    // Check if the named app already exists
    const existingApps = getApps();
    const existingApp = existingApps.find((a) => a.name === FARMATECA_APP_NAME);

    if (existingApp) {
      app = existingApp;
    } else {
      app = initializeApp(firebaseConfig, FARMATECA_APP_NAME);
    }

    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('[Farmateca Firebase] Initialization error:', error);
  }
} else if (typeof window !== 'undefined' && !isConfigured) {
  console.warn(
    '[Farmateca Firebase] Not configured. Set NEXT_PUBLIC_FARMATECA_FIREBASE_* env vars. ' +
    'Auth features will be disabled.'
  );
}

export { app, auth, db, storage, FARMATECA_APP_NAME };
