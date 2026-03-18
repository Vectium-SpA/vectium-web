'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CompoundSummary } from '@/lib/farmateca/types';
import { DetailSkeleton } from '@/components/farmateca/shared';
import { CompoundCard, FavoriteButton } from '@/components/farmateca/clinical';

export default function FamilyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const familyName = decodeURIComponent(params.id as string);

  const [compounds, setCompounds] = useState<CompoundSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCompounds() {
      try {
        const res = await fetch(
          `/api/farmateca/compounds?family=${encodeURIComponent(familyName)}`
        );
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || 'Error al cargar compuestos');
        }

        setCompounds(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        setIsLoading(false);
      }
    }

    loadCompounds();
  }, [familyName]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error al cargar la familia
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
        <button onClick={() => router.back()} className="text-farmateca-primary hover:underline">
          Volver atrás
        </button>
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
        <button
          onClick={() => router.push('/farmateca/web/app/search/family')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-farmateca-primary transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        {/* Header card con gradiente teal */}
        <div className="bg-gradient-to-r from-farmateca-primary to-farmateca-primary-medium rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full" />
            <div className="absolute -bottom-8 -left-4 w-48 h-48 bg-white rounded-full" />
          </div>
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Familia Farmacológica</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {familyName}
                </h1>
                <p className="text-white/80 text-sm mt-2">
                  {compounds.length} compuesto{compounds.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <FavoriteButton
              itemId={encodeURIComponent(familyName)}
              itemType="familia"
              itemName={familyName}
              size="md"
            />
          </div>
        </div>
      </motion.div>

      {/* Lista de compuestos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Compuestos
        </h2>

        {compounds.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No se encontraron compuestos en esta familia
          </div>
        ) : (
          <div className="space-y-3">
            {compounds.map((compound, index) => (
              <motion.div
                key={compound.idPA}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.04 }}
              >
                <CompoundCard compound={compound} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
