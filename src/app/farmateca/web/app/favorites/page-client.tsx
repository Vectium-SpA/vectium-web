'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { useIsPremium } from '@/lib/farmateca/store/auth-store';
import { useFavorites, FavoriteItem } from '@/lib/farmateca/hooks/useFavorites';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';

type TabId = 'compuestos' | 'marcas' | 'familia' | 'laboratorio' | 'recientes';

interface TabConfig {
  id: TabId;
  label: string;
  premium: boolean;
}

const TABS: TabConfig[] = [
  { id: 'compuestos', label: 'Compuestos', premium: false },
  { id: 'marcas', label: 'Marcas', premium: false },
  { id: 'familia', label: 'Por Familia', premium: true },
  { id: 'laboratorio', label: 'Por Lab', premium: true },
  { id: 'recientes', label: 'Recientes', premium: true },
];

// ─── Agrupación por Familia ─────────────────────────────────
interface GroupedFavorites {
  name: string;
  items: FavoriteItem[];
}

function groupByFamily(favorites: FavoriteItem[]): GroupedFavorites[] {
  const map = new Map<string, FavoriteItem[]>();
  favorites.forEach((item) => {
    const key = item.familia || 'Sin familia';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  });
  return Array.from(map.entries())
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function groupByLaboratory(favorites: FavoriteItem[]): GroupedFavorites[] {
  const map = new Map<string, FavoriteItem[]>();
  favorites.forEach((item) => {
    const key = item.laboratorio || 'Sin laboratorio';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  });
  return Array.from(map.entries())
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ─── Iconos SVG ─────────────────────────────────────────────
function CompoundIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );
}

function BrandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

// ─── Componente de Item de Favorito ─────────────────────────
function FavoriteItemRow({
  item,
  onNavigate,
  onDelete,
  isDeleting,
  index,
}: {
  item: FavoriteItem;
  onNavigate: (item: FavoriteItem) => void;
  onDelete: (e: React.MouseEvent, item: FavoriteItem) => void;
  isDeleting: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.03 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-farmateca-primary hover:shadow-md transition-all flex items-center gap-4"
    >
      <button
        onClick={() => onNavigate(item)}
        className="flex-1 flex items-center gap-4 text-left"
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            item.tipo === 'compuesto' ? 'bg-farmateca-compound/10' : 'bg-farmateca-primary/10'
          }`}
        >
          {item.tipo === 'compuesto' ? (
            <CompoundIcon className="w-6 h-6 text-farmateca-compound" />
          ) : (
            <BrandIcon className="w-6 h-6 text-farmateca-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.nombre}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.tipo === 'compuesto' && item.familia
              ? `Familia: ${item.familia}`
              : item.tipo === 'marca' && item.laboratorio
              ? `Lab: ${item.laboratorio}`
              : item.tipo === 'compuesto'
              ? 'Compuesto'
              : 'Marca'}
          </p>
        </div>

        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        onClick={(e) => onDelete(e, item)}
        disabled={isDeleting}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors flex-shrink-0 disabled:opacity-50"
        aria-label="Eliminar de favoritos"
      >
        {isDeleting ? (
          <LoadingSpinner size="sm" />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}

// ─── Componente de Grupo Colapsable ─────────────────────────
function CollapsibleGroup({
  group,
  onNavigate,
  onDelete,
  deletingId,
  defaultOpen = false,
  colorClass = 'bg-farmateca-primary',
}: {
  group: GroupedFavorites;
  onNavigate: (item: FavoriteItem) => void;
  onDelete: (e: React.MouseEvent, item: FavoriteItem) => void;
  deletingId: string | null;
  defaultOpen?: boolean;
  colorClass?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 rounded-full ${colorClass}`} />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {group.items.length} favorito{group.items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
              {group.items.map((item, idx) => (
                <FavoriteItemRow
                  key={item.docId}
                  item={item}
                  onNavigate={onNavigate}
                  onDelete={onDelete}
                  isDeleting={deletingId === item.docId}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pantalla de Bloqueo Premium ────────────────────────────
function PremiumLockedTab({ tabName }: { tabName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-farmateca-primary-dark to-farmateca-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <LockIcon className="w-10 h-10 text-farmateca-premium" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contenido Premium</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        La vista &quot;{tabName}&quot; es exclusiva para usuarios Premium. Accede a
        todas las funcionalidades de Farmateca.
      </p>
      <Link
        href="/farmateca/web/app/paywall"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-farmateca-primary-dark to-farmateca-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
      >
        <StarIcon className="w-5 h-5 text-farmateca-premium" />
        Ver Planes Premium
      </Link>
    </motion.div>
  );
}

// ─── Empty State ────────────────────────────────────────────
function EmptyState({ message, description }: { message: string; description: string }) {
  const router = useRouter();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
      <div className="w-20 h-20 bg-farmateca-favorites/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-farmateca-favorites" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{message}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">{description}</p>
      <button
        onClick={() => router.push('/farmateca/web/app/search')}
        className="mt-4 px-6 py-2 bg-farmateca-primary text-white font-semibold rounded-xl hover:bg-farmateca-primary-dark transition-colors"
      >
        Buscar medicamentos
      </button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ─── PÁGINA PRINCIPAL ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
export default function FavoritesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const isPremium = useIsPremium();
  const { favorites, isLoading, compuestosCount, marcasCount } = useFavorites();
  const [activeTab, setActiveTab] = useState<TabId>('compuestos');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ─── Datos derivados ──────────────────────────────────────
  const compuestos = useMemo(
    () => favorites.filter((f) => f.tipo === 'compuesto'),
    [favorites]
  );
  const marcas = useMemo(
    () => favorites.filter((f) => f.tipo === 'marca'),
    [favorites]
  );
  const familyGroups = useMemo(() => groupByFamily(compuestos), [compuestos]);
  const labGroups = useMemo(() => groupByLaboratory(marcas), [marcas]);
  const recientes = useMemo(
    () =>
      [...favorites].sort(
        (a, b) => b.fechaAgregado.getTime() - a.fechaAgregado.getTime()
      ),
    [favorites]
  );

  // ─── Handlers ─────────────────────────────────────────────
  const handleItemClick = (item: FavoriteItem) => {
    if (item.tipo === 'compuesto') {
      router.push(`/farmateca/web/app/compound/${item.id}`);
    } else {
      router.push(`/farmateca/web/app/brand/${item.id}`);
    }
  };

  const handleDeleteFavorite = async (e: React.MouseEvent, item: FavoriteItem) => {
    e.stopPropagation();
    if (!user || !db) return;

    setDeletingId(item.docId);
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favoritos', item.docId));
    } catch (error) {
      console.error('[FavoritesPage] Error deleting:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTabClick = (tab: TabConfig) => {
    if (tab.premium && !isPremium) {
      router.push('/farmateca/web/app/paywall');
      return;
    }
    setActiveTab(tab.id);
  };

  // ─── Not logged in ────────────────────────────────────────
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <LockIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Inicia sesion para ver tus favoritos
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Guarda compuestos y marcas para acceder rapidamente.
          </p>
          <button
            onClick={() => router.push('/farmateca/web/login')}
            className="px-6 py-2 bg-farmateca-primary text-white font-semibold rounded-xl hover:bg-farmateca-primary-dark transition-colors"
          >
            Iniciar sesion
          </button>
        </div>
      </div>
    );
  }

  // ─── Tab counts ───────────────────────────────────────────
  const tabCounts: Record<TabId, number> = {
    compuestos: compuestosCount,
    marcas: marcasCount,
    familia: familyGroups.length,
    laboratorio: labGroups.length,
    recientes: favorites.length,
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Favoritos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Accede rapidamente a tus medicamentos guardados.
        </p>
      </motion.div>

      {/* ─── Tabs ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-hide"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isLocked = tab.premium && !isPremium;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`
                relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                ${
                  isActive
                    ? 'bg-farmateca-primary text-white shadow-md'
                    : isLocked
                    ? 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {tab.label}
              {!isLocked && (
                <span
                  className={`text-xs ${
                    isActive ? 'text-white/70' : 'text-gray-400'
                  }`}
                >
                  ({tabCounts[tab.id]})
                </span>
              )}
              {isLocked && (
                <LockIcon className="w-3.5 h-3.5 text-farmateca-premium" />
              )}
              {tab.premium && isPremium && (
                <StarIcon className="w-3 h-3 text-farmateca-premium" />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* ─── Loading ─────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* ─── Tab Content ─────────────────────────────────────── */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          {/* ──── Tab: Compuestos ──── */}
          {activeTab === 'compuestos' && (
            <motion.div
              key="compuestos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {compuestos.length === 0 ? (
                <EmptyState
                  message="No hay compuestos favoritos"
                  description="Agrega compuestos a favoritos tocando el corazon en su pagina de detalle."
                />
              ) : (
                <div className="space-y-2">
                  {compuestos.map((item, idx) => (
                    <FavoriteItemRow
                      key={item.docId}
                      item={item}
                      onNavigate={handleItemClick}
                      onDelete={handleDeleteFavorite}
                      isDeleting={deletingId === item.docId}
                      index={idx}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ──── Tab: Marcas ──── */}
          {activeTab === 'marcas' && (
            <motion.div
              key="marcas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {marcas.length === 0 ? (
                <EmptyState
                  message="No hay marcas favoritas"
                  description="Agrega marcas a favoritos tocando el corazon en su pagina de detalle."
                />
              ) : (
                <div className="space-y-2">
                  {marcas.map((item, idx) => (
                    <FavoriteItemRow
                      key={item.docId}
                      item={item}
                      onNavigate={handleItemClick}
                      onDelete={handleDeleteFavorite}
                      isDeleting={deletingId === item.docId}
                      index={idx}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ──── Tab: Por Familia (Premium) ──── */}
          {activeTab === 'familia' && (
            <motion.div
              key="familia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {!isPremium ? (
                <PremiumLockedTab tabName="Por Familia" />
              ) : familyGroups.length === 0 ? (
                <EmptyState
                  message="No hay compuestos favoritos"
                  description="Agrega compuestos a favoritos para verlos agrupados por familia farmacologica."
                />
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {familyGroups.length} familia{familyGroups.length !== 1 ? 's' : ''} con
                    favoritos
                  </p>
                  {familyGroups.map((group, idx) => (
                    <CollapsibleGroup
                      key={group.name}
                      group={group}
                      onNavigate={handleItemClick}
                      onDelete={handleDeleteFavorite}
                      deletingId={deletingId}
                      defaultOpen={idx === 0}
                      colorClass="bg-farmateca-compound"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ──── Tab: Por Laboratorio (Premium) ──── */}
          {activeTab === 'laboratorio' && (
            <motion.div
              key="laboratorio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {!isPremium ? (
                <PremiumLockedTab tabName="Por Laboratorio" />
              ) : labGroups.length === 0 ? (
                <EmptyState
                  message="No hay marcas favoritas"
                  description="Agrega marcas a favoritos para verlas agrupadas por laboratorio."
                />
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-2">
                    {labGroups.length} laboratorio{labGroups.length !== 1 ? 's' : ''} con favoritos
                  </p>
                  {labGroups.map((group, idx) => (
                    <CollapsibleGroup
                      key={group.name}
                      group={group}
                      onNavigate={handleItemClick}
                      onDelete={handleDeleteFavorite}
                      deletingId={deletingId}
                      defaultOpen={idx === 0}
                      colorClass="bg-farmateca-primary"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ──── Tab: Recientes (Premium) ──── */}
          {activeTab === 'recientes' && (
            <motion.div
              key="recientes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {!isPremium ? (
                <PremiumLockedTab tabName="Recientes" />
              ) : recientes.length === 0 ? (
                <EmptyState
                  message="No hay favoritos recientes"
                  description="Agrega compuestos o marcas a favoritos para verlos ordenados por fecha."
                />
              ) : (
                <div className="space-y-2">
                  {recientes.map((item, idx) => (
                    <div key={item.docId}>
                      {/* Separador de fecha si cambió el día */}
                      {idx === 0 ||
                      recientes[idx - 1].fechaAgregado.toDateString() !==
                        item.fechaAgregado.toDateString() ? (
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mt-4 mb-2 first:mt-0">
                          {formatRelativeDate(item.fechaAgregado)}
                        </p>
                      ) : null}
                      <FavoriteItemRow
                        item={item}
                        onNavigate={handleItemClick}
                        onDelete={handleDeleteFavorite}
                        isDeleting={deletingId === item.docId}
                        index={idx}
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── Helper: Formato de fecha relativa ──────────────────────
function formatRelativeDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((today.getTime() - dateDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} dias`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}
