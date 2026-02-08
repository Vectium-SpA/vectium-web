'use client';

import { useState, useEffect } from 'react';

interface FarmatecaStats {
  totalCompounds: number;
  totalBrands: number;
  totalFamilies: number;
  totalLaboratories: number;
}

/**
 * Hook para obtener estadísticas dinámicas de Farmateca.
 * Todos los números se calculan desde farmateca_master.json, NUNCA hardcodeados.
 */
export function useFarmatecaStats() {
  const [stats, setStats] = useState<FarmatecaStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/farmateca/stats');
        const data = await response.json();

        if (data.success) {
          setStats({
            totalCompounds: data.totalCompounds,
            totalBrands: data.totalBrands,
            totalFamilies: data.totalFamilies,
            totalLaboratories: data.totalLaboratories,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}
