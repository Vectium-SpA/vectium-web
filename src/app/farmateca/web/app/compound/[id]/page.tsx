'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tag, Cross, Settings, Pill, AlertTriangle, Ban, FileText } from 'lucide-react';
import { fetchCompoundById } from '@/lib/farmateca/api/compounds';
import { CompoundWithBrands, BrandSummary } from '@/lib/farmateca/types';
import { DetailSkeleton } from '@/components/farmateca/shared';
import { BrandCard, FavoriteButton } from '@/components/farmateca/clinical';
import { PremiumGuard } from '@/components/farmateca/app/PremiumGuard';

export default function CompoundDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [compound, setCompound] = useState<CompoundWithBrands | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para accordions colapsables
  const [expandCommercial, setExpandCommercial] = useState(false);
  const [expandGeneric, setExpandGeneric] = useState(false);

  useEffect(() => {
    async function loadCompound() {
      try {
        const data = await fetchCompoundById(id);
        setCompound(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        setIsLoading(false);
      }
    }

    loadCompound();
  }, [id]);

  // Filtrar marcas por tipo
  const filterBrandsByType = (brands: BrandSummary[], tipo: 'comercial' | 'generico'): BrandSummary[] => {
    return brands.filter((brand) => {
      const tipoLower = brand.tipoM?.toLowerCase() || '';
      if (tipo === 'comercial') {
        return tipoLower.includes('comercial') || tipoLower === 'marca comercial';
      } else {
        return tipoLower.includes('genérico') || tipoLower.includes('generico');
      }
    });
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !compound) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Compuesto no encontrado
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="text-farmateca-primary hover:underline"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  const commercialBrands = compound.brands ? filterBrandsByType(compound.brands, 'comercial') : [];
  const genericBrands = compound.brands ? filterBrandsByType(compound.brands, 'generico') : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header con navegación */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-farmateca-primary transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>

        <div className="flex items-start gap-4 relative">
          <div className="w-14 h-14 bg-farmateca-compound/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-7 h-7 text-farmateca-compound"
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
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {compound.pa}
              </h1>
              {compound.acceso === 'P' && (
                <span className="px-2 py-1 text-xs font-medium bg-farmateca-premium/20 text-farmateca-premium-dark rounded">
                  Premium
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{compound.familia}</p>
          </div>
          <div className="absolute top-0 right-0">
            <FavoriteButton
              itemId={compound.idPA}
              itemType="compound"
              itemName={compound.pa}
              itemMeta={compound.familia}
              size="md"
            />
          </div>
        </div>
      </motion.div>

      {/* Contenido - Orden: 1.Familia, 2.Uso, 3.Mecanismo, 4.Posología(P), 5.Efectos(P), 6.Contraindicaciones(P), 7.Consideraciones(P), 8.Marcas */}
      <div className="space-y-6">

        {/* 1. Familia Farmacológica - FREE */}
        {compound.familia && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-farmateca-primary" />
              Familia Farmacológica
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{compound.familia}</p>
          </motion.section>
        )}

        {/* 2. Uso Clínico - FREE */}
        {compound.uso && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Cross className="w-5 h-5 text-farmateca-primary" />
              Uso Clínico
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{compound.uso}</p>
          </motion.section>
        )}

        {/* 3. Mecanismo de Acción - FREE */}
        {compound.mecanismo && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5 text-farmateca-primary" />
              Mecanismo de Acción
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{compound.mecanismo}</p>
          </motion.section>
        )}

        {/* 4. Posología - PREMIUM */}
        {compound.posologia && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PremiumGuard mode="blur" featureName="Posología">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-farmateca-primary" />
                  Posología
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{compound.posologia}</div>
              </div>
            </PremiumGuard>
          </motion.section>
        )}

        {/* 5. Efectos Adversos - PREMIUM */}
        {compound.efectos && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <PremiumGuard mode="blur" featureName="Efectos Adversos">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30 p-6">
                <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  Efectos Adversos
                </h2>
                <p className="text-orange-700 dark:text-orange-300 leading-relaxed">{compound.efectos}</p>
              </div>
            </PremiumGuard>
          </motion.section>
        )}

        {/* 6. Contraindicaciones - PREMIUM */}
        {compound.contraindicaciones && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PremiumGuard mode="blur" featureName="Contraindicaciones">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30 p-6">
                <h2 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                  <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
                  Contraindicaciones
                </h2>
                <div className="text-red-700 dark:text-red-300 whitespace-pre-line">{compound.contraindicaciones}</div>
              </div>
            </PremiumGuard>
          </motion.section>
        )}

        {/* 7. Consideraciones - PREMIUM */}
        {compound.consideraciones && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <PremiumGuard mode="blur" featureName="Consideraciones">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-farmateca-primary" />
                  Consideraciones
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{compound.consideraciones}</div>
              </div>
            </PremiumGuard>
          </motion.section>
        )}

        {/* 8. Marcas Asociadas - FREE - Accordions Colapsables */}
        {compound.brands && compound.brands.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-farmateca-primary" />
              Marcas Disponibles ({compound.brands.length})
            </h2>

            {/* Accordion Comerciales */}
            {commercialBrands.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => setExpandCommercial(!expandCommercial)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-farmateca-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Marcas Comerciales ({commercialBrands.length})
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandCommercial ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandCommercial && (
                  <div className="p-4 space-y-2 border-t border-gray-100 dark:border-gray-700">
                    {commercialBrands.map((brand) => (
                      <BrandCard key={brand.idMA} brand={brand} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Accordion Genéricos */}
            {genericBrands.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => setExpandGeneric(!expandGeneric)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Genéricos ({genericBrands.length})
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandGeneric ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandGeneric && (
                  <div className="p-4 space-y-2 border-t border-gray-100 dark:border-gray-700">
                    {genericBrands.map((brand) => (
                      <BrandCard key={brand.idMA} brand={brand} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
}
