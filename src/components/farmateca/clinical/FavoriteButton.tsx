'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { doc, setDoc, deleteDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';

interface FavoriteButtonProps {
  itemId: string;
  itemType: 'compound' | 'brand';
  itemName?: string;
  itemMeta?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function FavoriteButton({ itemId, itemType, itemName = '', itemMeta = '', size = 'md', showLabel = false }: FavoriteButtonProps) {
  const { user } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getDocId = () => (itemType === 'compound' ? `compuestos_${itemId}` : `marcas_${itemId}`);

  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      return;
    }

    const docId = getDocId();
    const favoriteRef = doc(db, 'users', user.uid, 'favoritos', docId);
    const unsubscribe = onSnapshot(favoriteRef, (docSnapshot) => setIsFavorite(docSnapshot.exists()));
    return () => unsubscribe();
  }, [user, itemId, itemType]);

  const toggleFavorite = async () => {
    if (!user) {
      window.location.href = '/farmateca/login';
      return;
    }

    setIsLoading(true);
    try {
      const docId = getDocId();
      const favoriteRef = doc(db, 'users', user.uid, 'favoritos', docId);

      if (isFavorite) {
        await deleteDoc(favoriteRef);
      } else {
        const favoriteData = itemType === 'compound'
          ? { tipo: 'compuesto', id: itemId, nombre: itemName, familia: itemMeta, fechaAgregado: serverTimestamp() }
          : { tipo: 'marca', id: itemId, nombre: itemName, laboratorio: itemMeta, fechaAgregado: serverTimestamp() };
        await setDoc(favoriteRef, favoriteData);
      }
    } catch (error) {
      console.error('[FavoriteButton] Toggle error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

  return (
    <motion.button
      onClick={toggleFavorite}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200
        ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${showLabel ? 'px-4 gap-2 w-auto' : ''}`}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <motion.svg
        className={iconSizes[size]}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 2}
        viewBox="0 0 24 24"
        animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </motion.svg>
      {showLabel && <span className="text-sm font-medium">{isFavorite ? 'En favoritos' : 'Agregar a favoritos'}</span>}
    </motion.button>
  );
}
