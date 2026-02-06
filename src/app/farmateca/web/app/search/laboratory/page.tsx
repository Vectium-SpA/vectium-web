'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FamilyCardSkeletonList } from '@/components/farmateca/shared';

interface Laboratory {
  laboratorio: string;
  count: number;
}

export default function SearchByLaboratoryPage() {
  const router = useRouter();
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [filteredLaboratories, setFilteredLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar laboratorios
  useEffect(() => {
    async function loadLaboratories() {
      try {
        setLoading(true);
        const response = await fetch('/api/farmateca/laboratories');
        const data = await response.json();

        if (data.success) {
          setLaboratories(data.laboratories);
          setFilteredLaboratories(data.laboratories);
        }
      } catch (error) {
        console.error('Error loading laboratories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLaboratories();
  }, []);

  // Filtrar por búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLaboratories(laboratories);
      return;
    }

    const filtered = laboratories.filter(lab =>
      lab.laboratorio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaboratories(filtered);
  }, [searchTerm, laboratories]);

  // Handler para seleccionar laboratorio
  const handleSelectLaboratory = (laboratorio: string) => {
    // Redirigir a búsqueda de compuestos con filtro de laboratorio
    router.push(`/farmateca/web/app/search/compound?laboratory=${encodeURIComponent(laboratorio)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-farmateca-primary to-farmateca-primary-dark text-white p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 h-6 w-20 bg-white/20 rounded animate-pulse" />
            <h1 className="text-3xl font-bold mb-2">Buscar por Laboratorio</h1>
            <p className="text-white/80">
              Encuentra medicamentos por fabricante
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Search bar skeleton */}
          <div className="mb-6 h-12 bg-gray-200 rounded-lg animate-pulse" />

          {/* Counter skeleton */}
          <div className="mb-4 h-5 w-48 bg-gray-200 rounded animate-pulse" />

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
          <h1 className="text-3xl font-bold mb-2">Buscar por Laboratorio</h1>
          <p className="text-white/80">
            Encuentra medicamentos por fabricante
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar laboratorio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farmateca-primary focus:border-transparent"
          />
        </div>

        {/* Contador */}
        <div className="mb-4 text-gray-600">
          {filteredLaboratories.length} laboratorio{filteredLaboratories.length !== 1 ? 's' : ''} encontrado{filteredLaboratories.length !== 1 ? 's' : ''}
        </div>

        {/* Lista de laboratorios */}
        <div className="space-y-2">
          {filteredLaboratories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No se encontraron laboratorios
            </div>
          ) : (
            filteredLaboratories.map((lab, index) => (
              <motion.button
                key={lab.laboratorio}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectLaboratory(lab.laboratorio)}
                className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:border-farmateca-primary hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {lab.laboratorio}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {lab.count} producto{lab.count !== 1 ? 's' : ''}
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
