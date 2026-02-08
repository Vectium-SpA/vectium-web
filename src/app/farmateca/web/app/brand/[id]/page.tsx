'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlaskConical, Info } from 'lucide-react';
import { fetchBrandById } from '@/lib/farmateca/api/brands';
import { Brand } from '@/lib/farmateca/types';
import { DetailSkeleton } from '@/components/farmateca/shared';
import { FavoriteButton } from '@/components/farmateca/clinical';
import { PremiumGuard } from '@/components/farmateca/app/PremiumGuard';

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBrand() {
      try {
        const data = await fetchBrandById(id);
        setBrand(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        setIsLoading(false);
      }
    }

    loadBrand();
  }, [id]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !brand) {
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
          Marca no encontrada
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

  const isGeneric = brand.tipoM.toLowerCase().includes('genérico');

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
          <div className="w-14 h-14 bg-farmateca-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-7 h-7 text-farmateca-primary"
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
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {brand.ma}
              </h1>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  isGeneric
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    : 'bg-farmateca-primary/10 text-farmateca-primary-dark'
                }`}
              >
                {isGeneric ? 'Genérico' : 'Comercial'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{brand.labM}</p>
          </div>
          <div className="absolute top-0 right-0">
            <FavoriteButton itemId={brand.idMA} itemType="brand" size="md" />
          </div>
        </div>
      </motion.div>

      {/* Contenido */}
      <div className="space-y-6">

        {/* Botón "Ver Principio Activo" prominente - ARRIBA del contenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Link
            href={`/farmateca/web/app/compound/${brand.idPAM}`}
            className="block w-full bg-farmateca-compound/5 dark:bg-farmateca-compound/10 rounded-xl border border-farmateca-compound/20 dark:border-farmateca-compound/30 p-5 hover:bg-farmateca-compound/10 dark:hover:bg-farmateca-compound/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-farmateca-compound/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-6 h-6 text-farmateca-compound" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Ver Principio Activo</p>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">{brand.paM}</p>
              </div>
              <svg
                className="w-5 h-5 text-farmateca-compound group-hover:translate-x-1 transition-transform"
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
            </div>
          </Link>
        </motion.div>

        {/* Información básica */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Información General
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Principio Activo</p>
              <Link
                href={`/farmateca/web/app/compound/${brand.idPAM}`}
                className="text-farmateca-primary font-medium hover:underline"
              >
                {brand.paM}
              </Link>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Familia Farmacológica</p>
              <p className="text-gray-900 dark:text-white">{brand.familiaM}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Laboratorio</p>
              <p className="text-gray-900 dark:text-white">{brand.labM}</p>
            </div>
            {/* Vía de Administración - PREMIUM */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vía de Administración</p>
              <PremiumGuard mode="blur" featureName="Vía de Administración">
                <p className="text-gray-900 dark:text-white">{brand.viaM}</p>
              </PremiumGuard>
            </div>
          </div>
        </motion.section>

        {/* Presentación */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Presentación
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{brand.presentacionM}</p>
        </motion.section>

        {/* Uso Terapéutico */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Uso Terapéutico
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{brand.usoM}</p>
        </motion.section>

        {/* Contraindicaciones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30 p-6"
        >
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Contraindicaciones
          </h2>
          <div className="text-red-700 dark:text-red-300 whitespace-pre-line">{brand.contraindicacionesM}</div>
        </motion.section>

        {/* Disclaimer ISP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              <p className="font-medium text-gray-600 dark:text-gray-300 mb-1">Aviso importante</p>
              <p>
                La información presentada corresponde a datos registrados ante el Instituto de Salud
                Pública de Chile (ISP). Esta información es de carácter referencial y no reemplaza
                la consulta médica profesional. Consulte siempre a su médico o farmacéutico antes de
                iniciar, modificar o suspender cualquier tratamiento farmacológico.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
