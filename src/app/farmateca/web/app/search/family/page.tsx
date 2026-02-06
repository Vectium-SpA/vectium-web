'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FamilyCardSkeletonList } from '@/components/farmateca/shared';

interface Family {
  familia: string;
  count: number;
}

export default function SearchByFamilyPage() {
  const router = useRouter();
  const [families, setFamilies] = useState<Family[]>([]);
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [accessFilter, setAccessFilter] = useState<'all' | 'F' | 'P'>('all');

  // Cargar familias
  useEffect(() => {
    async function loadFamilies() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (accessFilter !== 'all') {
          params.set('access', accessFilter);
        }

        const response = await fetch(`/api/farmateca/families?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setFamilies(data.families);
          setFilteredFamilies(data.families);
        }
      } catch (error) {
        console.error('Error loading families:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFamilies();
  }, [accessFilter]);

  // Filtrar por búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFamilies(families);
      return;
    }

    const filtered = families.filter(f =>
      f.familia.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFamilies(filtered);
  }, [searchTerm, families]);

  // Handler para seleccionar familia
  const handleSelectFamily = (familia: string) => {
    // Redirigir a búsqueda de compuestos con filtro de familia
    router.push(`/farmateca/web/app/search/compound?family=${encodeURIComponent(familia)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-farmateca-primary to-farmateca-primary-dark text-white p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 h-6 w-20 bg-white/20 rounded animate-pulse" />
            <h1 className="text-3xl font-bold mb-2">Buscar por Familia</h1>
            <p className="text-white/80">
              Explora medicamentos por su familia farmacológica
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Search bar skeleton */}
          <div className="mb-6 h-12 bg-gray-200 rounded-lg animate-pulse" />

          {/* Filter buttons skeleton */}
          <div className="mb-6 flex gap-2">
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* List skeleton */}
          <FamilyCardSkeletonList count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-farmateca-primary to-farmateca-primary-dark text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white"
          >
            <span>←</span>
            <span>Volver</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">Buscar por Familia</h1>
          <p className="text-white/80">
            Explora medicamentos por su familia farmacológica
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar familia farmacológica..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farmateca-primary focus:border-transparent"
          />
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setAccessFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              accessFilter === 'all'
                ? 'bg-farmateca-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setAccessFilter('F')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              accessFilter === 'F'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setAccessFilter('P')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              accessFilter === 'P'
                ? 'bg-farmateca-premium text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Premium
          </button>
        </div>

        {/* Contador */}
        <div className="mb-4 text-gray-600">
          {filteredFamilies.length} familia{filteredFamilies.length !== 1 ? 's' : ''} encontrada{filteredFamilies.length !== 1 ? 's' : ''}
        </div>

        {/* Lista de familias */}
        <div className="space-y-2">
          {filteredFamilies.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No se encontraron familias farmacológicas
            </div>
          ) : (
            filteredFamilies.map((family, index) => (
              <motion.button
                key={family.familia}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectFamily(family.familia)}
                className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:border-farmateca-primary hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {family.familia}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {family.count} compuesto{family.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-farmateca-primary text-xl">→</span>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
