'use client';

import { motion } from 'framer-motion';
import { useAuthStore, useSubscriptionStatus } from '@/lib/farmateca/store/auth-store';
import { SearchCard } from '@/components/farmateca/app/SearchCard';
import { PremiumPromoBanner } from '@/components/farmateca/app/PremiumGuard';
import { useFavorites } from '@/lib/farmateca/hooks/useFavorites';

const searchOptions = [
  {
    title: 'Búsqueda Rápida',
    description: 'Busca por nombre comercial o compuesto',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    href: '/farmateca/web/app/search',
    gradient: 'from-farmateca-primary to-farmateca-primary-light',
  },
  {
    title: 'Compuestos',
    description: 'Principios activos y familias terapéuticas',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    href: '/farmateca/web/app/search/compound',
    gradient: 'from-farmateca-compound to-blue-400',
  },
  {
    title: 'Marcas',
    description: 'Comerciales, genéricos y laboratorios',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    href: '/farmateca/web/app/search/brand',
    gradient: 'from-farmateca-primary-dark to-farmateca-primary',
  },
  {
    title: 'Mis Favoritos',
    description: 'Acceso rápido a medicamentos guardados',
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    href: '/farmateca/web/app/favorites',
    gradient: 'from-farmateca-favorites to-pink-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function AppHomePage() {
  const { userData } = useAuthStore();
  const { isPremium, isTrialActive, trialDaysRemaining } = useSubscriptionStatus();
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Banner promocional (solo para usuarios Free o Trial por expirar) */}
        <PremiumPromoBanner />

        {/* Header de bienvenida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-farmateca-primary-dark via-farmateca-primary to-farmateca-primary-light rounded-3xl p-8 text-white mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Bienvenido, {userData?.alias || userData?.nombre || 'Usuario'}
              </h1>
              <p className="text-white/90 text-lg">
                Accede a información farmacológica completa
              </p>
            </div>

            {/* Badge de estado */}
            {isPremium ? (
              isTrialActive ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="font-semibold">Prueba Premium</span>
                  </div>
                  <p className="text-sm text-white/80">
                    {trialDaysRemaining} día{trialDaysRemaining !== 1 ? 's' : ''} restante{trialDaysRemaining !== 1 ? 's' : ''}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-farmateca-premium text-gray-900 px-4 py-2 rounded-full font-bold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium
                </div>
              )
            ) : (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
                <p className="text-sm text-white/80">Plan actual</p>
                <p className="font-bold">Gratuito</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Grid de búsqueda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Qué deseas buscar?</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {searchOptions.map((option, index) => (
              <SearchCard key={option.title} {...option} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-farmateca-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-farmateca-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-farmateca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">2,556</p>
                <p className="text-gray-500">Medicamentos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-farmateca-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-farmateca-compound/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-farmateca-compound" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">200+</p>
                <p className="text-gray-500">Compuestos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-farmateca-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-farmateca-favorites/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-farmateca-favorites" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{favorites.length}</p>
                <p className="text-gray-500">Favoritos</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
