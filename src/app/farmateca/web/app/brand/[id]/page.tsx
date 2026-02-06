'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchBrandById } from '@/lib/farmateca/api/brands';
import { Brand } from '@/lib/farmateca/types';
import { DetailSkeleton } from '@/components/farmateca/shared';
import { FavoriteButton } from '@/components/farmateca/clinical';

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
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Marca no encontrada
        </h2>
        <p className="text-gray-500 mb-4">{error}</p>
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
          className="flex items-center gap-2 text-gray-600 hover:text-farmateca-primary transition-colors mb-4"
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {brand.ma}
              </h1>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  isGeneric
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-farmateca-primary/10 text-farmateca-primary-dark'
                }`}
              >
                {isGeneric ? 'Genérico' : 'Comercial'}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                {brand.viaM}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{brand.labM}</p>
          </div>
          <div className="absolute top-0 right-0">
            <FavoriteButton itemId={brand.idMA} itemType="brand" size="md" />
          </div>
        </div>
      </motion.div>

      {/* Contenido */}
      <div className="space-y-6">
        {/* Información básica */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Información General
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Principio Activo</p>
              <Link
                href={`/farmateca/web/app/compound/${brand.idPAM}`}
                className="text-farmateca-primary font-medium hover:underline"
              >
                {brand.paM}
              </Link>
            </div>
            <div>
              <p className="text-sm text-gray-500">Familia Farmacológica</p>
              <p className="text-gray-900">{brand.familiaM}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Laboratorio</p>
              <p className="text-gray-900">{brand.labM}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vía de Administración</p>
              <p className="text-gray-900">{brand.viaM}</p>
            </div>
          </div>
        </motion.section>

        {/* Presentación */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Presentación
          </h2>
          <p className="text-gray-700">{brand.presentacionM}</p>
        </motion.section>

        {/* Uso Terapéutico */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Uso Terapéutico
          </h2>
          <p className="text-gray-700 leading-relaxed">{brand.usoM}</p>
        </motion.section>

        {/* Contraindicaciones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-red-50 rounded-xl border border-red-100 p-6"
        >
          <h2 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Contraindicaciones
          </h2>
          <div className="text-red-700 whitespace-pre-line">{brand.contraindicacionesM}</div>
        </motion.section>

        {/* Link al compuesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-farmateca-compound/5 rounded-xl border border-farmateca-compound/20 p-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-farmateca-compound/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-farmateca-compound"
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
              <div>
                <p className="text-sm text-gray-500">Ver información completa del compuesto</p>
                <p className="font-medium text-gray-900">{brand.paM}</p>
              </div>
            </div>
            <Link
              href={`/farmateca/web/app/compound/${brand.idPAM}`}
              className="flex items-center gap-2 px-4 py-2 bg-farmateca-compound text-white rounded-lg hover:bg-farmateca-compound/90 transition-colors"
            >
              Ver compuesto
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
