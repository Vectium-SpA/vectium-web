'use client';

import { useEffect } from 'react';
import { onAuthStateChange, parseFirestoreUserData } from '@/lib/farmateca/firebase/auth';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase/config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setUserData, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setLoading(true);

      if (user) {
        setUser(user);

        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            // Usar la función de parseo compatible con Flutter
            const userData = parseFirestoreUserData(data, user.uid);
            setUserData(userData);
          } else {
            console.warn('User document not found in Firestore');
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserData, setLoading]);

  return <>{children}</>;
}
