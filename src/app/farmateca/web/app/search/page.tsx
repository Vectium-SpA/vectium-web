'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { motion } from 'framer-motion';
import { SearchBar, CompoundCard, BrandCard, UpcomingCard, UpcomingSeparator } from '@/components/farmateca/clinical';
import { searchAll, SearchResults } from '@/lib/farmateca/api/search';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import { sortCompoundResults, sortBrandResults } from '@/lib/farmateca/utils/search-sort';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    compounds: [],
    brands: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ compounds: [], brands: [], totalCount: 0 });
      setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResults = await searchAll(query);
        setResults(searchResults);
        setHasSearched(true);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const getFilteredResults = () => {
    switch (selectedTab) {
      case 0:
        return { compounds: results.compounds, brands: [] };
      case 1:
        return { compounds: [], brands: results.brands };
      case 2:
      default:
        return { compounds: results.compounds, brands: results.brands };
    }
  };

  const filteredResults = getFilteredResults();

  // Aplicar algoritmo de ordenamiento 4 niveles
  const sortedCompounds = sortCompoundResults(filteredResults.compounds, query);
  const sortedBrands = sortBrandResults(filteredResults.brands, query);

  const showCompounds = sortedCompounds.available.length > 0 || sortedCompounds.upcoming.length > 0;
  const showBrands = sortedBrands.available.length > 0 || sortedBrands.upcoming.length > 0;
  const noResults = hasSearched && !showCompounds && !showBrands && !isLoading;

  const totalCompoundResults = filteredResults.compounds.length;
  const totalBrandResults = filteredResults.brands.length;

  const getPlaceholder = () => {
    switch (selectedTab) {
      case 0:
        return 'Buscar principio activo...';
      case 1:
        return 'Buscar marca comercial o genérico...';
      default:
        return 'Buscar medicamento o compuesto...';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar</h1>
        <p className="text-gray-600">
          Encuentra información detallada sobre compuestos, marcas comerciales y genéricos.
        </p>
      </motion.div>

      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList className="flex space-x-1 bg-gray-100 p-1 mb-6 rounded-xl">
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
            COMPUESTOS
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
            MARCAS
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
            TODOS
          </Tab>
        </TabList>
      </TabGroup>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <SearchBar
          onSearch={handleSearch}
          placeholder={getPlaceholder()}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Estado inicial */}
      {!hasSearched && !query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Comienza a buscar</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Escribe el nombre de un compuesto o marca para encontrar información farmacológica detallada.
          </p>
          <div className="mt-8">
            <p className="text-sm text-gray-400 mb-3">Búsquedas frecuentes:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Omeprazol'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-farmateca-primary/10 hover:text-farmateca-primary transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading */}
      {isLoading && query && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
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
          <p className="text-gray-500">No hay coincidencias para &quot;{query}&quot;. Intenta con otro término.</p>
        </motion.div>
      )}

      {/* Resultados con ordenamiento 4 niveles */}
      {!isLoading && hasSearched && (showCompounds || showBrands) && (
        <div className="space-y-8">
          {/* Compuestos */}
          {showCompounds && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-farmateca-compound/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-farmateca-compound" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Compuestos</h2>
                <span className="text-sm text-gray-500">({totalCompoundResults})</span>
              </div>
              <div className="space-y-2">
                {sortedCompounds.available.map((compound) => (
                  <CompoundCard key={compound.idPA} compound={compound} />
                ))}
                {sortedCompounds.hasUpcoming && <UpcomingSeparator />}
                {sortedCompounds.upcoming.map((compound) => (
                  <UpcomingCard key={compound.idPA} name={compound.pa} subtitle={compound.familia} type="compound" />
                ))}
              </div>
            </motion.section>
          )}

          {/* Marcas */}
          {showBrands && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showCompounds ? 0.1 : 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-farmateca-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Marcas</h2>
                <span className="text-sm text-gray-500">({totalBrandResults})</span>
              </div>
              <div className="space-y-2">
                {sortedBrands.available.slice(0, 50).map((brand) => (
                  <BrandCard key={brand.idMA} brand={brand} />
                ))}
                {sortedBrands.available.length > 50 && (
                  <p className="text-center text-sm text-gray-500 py-2">
                    Mostrando 50 de {sortedBrands.available.length} resultados disponibles. Refina tu búsqueda para ver más.
                  </p>
                )}
                {sortedBrands.hasUpcoming && <UpcomingSeparator />}
                {sortedBrands.upcoming.slice(0, 20).map((brand) => (
                  <UpcomingCard key={brand.idMA} name={brand.ma} subtitle={brand.labM} type="brand" />
                ))}
                {sortedBrands.upcoming.length > 20 && (
                  <p className="text-center text-sm text-gray-400 py-2">
                    y {sortedBrands.upcoming.length - 20} más próximamente...
                  </p>
                )}
              </div>
            </motion.section>
          )}
        </div>
      )}
    </div>
  );
}
