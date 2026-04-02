'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tag, Cross, Settings, Pill, AlertTriangle, Ban, FileText, Bookmark } from 'lucide-react';
import { fetchCompoundById } from '@/lib/farmateca/api/compounds';
import { CompoundWithBrands, BrandSummary } from '@/lib/farmateca/types';
import { DetailSkeleton } from '@/components/farmateca/shared';
import { BrandCard, FavoriteButton } from '@/components/farmateca/clinical';
import { PremiumSection } from '@/components/farmateca/app/PremiumSection';

export default function CompoundDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [compound, setCompound] = useState<CompoundWithBrands | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) return <DetailSkeleton />;

  if (error || !compound) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Compuesto no encontrado</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
        <button onClick={() => router.back()} className="text-farmateca-primary hover:underline">Volver atrás</button>
      </div>
    );
  }

  const commercialBrands = compound.brands ? filterBrandsByType(compound.brands, 'comercial') : [];
  const genericBrands = compound.brands ? filterBrandsByType(compound.brands, 'generico') : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-farmateca-primary transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="flex items-start gap-4 relative">
          <div className="w-14 h-14 bg-farmateca-compound/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-farmateca-compound" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{compound.pa}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{compound.familia}</p>
          </div>
          <div className="absolute top-0 right-0">
            <FavoriteButton itemId={compound.idPA} itemType="compound" itemName={compound.pa} itemMeta={compound.familia} size="md" />
          </div>
        </div>
      </motion.div>

      {/* Secciones */}
      <div className="space-y-3">

        {/* 1. Familia Farmacológica — FREE (card estática) */}
        {compound.familia && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-farmateca-primary" />
              Familia Farmacológica
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{compound.familia}</p>
          </motion.section>
        )}

        {/* 2. Uso Clínico — FREE (card estática) */}
        {compound.uso && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Cross className="w-4 h-4 text-farmateca-primary" />
              Uso Clínico
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{compound.uso}</p>
          </motion.section>
        )}

        {/* 3. Mecanismo de Acción — FREE (accordion expandible) */}
        {compound.mecanismo && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <FreeSectionAccordion
              title="Mecanismo de Acción"
              icon={<Settings className="w-4 h-4 text-farmateca-primary" />}
            >
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{compound.mecanismo}</p>
            </FreeSectionAccordion>
          </motion.section>
        )}

        {/* 4. Posología — PREMIUM */}
        {compound.posologia && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <PremiumSection
              title="Posología"
              icon={<Pill className="w-4 h-4 text-farmateca-primary" />}
              featureName="Posología"
            >
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{compound.posologia}</div>
            </PremiumSection>
          </motion.section>
        )}

        {/* 5. Consideraciones Especiales — PREMIUM */}
        {compound.consideraciones && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <PremiumSection
              title="Consideraciones Especiales"
              icon={<FileText className="w-4 h-4 text-farmateca-primary" />}
              featureName="Consideraciones Especiales"
            >
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{compound.consideraciones}</div>
            </PremiumSection>
          </motion.section>
        )}

        {/* 6. Efectos Adversos — PREMIUM */}
        {compound.efectos && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <PremiumSection
              title="Efectos Adversos"
              icon={<AlertTriangle className="w-4 h-4 text-orange-500" />}
              featureName="Efectos Adversos"
            >
              <p className="text-orange-700 dark:text-orange-300 leading-relaxed">{compound.efectos}</p>
            </PremiumSection>
          </motion.section>
        )}

        {/* 7. Contraindicaciones — PREMIUM */}
        {compound.contraindicaciones && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <PremiumSection
              title="Contraindicaciones"
              icon={<Ban className="w-4 h-4 text-red-500" />}
              featureName="Contraindicaciones"
            >
              <div className="text-red-700 dark:text-red-300 whitespace-pre-line leading-relaxed">{compound.contraindicaciones}</div>
            </PremiumSection>
          </motion.section>
        )}

        {/* 8. Marcas Comerciales — PREMIUM */}
        {commercialBrands.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <PremiumSection
              title={`Marcas Comerciales (${commercialBrands.length})`}
              icon={<Tag className="w-4 h-4 text-farmateca-primary" />}
              featureName="Marcas Comerciales"
            >
              <div className="space-y-2 pt-1">
                {commercialBrands.map((brand) => (
                  <BrandCard key={brand.idMA} brand={brand} />
                ))}
              </div>
            </PremiumSection>
          </motion.section>
        )}

        {/* 9. Genéricos — PREMIUM */}
        {genericBrands.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <PremiumSection
              title={`Genéricos (${genericBrands.length})`}
              icon={<Bookmark className="w-4 h-4 text-green-600" />}
              featureName="Genéricos"
            >
              <div className="space-y-2 pt-1">
                {genericBrands.map((brand) => (
                  <BrandCard key={brand.idMA} brand={brand} />
                ))}
              </div>
            </PremiumSection>
          </motion.section>
        )}

      </div>
    </div>
  );
}

// ─── Accordion para secciones FREE (Mecanismo de Acción) ────
function FreeSectionAccordion({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}
