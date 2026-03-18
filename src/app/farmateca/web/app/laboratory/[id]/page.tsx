'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BrandSummary } from '@/lib/farmateca/types';
import { DetailSkeleton } from '@/components/farmateca/shared';
import { BrandCard, FavoriteButton } from '@/components/farmateca/clinical';

export default function LaboratoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const laboratoryName = decodeURIComponent(params.id as string);

  const [brands, setBrands] = useState<BrandSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch(
          `/api/farmateca/brands?laboratory=${encodeURIComponent(laboratoryName)}`
        );
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || 'Error al cargar marcas');
        }

        setBrands(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        setIsLoading(false);
      }
    }

    loadBrands();
  }, [laboratoryName]);

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
          Error al cargar el laboratorio
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
          onClick={() => router.push('/farmateca/web/app/search/laboratory')}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Laboratorio</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {laboratoryName}
                </h1>
                <p className="text-white/80 text-sm mt-2">
                  {brands.length} producto{brands.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <FavoriteButton
              itemId={encodeURIComponent(laboratoryName)}
              itemType="laboratorio"
              itemName={laboratoryName}
              size="md"
            />
          </div>
        </div>
      </motion.div>

      {/* Lista de marcas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Productos del laboratorio
        </h2>

        {brands.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No se encontraron productos para este laboratorio
          </div>
        ) : (
          <div className="space-y-3">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.idMA}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.04 }}
              >
                <BrandCard brand={brand} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
