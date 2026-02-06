'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { loadFarmatecaDataClient, FarmatecaCompound, FarmatecaBrand } from '@/lib/farmateca/api/data';

/**
 * Item de favorito con datos completos
 */
export interface FavoriteItem {
  docId: string;
  id: string;
  tipo: 'compuesto' | 'marca';
  nombre: string;
  familia?: string;
  laboratorio?: string;
  fechaAgregado: Date;
}

/**
 * Cache de datos de Farmateca para lookup de nombres
 */
let farmatecaCache: {
  compuestos: Map<string, FarmatecaCompound>;
  marcas: Map<string, FarmatecaBrand>;
} | null = null;

/**
 * Carga y cachea los datos de farmateca_master.json
 */
async function loadFarmatecaCache() {
  if (farmatecaCache) return farmatecaCache;

  try {
    const data = await loadFarmatecaDataClient();

    // Crear maps para lookup rápido por ID
    const compuestosMap = new Map<string, FarmatecaCompound>();
    data.compuestos.forEach((c) => {
      compuestosMap.set(c.ID_PA, c);
    });

    const marcasMap = new Map<string, FarmatecaBrand>();
    data.marcas.forEach((m) => {
      marcasMap.set(m.ID_MA, m);
    });

    farmatecaCache = {
      compuestos: compuestosMap,
      marcas: marcasMap,
    };

    return farmatecaCache;
  } catch (error) {
    console.error('[Farmateca] Error loading farmateca cache:', error);
    return null;
  }
}

/**
 * Extrae el ID real del docId de Firestore
 * Ej: "compuestos_PA-000003" → "PA-000003"
 *     "marcas_MA-000001" → "MA-000001"
 */
function extractIdFromDocId(docId: string): string {
  if (docId.startsWith('compuestos_')) {
    return docId.replace('compuestos_', '');
  }
  if (docId.startsWith('marcas_')) {
    return docId.replace('marcas_', '');
  }
  return docId;
}

/**
 * Hook global para favoritos con real-time sync via onSnapshot
 * Incluye lookup de nombres reales desde farmateca_master.json
 *
 * NOTE: Requires Firebase to be configured. Returns empty state if not.
 */
export function useFavorites() {
  const user = useAuthStore((state) => state.user);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cache, setCache] = useState<typeof farmatecaCache>(null);

  // Cargar cache de farmateca al montar
  useEffect(() => {
    loadFarmatecaCache().then((c) => {
      setCache(c);
    });
  }, []);

  // Listener real-time de Firestore
  useEffect(() => {
    if (!user || !db) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    const favoritesRef = collection(db, 'users', user.uid, 'favoritos');
    const q = query(favoritesRef, orderBy('fechaAgregado', 'desc'));

    console.log('[Farmateca useFavorites] Setting up onSnapshot listener for:', user.uid);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log('[Farmateca useFavorites] Snapshot received, docs:', snapshot.size);

        const items: FavoriteItem[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;
          const id = data.id || extractIdFromDocId(docId);
          const tipo = data.tipo === 'compuesto' ? 'compuesto' : 'marca';

          // Lookup nombre real desde cache
          let nombre = data.nombre || 'Sin nombre';
          let familia = data.familia;
          let laboratorio = data.laboratorio;

          if (cache) {
            if (tipo === 'compuesto' && cache.compuestos.has(id)) {
              const compound = cache.compuestos.get(id)!;
              nombre = compound.PA;
              familia = compound.Familia;
            } else if (tipo === 'marca' && cache.marcas.has(id)) {
              const brand = cache.marcas.get(id)!;
              nombre = brand.MA;
              laboratorio = brand.Lab_M;
            }
          }

          items.push({
            docId,
            id,
            tipo,
            nombre,
            familia,
            laboratorio,
            fechaAgregado: data.fechaAgregado?.toDate() || new Date(),
          });
        });

        console.log('[Farmateca useFavorites] Processed items:', items.length);
        setFavorites(items);
        setIsLoading(false);
      },
      (error) => {
        console.error('[Farmateca useFavorites] Error in onSnapshot:', error);
        setIsLoading(false);
      }
    );

    // Cleanup: unsubscribe al desmontar
    return () => {
      console.log('[Farmateca useFavorites] Unsubscribing from onSnapshot');
      unsubscribe();
    };
  }, [user, cache]);

  // Check if an item is favorite
  const isFavorite = useCallback(
    (id: string, tipo: 'compound' | 'brand'): boolean => {
      const tipoNormalized = tipo === 'compound' ? 'compuesto' : 'marca';
      return favorites.some((f) => f.id === id && f.tipo === tipoNormalized);
    },
    [favorites]
  );

  // Get favorite by ID
  const getFavorite = useCallback(
    (id: string): FavoriteItem | undefined => {
      return favorites.find((f) => f.id === id);
    },
    [favorites]
  );

  return {
    favorites,
    isLoading,
    isFavorite,
    getFavorite,
    compuestosCount: favorites.filter((f) => f.tipo === 'compuesto').length,
    marcasCount: favorites.filter((f) => f.tipo === 'marca').length,
  };
}
