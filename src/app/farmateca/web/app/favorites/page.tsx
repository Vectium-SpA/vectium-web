'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { useFavorites, FavoriteItem } from '@/lib/farmateca/hooks/useFavorites';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';

export default function FavoritesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { favorites, isLoading, compuestosCount, marcasCount } = useFavorites();
  const [filter, setFilter] = useState<'todos' | 'compuestos' | 'marcas'>('todos');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filtrar favoritos por tipo
  const filteredFavorites = favorites.filter((item) => {
    if (filter === 'todos') return true;
    if (filter === 'compuestos') return item.tipo === 'compuesto';
    if (filter === 'marcas') return item.tipo === 'marca';
    return true;
  });

  // Navegar al detalle
  const handleItemClick = (item: FavoriteItem) => {
    if (item.tipo === 'compuesto') {
      router.push(`/farmateca/web/app/compound/${item.id}`);
    } else {
      router.push(`/farmateca/web/app/brand/${item.id}`);
    }
  };

  // Eliminar favorito directamente
  const handleDeleteFavorite = async (e: React.MouseEvent, item: FavoriteItem) => {
    e.stopPropagation(); // Evitar navegación
    if (!user) return;
    if (!db) return;

    setDeletingId(item.docId);
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favoritos', item.docId));
      console.log('[FavoritesPage] Deleted:', item.docId);
    } catch (error) {
      console.error('[FavoritesPage] Error deleting:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Inicia sesión para ver tus favoritos
          </h3>
          <p className="text-gray-500 mb-4">
            Guarda compuestos y marcas para acceder rápidamente.
          </p>
          <button
            onClick={() => router.push('/farmateca/web/login')}
            className="px-6 py-2 bg-farmateca-primary text-white font-semibold rounded-xl hover:bg-farmateca-primary-dark transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Favoritos</h1>
        <p className="text-gray-600">
          Accede rápidamente a tus medicamentos guardados.
        </p>
      </motion.div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        <button
          onClick={() => setFilter('todos')}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === 'todos'
              ? 'bg-farmateca-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos ({favorites.length})
        </button>
        <button
          onClick={() => setFilter('compuestos')}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === 'compuestos'
              ? 'bg-farmateca-compound text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Compuestos ({compuestosCount})
        </button>
        <button
          onClick={() => setFilter('marcas')}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === 'marcas'
              ? 'bg-farmateca-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Marcas ({marcasCount})
        </button>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Lista vacía */}
      {!isLoading && filteredFavorites.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-farmateca-favorites/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-farmateca-favorites"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'todos'
              ? 'Aún no tienes favoritos'
              : filter === 'compuestos'
              ? 'No hay compuestos favoritos'
              : 'No hay marcas favoritas'}
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Agrega compuestos o marcas a favoritos tocando el corazón en su página de detalle.
          </p>
          <button
            onClick={() => router.push('/farmateca/web/app/search')}
            className="mt-4 px-6 py-2 bg-farmateca-primary text-white font-semibold rounded-xl hover:bg-farmateca-primary-dark transition-colors"
          >
            Buscar medicamentos
          </button>
        </motion.div>
      )}

      {/* Lista de favoritos */}
      {!isLoading && filteredFavorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {filteredFavorites.map((item, index) => (
            <motion.div
              key={item.docId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.03 }}
              className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:border-farmateca-primary hover:shadow-md transition-all flex items-center gap-4"
            >
              {/* Botón principal - navegar */}
              <button
                onClick={() => handleItemClick(item)}
                className="flex-1 flex items-center gap-4 text-left"
              >
                {/* Icono según tipo */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.tipo === 'compuesto'
                      ? 'bg-farmateca-compound/10'
                      : 'bg-farmateca-primary/10'
                  }`}
                >
                  {item.tipo === 'compuesto' ? (
                    <svg
                      className="w-6 h-6 text-farmateca-compound"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-farmateca-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.nombre}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.tipo === 'compuesto' && item.familia
                      ? `Familia: ${item.familia}`
                      : item.tipo === 'marca' && item.laboratorio
                      ? `Laboratorio: ${item.laboratorio}`
                      : item.tipo === 'compuesto'
                      ? 'Compuesto'
                      : 'Marca'}
                  </p>
                </div>

                {/* Flecha */}
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Botón eliminar */}
              <button
                onClick={(e) => handleDeleteFavorite(e, item)}
                disabled={deletingId === item.docId}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors flex-shrink-0 disabled:opacity-50"
                aria-label="Eliminar de favoritos"
              >
                {deletingId === item.docId ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
