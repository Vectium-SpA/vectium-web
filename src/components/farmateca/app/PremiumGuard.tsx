'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useIsPremium, useHasUsedTrial, useIsTrialActive, useTrialDaysRemaining } from '@/lib/farmateca/store/auth-store';

interface PremiumGuardProps {
  children: ReactNode;
  /**
   * Contenido a mostrar cuando el usuario no es premium.
   * Si no se proporciona, se muestra un mensaje por defecto.
   */
  fallback?: ReactNode;
  /**
   * Tipo de bloqueo visual.
   * - 'blur': Muestra el contenido difuminado con overlay
   * - 'hide': Oculta completamente el contenido
   * - 'preview': Muestra una versión limitada con el fallback debajo
   */
  mode?: 'blur' | 'hide' | 'preview';
  /**
   * Título personalizado para el mensaje de bloqueo
   */
  title?: string;
  /**
   * Descripción personalizada para el mensaje de bloqueo
   */
  description?: string;
  /**
   * Nombre de la característica que se está protegiendo (para mostrar en el mensaje)
   */
  featureName?: string;
}

/**
 * Componente que protege contenido premium.
 * Envuelve el contenido que solo deben ver usuarios Premium o con Trial activo.
 */
export function PremiumGuard({
  children,
  fallback,
  mode = 'blur',
  title,
  description,
  featureName,
}: PremiumGuardProps) {
  const isPremium = useIsPremium();

  // Si el usuario es premium, mostrar el contenido
  if (isPremium) {
    return <>{children}</>;
  }

  // Contenido de fallback por defecto
  const defaultFallback = (
    <PremiumUpgradeCard
      title={title}
      description={description}
      featureName={featureName}
    />
  );

  // Según el modo, mostrar diferente comportamiento
  switch (mode) {
    case 'hide':
      return <>{fallback || defaultFallback}</>;

    case 'preview':
      return (
        <div className="relative">
          {children}
          <div className="mt-4">
            {fallback || defaultFallback}
          </div>
        </div>
      );

    case 'blur':
    default:
      return (
        <div className="relative">
          {/* Contenido difuminado */}
          <div className="blur-sm pointer-events-none select-none opacity-60">
            {children}
          </div>

          {/* Overlay con mensaje de upgrade */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
            {fallback || defaultFallback}
          </div>
        </div>
      );
  }
}

/**
 * Card de upgrade a premium que se muestra cuando el contenido está bloqueado
 */
interface PremiumUpgradeCardProps {
  title?: string;
  description?: string;
  featureName?: string;
  compact?: boolean;
}

export function PremiumUpgradeCard({
  title,
  description,
  featureName,
  compact = false,
}: PremiumUpgradeCardProps) {
  const hasUsedTrial = useHasUsedTrial();

  const defaultTitle = featureName
    ? `${featureName} es una función Premium`
    : 'Contenido Premium';

  const defaultDescription = hasUsedTrial
    ? 'Suscríbete para acceder a todas las funcionalidades de Farmateca.'
    : 'Prueba gratis por 7 días o suscríbete para acceder a todas las funcionalidades.';

  if (compact) {
    return (
      <Link
        href="/app/paywall"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-farmateca-primary-dark to-farmateca-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
      >
        <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        Ver planes Premium
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto border border-gray-100"
    >
      {/* Icono */}
      <div className="w-14 h-14 bg-gradient-to-br from-farmateca-primary-dark to-farmateca-primary rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
        {title || defaultTitle}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-gray-600 text-center mb-4">
        {description || defaultDescription}
      </p>

      {/* CTAs */}
      <div className="space-y-2">
        {!hasUsedTrial && (
          <Link
            href="/app/paywall"
            className="block w-full bg-farmateca-premium hover:bg-farmateca-premium-dark text-white font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Prueba GRATIS 7 días
          </Link>
        )}
        <Link
          href="/app/paywall"
          className={`block w-full font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 ${
            hasUsedTrial
              ? 'bg-gradient-to-r from-farmateca-primary-dark to-farmateca-primary text-white shadow-md hover:shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {hasUsedTrial ? 'Ver planes Premium' : 'Ver planes de suscripción'}
        </Link>
      </div>
    </motion.div>
  );
}

/**
 * Banner pequeño de estado de suscripción para mostrar en el header o dashboard
 */
export function SubscriptionStatusBanner() {
  const isPremium = useIsPremium();
  const isTrialActive = useIsTrialActive();
  const trialDaysRemaining = useTrialDaysRemaining();
  const hasUsedTrial = useHasUsedTrial();

  // Usuario Premium con suscripción
  if (isPremium && !isTrialActive) {
    return (
      <div className="flex items-center gap-2 bg-gradient-to-r from-farmateca-premium to-farmateca-premium-dark text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        Premium
      </div>
    );
  }

  // Usuario con Trial activo
  if (isTrialActive) {
    const isExpiring = trialDaysRemaining <= 2;
    return (
      <Link
        href="/app/paywall"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-md ${
          isExpiring
            ? 'bg-orange-100 text-orange-700 border border-orange-200'
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Trial: {trialDaysRemaining} día{trialDaysRemaining !== 1 ? 's' : ''}
      </Link>
    );
  }

  // Usuario Free
  return (
    <Link
      href="/app/paywall"
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
    >
      {hasUsedTrial ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Plan Free
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Probar Premium
        </>
      )}
    </Link>
  );
}

/**
 * Banner grande de promoción de Premium para el dashboard
 */
export function PremiumPromoBanner() {
  const isPremium = useIsPremium();
  const isTrialActive = useIsTrialActive();
  const trialDaysRemaining = useTrialDaysRemaining();
  const hasUsedTrial = useHasUsedTrial();

  // No mostrar si ya es premium con suscripción
  if (isPremium && !isTrialActive) {
    return null;
  }

  // Banner de Trial activo
  if (isTrialActive) {
    const isExpiring = trialDaysRemaining <= 2;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4 ${
          isExpiring
            ? 'bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200'
            : 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isExpiring ? 'bg-orange-200' : 'bg-green-200'
            }`}
          >
            <svg
              className={`w-5 h-5 ${isExpiring ? 'text-orange-600' : 'text-green-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className={`font-semibold ${isExpiring ? 'text-orange-800' : 'text-green-800'}`}>
              {isExpiring ? '¡Tu prueba está por terminar!' : 'Prueba Gratuita Activa'}
            </p>
            <p className={`text-sm ${isExpiring ? 'text-orange-600' : 'text-green-600'}`}>
              Te quedan {trialDaysRemaining} día{trialDaysRemaining !== 1 ? 's' : ''} de acceso Premium
            </p>
          </div>
        </div>
        <Link
          href="/app/paywall"
          className={`font-semibold py-2 px-4 rounded-xl transition-all ${
            isExpiring
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isExpiring ? 'Suscribirme ahora' : 'Ver planes'}
        </Link>
      </motion.div>
    );
  }

  // Banner de promoción para usuarios Free
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-farmateca-primary-dark via-farmateca-primary to-farmateca-primary-light rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-white">
            {hasUsedTrial ? 'Acceso limitado' : 'Desbloquea todo el contenido'}
          </p>
          <p className="text-sm text-white/80">
            {hasUsedTrial
              ? 'Suscríbete para acceder a todas las funcionalidades'
              : 'Prueba gratis por 7 días todas las funcionalidades Premium'}
          </p>
        </div>
      </div>
      <Link
        href="/app/paywall"
        className="bg-white hover:bg-gray-100 text-farmateca-primary-dark font-semibold py-2 px-4 rounded-xl transition-all"
      >
        {hasUsedTrial ? 'Ver planes' : 'Probar GRATIS'}
      </Link>
    </motion.div>
  );
}
