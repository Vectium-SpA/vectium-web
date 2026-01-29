'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useIsPremium, useHasUsedTrial, useIsTrialActive, useTrialDaysRemaining } from '@/lib/farmateca/store/auth-store';

interface PremiumGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  mode?: 'blur' | 'hide' | 'preview';
  title?: string;
  description?: string;
  featureName?: string;
}

export function PremiumGuard({ children, fallback, mode = 'blur', title, description, featureName }: PremiumGuardProps) {
  const isPremium = useIsPremium();

  if (isPremium) return <>{children}</>;

  const defaultFallback = <PremiumUpgradeCard title={title} description={description} featureName={featureName} />;

  switch (mode) {
    case 'hide':
      return <>{fallback || defaultFallback}</>;
    case 'preview':
      return (
        <div className="relative">
          {children}
          <div className="mt-4">{fallback || defaultFallback}</div>
        </div>
      );
    case 'blur':
    default:
      return (
        <div className="relative">
          <div className="blur-sm pointer-events-none select-none opacity-60">{children}</div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
            {fallback || defaultFallback}
          </div>
        </div>
      );
  }
}

interface PremiumUpgradeCardProps {
  title?: string;
  description?: string;
  featureName?: string;
  compact?: boolean;
}

export function PremiumUpgradeCard({ title, description, featureName, compact = false }: PremiumUpgradeCardProps) {
  const hasUsedTrial = useHasUsedTrial();
  const defaultTitle = featureName ? `${featureName} es una funcion Premium` : 'Contenido Premium';
  const defaultDescription = hasUsedTrial
    ? 'Suscribete para acceder a todas las funcionalidades de Farmateca.'
    : 'Prueba gratis por 7 dias o suscribete para acceder a todas las funcionalidades.';

  if (compact) {
    return (
      <Link href="/farmateca/app/paywall" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-700 to-teal-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        Ver planes Premium
      </Link>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto border border-gray-100">
      <div className="w-14 h-14 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{title || defaultTitle}</h3>
      <p className="text-sm text-gray-600 text-center mb-4">{description || defaultDescription}</p>
      <div className="space-y-2">
        {!hasUsedTrial && (
          <Link href="/farmateca/app/paywall" className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 shadow-md hover:shadow-lg">
            Prueba GRATIS 7 dias
          </Link>
        )}
        <Link href="/farmateca/app/paywall" className={`block w-full font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 ${hasUsedTrial ? 'bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          {hasUsedTrial ? 'Ver planes Premium' : 'Ver planes de suscripcion'}
        </Link>
      </div>
    </motion.div>
  );
}

export function SubscriptionStatusBanner() {
  const isPremium = useIsPremium();
  const isTrialActive = useIsTrialActive();
  const trialDaysRemaining = useTrialDaysRemaining();
  const hasUsedTrial = useHasUsedTrial();

  if (isPremium && !isTrialActive) {
    return (
      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        Premium
      </div>
    );
  }

  if (isTrialActive) {
    const isExpiring = trialDaysRemaining <= 2;
    return (
      <Link href="/farmateca/app/paywall" className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-md ${isExpiring ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Trial: {trialDaysRemaining} dia{trialDaysRemaining !== 1 ? 's' : ''}
      </Link>
    );
  }

  return (
    <Link href="/farmateca/app/paywall" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-sm font-medium transition-all">
      {hasUsedTrial ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Plan Free
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Probar Premium
        </>
      )}
    </Link>
  );
}

export function PremiumPromoBanner() {
  const isPremium = useIsPremium();
  const isTrialActive = useIsTrialActive();
  const trialDaysRemaining = useTrialDaysRemaining();
  const hasUsedTrial = useHasUsedTrial();

  if (isPremium && !isTrialActive) return null;

  if (isTrialActive) {
    const isExpiring = trialDaysRemaining <= 2;
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4 ${isExpiring ? 'bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200' : 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isExpiring ? 'bg-orange-200' : 'bg-green-200'}`}>
            <svg className={`w-5 h-5 ${isExpiring ? 'text-orange-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className={`font-semibold ${isExpiring ? 'text-orange-800' : 'text-green-800'}`}>{isExpiring ? 'Tu prueba esta por terminar!' : 'Prueba Gratuita Activa'}</p>
            <p className={`text-sm ${isExpiring ? 'text-orange-600' : 'text-green-600'}`}>Te quedan {trialDaysRemaining} dia{trialDaysRemaining !== 1 ? 's' : ''} de acceso Premium</p>
          </div>
        </div>
        <Link href="/farmateca/app/paywall" className={`font-semibold py-2 px-4 rounded-xl transition-all ${isExpiring ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
          {isExpiring ? 'Suscribirme ahora' : 'Ver planes'}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-white">{hasUsedTrial ? 'Acceso limitado' : 'Desbloquea todo el contenido'}</p>
          <p className="text-sm text-white/80">{hasUsedTrial ? 'Suscribete para acceder a todas las funcionalidades' : 'Prueba gratis por 7 dias todas las funcionalidades Premium'}</p>
        </div>
      </div>
      <Link href="/farmateca/app/paywall" className="bg-white hover:bg-gray-100 text-teal-700 font-semibold py-2 px-4 rounded-xl transition-all">
        {hasUsedTrial ? 'Ver planes' : 'Probar GRATIS'}
      </Link>
    </motion.div>
  );
}
