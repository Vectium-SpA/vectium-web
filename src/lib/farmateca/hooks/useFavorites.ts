'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { loadFarmatecaDataClient, FarmatecaCompound, FarmatecaBrand } from '@/lib/farmateca/api/data';

export interface FavoriteItem {
  docId: string;
  id: string;
  tipo: 'compuesto' | 'marca';
  nombre: string;
  familia?: string;
  laboratorio?: string;
  fechaAgregado: Date;
}

let farmatecaCache: {
  compuestos: Map<string, FarmatecaCompound>;
  marcas: Map<string, FarmatecaBrand>;
} | null = null;

async function loadFarmatecaCache() {
  if (farmatecaCache) return farmatecaCache;
  try {
    const data = await loadFarmatecaDataClient();
    const compuestosMap = new Map<string, FarmatecaCompound>();
    data.compuestos.forEach((c) => compuestosMap.set(c.ID_PA, c));
    const marcasMap = new Map<string, FarmatecaBrand>();
    data.marcas.forEach((m) => marcasMap.set(m.ID_MA, m));
    farmatecaCache = { compuestos: compuestosMap, marcas: marcasMap };
    return farmatecaCache;
  } catch {
    return null;
  }
}

function extractIdFromDocId(docId: string): string {
  if (docId.startsWith('compuestos_')) return docId.replace('compuestos_', '');
  if (docId.startsWith('marcas_')) return docId.replace('marcas_', '');
  return docId;
}

export function useFavorites() {
  const user = useAuthStore((state) => state.user);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cache, setCache] = useState<typeof farmatecaCache>(null);

  useEffect(() => {
    loadFarmatecaCache().then((c) => setCache(c));
  }, []);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    const favoritesRef = collection(db, 'users', user.uid, 'favoritos');
    const q = query(favoritesRef, orderBy('fechaAgregado', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: FavoriteItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;
          const id = data.id || extractIdFromDocId(docId);
          const tipo = data.tipo === 'compuesto' ? 'compuesto' : 'marca';

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
        setFavorites(items);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );

    return () => unsubscribe();
  }, [user, cache]);

  const isFavorite = useCallback(
    (id: string, tipo: 'compound' | 'brand'): boolean => {
      const tipoNormalized = tipo === 'compound' ? 'compuesto' : 'marca';
      return favorites.some((f) => f.id === id && f.tipo === tipoNormalized);
    },
    [favorites]
  );

  const getFavorite = useCallback((id: string): FavoriteItem | undefined => favorites.find((f) => f.id === id), [favorites]);

  return {
    favorites,
    isLoading,
    isFavorite,
    getFavorite,
    compuestosCount: favorites.filter((f) => f.tipo === 'compuesto').length,
    marcasCount: favorites.filter((f) => f.tipo === 'marca').length,
  };
}
