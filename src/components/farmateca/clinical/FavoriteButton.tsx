'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  /** ID del item (idPA para compuesto, idMA para marca) */
  itemId: string;
  /** Tipo de item: 'compound' | 'brand' */
  itemType: 'compound' | 'brand';
  /** Nombre del item (para guardar en Firestore) */
  itemName?: string;
  /** Familia o laboratorio (metadata adicional) */
  itemMeta?: string;
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Mostrar texto junto al icono */
  showLabel?: boolean;
}

/**
 * Botón de favoritos que sincroniza con Firestore en REAL-TIME.
 * Usa onSnapshot para actualización instantánea bidireccional.
 *
 * Estructura Firestore:
 * users/{userId}/favoritos/compuestos_{idPA} -> { tipo, id, nombre, familia, fechaAgregado }
 * users/{userId}/favoritos/marcas_{idMA} -> { tipo, id, nombre, laboratorio, fechaAgregado }
 */
export function FavoriteButton({
  itemId,
  itemType,
  itemName = '',
  itemMeta = '',
  size = 'md',
  showLabel = false,
}: FavoriteButtonProps) {
  const { user } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generar el docId para la subcolección (formato móvil)
  const getDocId = () => {
    return itemType === 'compound'
      ? `compuestos_${itemId}`
      : `marcas_${itemId}`;
  };

  // REAL-TIME: Sincronizar estado con onSnapshot
  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      return;
    }

    const docId = getDocId();
    const favoriteRef = doc(db, 'users', user.uid, 'favoritos', docId);

    // Listener real-time para este documento específico
    const unsubscribe = onSnapshot(
      favoriteRef,
      (docSnapshot) => {
        const exists = docSnapshot.exists();
        setIsFavorite(exists);
        console.log(`[FavoriteButton] ${docId} exists:`, exists);
      },
      (error) => {
        console.error('[FavoriteButton] onSnapshot error:', error);
      }
    );

    return () => unsubscribe();
  }, [user, itemId, itemType]);

  const toggleFavorite = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);

    try {
      const docId = getDocId();
      const favoriteRef = doc(db, 'users', user.uid, 'favoritos', docId);

      if (isFavorite) {
        // Remover de favoritos
        await deleteDoc(favoriteRef);
        toast.success('Eliminado de favoritos');
        console.log(`[FavoriteButton] Deleted: ${docId}`);
      } else {
        // Agregar a favoritos con datos completos
        const favoriteData =
          itemType === 'compound'
            ? {
                tipo: 'compuesto',
                id: itemId,
                nombre: itemName,
                familia: itemMeta,
                fechaAgregado: serverTimestamp(),
              }
            : {
                tipo: 'marca',
                id: itemId,
                nombre: itemName,
                laboratorio: itemMeta,
                fechaAgregado: serverTimestamp(),
              };

        await setDoc(favoriteRef, favoriteData);
        toast.success('Agregado a favoritos ❤️');
        console.log(`[FavoriteButton] Added: ${docId}`, favoriteData);
      }
      // No necesitamos setIsFavorite aquí - onSnapshot lo hará automáticamente
    } catch (error) {
      console.error('[FavoriteButton] Toggle error:', error);
      toast.error('Algo salió mal');
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      onClick={toggleFavorite}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        transition-all duration-200
        ${
          isFavorite
            ? 'bg-farmateca-favorites/10 text-farmateca-favorites'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${showLabel ? 'px-4 gap-2 w-auto' : ''}
      `}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <motion.svg
        className={iconSizes[size]}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 2}
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: isFavorite ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </motion.svg>

      {showLabel && (
        <span className="text-sm font-medium">
          {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
        </span>
      )}
    </motion.button>
  );
}
