'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import {
  type Farmacia,
  type TipoFarmacia,
  loadFarmacias,
  regionesDe,
  tipoEnum,
  tieneUbicacion,
  mapsUrl,
  TIPO_COLOR,
  TIPO_LABEL,
  TIPO_LABEL_FILTRO,
  TIPOS_ORDEN,
} from '@/lib/farmateca/farmacias';

// El mapa usa Leaflet (window) → solo en cliente, sin SSR.
const FarmaciasMap = dynamic(
  () => import('@/components/farmateca/app/FarmaciasMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <LoadingSpinner size="lg" />
      </div>
    ),
  }
);

type Vista = 'lista' | 'mapa';

export default function FarmaciasPage() {
  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [regionSel, setRegionSel] = useState<string>('');
  const [tipoSel, setTipoSel] = useState<TipoFarmacia | null>(null);
  const [vista, setVista] = useState<Vista>('lista');

  useEffect(() => {
    loadFarmacias()
      .then(setFarmacias)
      .catch(() => setError('No se pudo cargar el listado de farmacias.'))
      .finally(() => setLoading(false));
  }, []);

  const regiones = useMemo(() => regionesDe(farmacias), [farmacias]);

  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return farmacias.filter((f) => {
      const matchQ =
        !q ||
        f.nombre.toLowerCase().includes(q) ||
        f.comuna.toLowerCase().includes(q) ||
        f.direccion.toLowerCase().includes(q);
      const matchR = !regionSel || f.region === regionSel;
      const matchT = !tipoSel || tipoEnum(f.tipo) === tipoSel;
      return matchQ && matchR && matchT;
    });
  }, [farmacias, query, regionSel, tipoSel]);

  const hayFiltros = query || regionSel || tipoSel;
  const clearFiltros = () => {
    setQuery('');
    setRegionSel('');
    setTipoSel(null);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-farmateca-primary-dark via-farmateca-primary to-farmateca-primary-light dark:from-[#004144] dark:via-[#006064] dark:to-[#00838f] rounded-3xl p-8 text-white mb-6 shadow-xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Farmacias de Chile</h1>
        <p className="text-white/90">
          {farmacias.length} farmacias geocodificadas en 16 regiones. Busca,
          filtra y ábrelas en tu mapa.
        </p>
      </motion.div>

      {/* Controles */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-farmateca-card mb-6 space-y-4">
        {/* Búsqueda */}
        <div className="relative">
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, comuna o dirección..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-farmateca-primary focus:border-transparent outline-none"
          />
        </div>

        {/* Región + tipos */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <select
            value={regionSel}
            onChange={(e) => setRegionSel(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-farmateca-primary outline-none"
          >
            <option value="">Todas las regiones</option>
            {regiones.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            {TIPOS_ORDEN.map((t) => {
              const active = tipoSel === t;
              return (
                <button
                  key={t}
                  onClick={() => setTipoSel(active ? null : t)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors"
                  style={
                    active
                      ? { backgroundColor: TIPO_COLOR[t], borderColor: TIPO_COLOR[t], color: '#fff' }
                      : { borderColor: TIPO_COLOR[t], color: TIPO_COLOR[t] }
                  }
                >
                  {TIPO_LABEL_FILTRO[t]}
                </button>
              );
            })}
          </div>

          {hayFiltros && (
            <button
              onClick={clearFiltros}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-farmateca-primary underline sm:ml-auto"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Tabs Lista / Mapa + contador */}
        <div className="flex items-center justify-between pt-1">
          <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-900 p-1">
            <button
              onClick={() => setVista('lista')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                vista === 'lista'
                  ? 'bg-white dark:bg-gray-700 text-farmateca-primary shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setVista('mapa')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                vista === 'mapa'
                  ? 'bg-white dark:bg-gray-700 text-farmateca-primary shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Mapa
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Contenido */}
      {vista === 'mapa' ? (
        <div className="h-[600px] rounded-2xl overflow-hidden shadow-farmateca-card border border-gray-200 dark:border-gray-700">
          <FarmaciasMap farmacias={filtradas} />
        </div>
      ) : filtradas.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          No se encontraron farmacias con esos filtros.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtradas.map((f, i) => {
            const tipo = tipoEnum(f.tipo);
            return (
              <div
                key={`${f.nombre}-${f.direccion}-${i}`}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-farmateca-card hover:shadow-farmateca-card-hover transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">
                    {f.nombre}
                  </h3>
                  <span
                    className="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium text-white"
                    style={{ backgroundColor: TIPO_COLOR[tipo] }}
                  >
                    {TIPO_LABEL[tipo]}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{f.direccion}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {f.comuna}, {f.region}
                </p>
                <a
                  href={mapsUrl(f)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-farmateca-primary/10 text-farmateca-primary font-semibold text-sm hover:bg-farmateca-primary hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tieneUbicacion(f) ? 'Abrir en Maps' : 'Buscar en Maps'}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
