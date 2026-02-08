'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import { SearchBar, BrandCard, UpcomingCard, UpcomingSeparator } from '@/components/farmateca/clinical';
import { PremiumGuard } from '@/components/farmateca/app/PremiumGuard';
import { fetchBrands } from '@/lib/farmateca/api/brands';
import { BrandSummary } from '@/lib/farmateca/types';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import { loadFarmatecaDataClient, FarmatecaBrand } from '@/lib/farmateca/api/data';
import {
  getLaboratories,
  filterByType,
  filterByLaboratory,
  type GroupedItem,
} from '@/lib/farmateca/utils/search';
import { sortBrandResults } from '@/lib/farmateca/utils/search-sort';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function BrandSearchPage() {
  const router = useRouter();
  const [searchQueryCommercial, setSearchQueryCommercial] = useState('');
  const [searchQueryGeneric, setSearchQueryGeneric] = useState('');
  const [commercialBrands, setCommercialBrands] = useState<BrandSummary[]>([]);
  const [genericBrands, setGenericBrands] = useState<BrandSummary[]>([]);
  const [isLoadingCommercial, setIsLoadingCommercial] = useState(false);
  const [isLoadingGeneric, setIsLoadingGeneric] = useState(false);
  const [hasSearchedCommercial, setHasSearchedCommercial] = useState(false);
  const [hasSearchedGeneric, setHasSearchedGeneric] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Estado para filtro por laboratorio (Premium)
  const [laboratories, setLaboratories] = useState<GroupedItem[]>([]);
  const [selectedLab, setSelectedLab] = useState<string>('');
  const [allBrandsData, setAllBrandsData] = useState<FarmatecaBrand[]>([]);
  const [isLoadingLabs, setIsLoadingLabs] = useState(false);

  // Contadores dinámicos de tipo (calculados desde JSON)
  const [typeCounts, setTypeCounts] = useState({ commercial: 0, generic: 0 });

  // Cargar laboratorios y contadores desde JSON local al montar
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingLabs(true);
        const data = await loadFarmatecaDataClient();
        const labsList = getLaboratories(data.marcas);
        setLaboratories(labsList);
        setAllBrandsData(data.marcas);

        // Calcular contadores dinámicos de tipo
        const commercial = filterByType(data.marcas, 'comercial').length;
        const generic = filterByType(data.marcas, 'genérico').length;
        setTypeCounts({ commercial, generic });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingLabs(false);
      }
    }

    loadData();
  }, []);

  // Búsqueda comercial con debounce
  useEffect(() => {
    if (selectedIndex !== 0) return;

    if (!searchQueryCommercial.trim()) {
      setCommercialBrands([]);
      setHasSearchedCommercial(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoadingCommercial(true);
      try {
        const results = await fetchBrands(searchQueryCommercial);
        const filtered = filterByType(results, 'comercial');
        setCommercialBrands(filtered);
        setHasSearchedCommercial(true);
      } catch (error) {
        console.error('Error searching commercial brands:', error);
      } finally {
        setIsLoadingCommercial(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQueryCommercial, selectedIndex]);

  // Búsqueda genéricos con debounce
  useEffect(() => {
    if (selectedIndex !== 1) return;

    if (!searchQueryGeneric.trim()) {
      setGenericBrands([]);
      setHasSearchedGeneric(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoadingGeneric(true);
      try {
        const results = await fetchBrands(searchQueryGeneric);
        const filtered = filterByType(results, 'genérico');
        setGenericBrands(filtered);
        setHasSearchedGeneric(true);
      } catch (error) {
        console.error('Error searching generic brands:', error);
      } finally {
        setIsLoadingGeneric(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQueryGeneric, selectedIndex]);

  const handleSearchCommercial = (value: string) => {
    setSearchQueryCommercial(value);
  };

  const handleSearchGeneric = (value: string) => {
    setSearchQueryGeneric(value);
  };

  const handleLabChange = (lab: string) => {
    setSelectedLab(lab);
  };

  // Filtrar marcas por laboratorio seleccionado
  const filteredLabBrands = selectedLab
    ? filterByLaboratory(allBrandsData, selectedLab)
    : [];

  // Aplicar algoritmo de ordenamiento 4 niveles
  const sortedCommercial = sortBrandResults(commercialBrands, searchQueryCommercial);
  const sortedGeneric = sortBrandResults(genericBrands, searchQueryGeneric);

  const hasCommercialResults = sortedCommercial.available.length > 0 || sortedCommercial.upcoming.length > 0;
  const hasGenericResults = sortedGeneric.available.length > 0 || sortedGeneric.upcoming.length > 0;

  const noResultsCommercial = hasSearchedCommercial && !hasCommercialResults && !isLoadingCommercial;
  const noResultsGeneric = hasSearchedGeneric && !hasGenericResults && !isLoadingGeneric;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Marcas</h1>
        <p className="text-gray-600">
          Encuentra información sobre marcas comerciales, genéricos y laboratorios.
        </p>
      </motion.div>

      {/* Tabs de navegación con contadores dinámicos */}
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList className="flex space-x-1 bg-gray-100 p-1 mb-8 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-farmateca-primary ring-white ring-opacity-60',
                selected
                  ? 'bg-white text-farmateca-primary shadow'
                  : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
              )
            }
          >
            COMERCIAL{typeCounts.commercial > 0 ? ` (${typeCounts.commercial.toLocaleString()})` : ''}
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-farmateca-primary ring-white ring-opacity-60',
                selected
                  ? 'bg-white text-farmateca-primary shadow'
                  : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
              )
            }
          >
            {`GEN\u00C9RICO`}{typeCounts.generic > 0 ? ` (${typeCounts.generic.toLocaleString()})` : ''}
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-farmateca-primary ring-white ring-opacity-60',
                selected
                  ? 'bg-white text-farmateca-primary shadow'
                  : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <span>LABORATORIO</span>
              <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </Tab>
        </TabList>

        <TabPanels>
          {/* Panel 1: Marcas Comerciales */}
          <TabPanel>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <SearchBar onSearch={handleSearchCommercial} placeholder="Buscar marca comercial..." isLoading={isLoadingCommercial} />
            </motion.div>

            {!hasSearchedCommercial && !searchQueryCommercial && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-farmateca-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Buscar marcas comerciales</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Escribe el nombre de una marca comercial.</p>
              </motion.div>
            )}

            {isLoadingCommercial && searchQueryCommercial && (
              <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
            )}

            {noResultsCommercial && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay marcas comerciales para &quot;{searchQueryCommercial}&quot;.</p>
              </div>
            )}

            {!isLoadingCommercial && hasSearchedCommercial && hasCommercialResults && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Marcas Comerciales</h2>
                  <span className="text-sm text-gray-500">({commercialBrands.length})</span>
                </div>
                {sortedCommercial.available.slice(0, 50).map((brand) => (
                  <BrandCard key={brand.idMA} brand={brand} />
                ))}
                {sortedCommercial.available.length > 50 && (
                  <p className="text-center text-sm text-gray-500 py-2">
                    Mostrando 50 de {sortedCommercial.available.length} resultados. Refina tu búsqueda.
                  </p>
                )}
                {sortedCommercial.hasUpcoming && <UpcomingSeparator />}
                {sortedCommercial.upcoming.map((brand) => (
                  <UpcomingCard key={brand.idMA} name={brand.ma} subtitle={brand.labM} type="brand" />
                ))}
              </div>
            )}
          </TabPanel>

          {/* Panel 2: Genéricos */}
          <TabPanel>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <SearchBar onSearch={handleSearchGeneric} placeholder="Buscar genérico..." isLoading={isLoadingGeneric} />
            </motion.div>

            {!hasSearchedGeneric && !searchQueryGeneric && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Buscar genéricos</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Encuentra alternativas genéricas.</p>
              </div>
            )}

            {isLoadingGeneric && searchQueryGeneric && (
              <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
            )}

            {noResultsGeneric && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay genéricos para &quot;{searchQueryGeneric}&quot;.</p>
              </div>
            )}

            {!isLoadingGeneric && hasSearchedGeneric && hasGenericResults && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Genéricos</h2>
                  <span className="text-sm text-gray-500">({genericBrands.length})</span>
                </div>
                {sortedGeneric.available.slice(0, 50).map((brand) => (
                  <BrandCard key={brand.idMA} brand={brand} />
                ))}
                {sortedGeneric.available.length > 50 && (
                  <p className="text-center text-sm text-gray-500 py-2">
                    Mostrando 50 de {sortedGeneric.available.length} resultados. Refina tu búsqueda.
                  </p>
                )}
                {sortedGeneric.hasUpcoming && <UpcomingSeparator />}
                {sortedGeneric.upcoming.map((brand) => (
                  <UpcomingCard key={brand.idMA} name={brand.ma} subtitle={brand.labM} type="brand" />
                ))}
              </div>
            )}
          </TabPanel>

          {/* Panel 3: Por Laboratorio (Premium) */}
          <TabPanel>
            <PremiumGuard mode="blur" featureName="Filtros por laboratorio">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar laboratorio
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-farmateca-primary focus:border-transparent"
                    value={selectedLab}
                    onChange={(e) => handleLabChange(e.target.value)}
                    disabled={isLoadingLabs}
                  >
                    <option value="">
                      Selecciona un laboratorio ({laboratories.length} disponibles)...
                    </option>
                    {laboratories.map((lab) => (
                      <option key={lab.nombre} value={lab.nombre}>
                        {lab.nombre} ({lab.cantidad} marca{lab.cantidad !== 1 ? 's' : ''})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedLab && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">{selectedLab}</h2>
                      <span className="text-sm text-gray-500">
                        ({filteredLabBrands.length} marca{filteredLabBrands.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                    {filteredLabBrands.map((brand) => (
                      <button
                        key={brand.ID_MA}
                        onClick={() => router.push(`/farmateca/web/app/brand/${brand.ID_MA}`)}
                        className="w-full text-left bg-white rounded-xl p-4 border border-gray-200 hover:border-farmateca-primary hover:shadow-md transition-all cursor-pointer"
                      >
                        <h3 className="font-semibold text-gray-900">{brand.MA}</h3>
                        <p className="text-sm text-gray-600">Principio activo: {brand.PA_M}</p>
                        <p className="text-sm text-gray-500 mt-1">{brand.Presentacion_M}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </PremiumGuard>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
