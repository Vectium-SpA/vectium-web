'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import { SearchBar, CompoundCard, UpcomingCard, UpcomingSeparator } from '@/components/farmateca/clinical';
import { PremiumGuard } from '@/components/farmateca/app/PremiumGuard';
import { fetchCompounds } from '@/lib/farmateca/api/compounds';
import { CompoundSummary } from '@/lib/farmateca/types';
import { LoadingSpinner, CompoundCardSkeletonList } from '@/components/farmateca/shared';
import { loadFarmatecaDataClient, FarmatecaCompound } from '@/lib/farmateca/api/data';
import { getFamilies, filterByFamily, type GroupedItem } from '@/lib/farmateca/utils/search';
import { sortCompoundResults } from '@/lib/farmateca/utils/search-sort';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CompoundSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [allCompounds, setAllCompounds] = useState<CompoundSummary[]>([]);
  const [filteredCompounds, setFilteredCompounds] = useState<CompoundSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Estado para filtros avanzados
  const [showFilters, setShowFilters] = useState(false);
  const [accessFilter, setAccessFilter] = useState<'all' | 'F' | 'P'>('all');
  const [familyFilter, setFamilyFilter] = useState<string>('');
  const [laboratoryFilter, setLaboratoryFilter] = useState<string>('');

  // Extraer familias únicas
  const [availableFamilies, setAvailableFamilies] = useState<string[]>([]);

  // Estado para filtro por familia (Premium tab)
  const [families, setFamilies] = useState<GroupedItem[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [familyCompounds, setFamilyCompounds] = useState<FarmatecaCompound[]>([]);
  const [isLoadingFamilies, setIsLoadingFamilies] = useState(false);

  // Cargar familias desde JSON local al montar (para tab Premium)
  useEffect(() => {
    async function loadFamilies() {
      try {
        setIsLoadingFamilies(true);
        const data = await loadFarmatecaDataClient();
        const familiesList = getFamilies(data.compuestos);
        setFamilies(familiesList);
        setFamilyCompounds(data.compuestos);
      } catch (error) {
        console.error('Error loading families:', error);
      } finally {
        setIsLoadingFamilies(false);
      }
    }

    loadFamilies();
  }, []);

  // Cargar filtros desde URL si existen
  useEffect(() => {
    const familyParam = searchParams.get('family');
    const laboratoryParam = searchParams.get('laboratory');

    if (familyParam) {
      setFamilyFilter(familyParam);
      setShowFilters(true);
    }
    if (laboratoryParam) {
      setLaboratoryFilter(laboratoryParam);
      setShowFilters(true);
    }
  }, [searchParams]);

  // Búsqueda tab "TODOS" con debounce
  useEffect(() => {
    if (selectedIndex !== 0) return;

    if (laboratoryFilter && !searchQuery.trim()) {
      const searchByLab = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/farmateca/compounds?laboratory=${encodeURIComponent(laboratoryFilter)}`);
          const data = await response.json();

          if (data.success) {
            setAllCompounds(data.data);
            const uniqueFamilies = Array.from(new Set(data.data.map((c: CompoundSummary) => c.familia).filter(Boolean))) as string[];
            setAvailableFamilies(uniqueFamilies.sort());
            setHasSearched(true);
          }
        } catch (error) {
          console.error('Error searching by laboratory:', error);
        } finally {
          setIsLoading(false);
        }
      };

      searchByLab();
      return;
    }

    if (!searchQuery.trim()) {
      setAllCompounds([]);
      setFilteredCompounds([]);
      setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchCompounds(searchQuery);
        setAllCompounds(results);
        const uniqueFamilies = Array.from(new Set(results.map(c => c.familia).filter(Boolean))).sort();
        setAvailableFamilies(uniqueFamilies);
        setHasSearched(true);
      } catch (error) {
        console.error('Error searching compounds:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedIndex, laboratoryFilter]);

  // Aplicar filtros cuando cambian
  useEffect(() => {
    if (!hasSearched) return;

    let filtered = [...allCompounds];

    if (accessFilter !== 'all') {
      filtered = filtered.filter(c => c.acceso === accessFilter);
    }

    if (familyFilter) {
      filtered = filtered.filter(c => c.familia === familyFilter);
    }

    setFilteredCompounds(filtered);
  }, [allCompounds, accessFilter, familyFilter, hasSearched]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFamilyChange = (familia: string) => {
    setSelectedFamily(familia);
  };

  const handleClearFilters = () => {
    setAccessFilter('all');
    setFamilyFilter('');
    setLaboratoryFilter('');
    router.push('/farmateca/web/app/search/compound');
  };

  const handleRemoveFilter = (filterType: 'family' | 'laboratory') => {
    if (filterType === 'family') {
      setFamilyFilter('');
      const params = new URLSearchParams(searchParams.toString());
      params.delete('family');
      const newUrl = params.toString() ? `/farmateca/web/app/search/compound?${params.toString()}` : '/farmateca/web/app/search/compound';
      router.push(newUrl);
    } else if (filterType === 'laboratory') {
      setLaboratoryFilter('');
      const params = new URLSearchParams(searchParams.toString());
      params.delete('laboratory');
      const newUrl = params.toString() ? `/farmateca/web/app/search/compound?${params.toString()}` : '/farmateca/web/app/search/compound';
      router.push(newUrl);
    }
  };

  const activeFiltersCount =
    (accessFilter !== 'all' ? 1 : 0) +
    (familyFilter ? 1 : 0) +
    (laboratoryFilter ? 1 : 0);

  // Filtrar compuestos por familia seleccionada (tab Premium)
  const filteredFamilyCompounds = selectedFamily
    ? filterByFamily(familyCompounds, selectedFamily)
    : [];

  const displayCompounds = hasSearched ? filteredCompounds : [];

  // Aplicar algoritmo de ordenamiento 4 niveles
  const sortedResults = sortCompoundResults(displayCompounds, searchQuery);
  const hasResults = sortedResults.available.length > 0 || sortedResults.upcoming.length > 0;
  const noResults = hasSearched && !hasResults && !isLoading;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Compuestos</h1>
        <p className="text-gray-600">
          Encuentra información detallada sobre principios activos y familias terapéuticas.
        </p>
      </motion.div>

      {/* Active URL Filters Chips */}
      {(familyFilter || laboratoryFilter) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {familyFilter && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-farmateca-compound/10 text-farmateca-compound rounded-full text-sm">
              <span className="font-medium">Familia:</span>
              <span>{familyFilter}</span>
              <button
                onClick={() => handleRemoveFilter('family')}
                className="ml-1 hover:bg-farmateca-compound/20 rounded-full p-0.5 transition-colors"
                aria-label="Remover filtro de familia"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {laboratoryFilter && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-farmateca-primary/10 text-farmateca-primary rounded-full text-sm">
              <span className="font-medium">Laboratorio:</span>
              <span>{laboratoryFilter}</span>
              <button
                onClick={() => handleRemoveFilter('laboratory')}
                className="ml-1 hover:bg-farmateca-primary/20 rounded-full p-0.5 transition-colors"
                aria-label="Remover filtro de laboratorio"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Tabs de navegación */}
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
            TODOS LOS COMPUESTOS
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
              <span>POR FAMILIA</span>
              <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </Tab>
        </TabList>

        <TabPanels>
          {/* Panel 1: Todos los compuestos */}
          <TabPanel>
            {/* Barra de búsqueda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <SearchBar
                onSearch={handleSearch}
                placeholder="Buscar principio activo..."
                isLoading={isLoading}
              />
            </motion.div>

            {/* Estado inicial */}
            {!hasSearched && !searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-farmateca-compound/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-farmateca-compound" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comienza a buscar</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Escribe el nombre de un principio activo para encontrar información detallada.
                </p>
                <div className="mt-8">
                  <p className="text-sm text-gray-400 mb-3">Búsquedas frecuentes:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Omeprazol'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSearch(suggestion)}
                        className="px-3 py-1.5 bg-farmateca-compound/10 text-farmateca-compound rounded-full text-sm hover:bg-farmateca-compound/20 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Loading */}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CompoundCardSkeletonList count={10} />
              </motion.div>
            )}

            {/* Sin resultados */}
            {noResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-500">No hay coincidencias para &quot;{searchQuery}&quot;. Intenta con otro término.</p>
              </motion.div>
            )}

            {/* Resultados con ordenamiento 4 niveles */}
            {!isLoading && hasSearched && hasResults && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Resultados</h2>
                  <span className="text-sm text-gray-500">
                    (Mostrando {displayCompounds.length} de {allCompounds.length} compuestos)
                  </span>
                </div>

                {/* Nivel 1+2: Disponibles */}
                {sortedResults.available.map((compound) => (
                  <CompoundCard key={compound.idPA} compound={compound} />
                ))}

                {/* Nivel 3: Separador */}
                {sortedResults.hasUpcoming && <UpcomingSeparator />}

                {/* Nivel 4: Próximamente */}
                {sortedResults.upcoming.map((compound) => (
                  <UpcomingCard key={compound.idPA} name={compound.pa} subtitle={compound.familia} type="compound" />
                ))}
              </motion.div>
            )}
          </TabPanel>

          {/* Panel 2: Por Familia (Premium) */}
          <TabPanel>
            <PremiumGuard mode="blur" featureName="Filtros por familia terapéutica">
              <div className="space-y-6">
                {/* Dropdown de familias */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar familia terapéutica
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-farmateca-primary focus:border-transparent"
                    value={selectedFamily}
                    onChange={(e) => handleFamilyChange(e.target.value)}
                    disabled={isLoadingFamilies}
                  >
                    <option value="">
                      Selecciona una familia ({families.length} disponibles)...
                    </option>
                    {families.map((family) => (
                      <option key={family.nombre} value={family.nombre}>
                        {family.nombre} ({family.cantidad} compuesto{family.cantidad !== 1 ? 's' : ''})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resultados filtrados */}
                {selectedFamily && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">{selectedFamily}</h2>
                      <span className="text-sm text-gray-500">
                        ({filteredFamilyCompounds.length} compuesto{filteredFamilyCompounds.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                    {filteredFamilyCompounds.map((compound) => (
                      <button
                        key={compound.ID_PA}
                        onClick={() => router.push(`/farmateca/web/app/compound/${compound.ID_PA}`)}
                        className="w-full text-left bg-white rounded-xl p-4 border border-gray-200 hover:border-farmateca-primary hover:shadow-md transition-all cursor-pointer"
                      >
                        <h3 className="font-semibold text-gray-900">{compound.PA}</h3>
                        <p className="text-sm text-gray-600 mt-1">{compound.Uso.substring(0, 150)}...</p>
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
