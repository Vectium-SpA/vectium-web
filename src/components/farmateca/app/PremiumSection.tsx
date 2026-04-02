'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsPremium, useHasUsedTrial } from '@/lib/farmateca/store/auth-store';

interface PremiumSectionProps {
  /** Título de la sección */
  title: string;
  /** Icono de la sección (componente React) */
  icon: ReactNode;
  /** Contenido premium (solo visible para usuarios premium) */
  children: ReactNode;
  /** Nombre de la feature para el mensaje de bloqueo */
  featureName?: string;
  /** Si la sección viene abierta por defecto (solo aplica a usuarios premium) */
  defaultOpen?: boolean;
}

/**
 * Sección colapsable con bloqueo premium — idéntico al ExpansionTile de la app móvil.
 *
 * Usuarios FREE: ven la fila con ícono de candado + título gris + estrella dorada.
 * Al expandir, aparece la tarjeta "Contenido Premium" con CTA.
 *
 * Usuarios PREMIUM: ven la fila normal. Al expandir, aparece el contenido real.
 */
export function PremiumSection({
  title,
  icon,
  children,
  featureName,
  defaultOpen = false,
}: PremiumSectionProps) {
  const isPremium = useIsPremium();
  const [isOpen, setIsOpen] = useState(isPremium && defaultOpen);

  // ─── Usuario Premium: accordion normal ─────────────────────
  if (isPremium) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className="font-semibold text-gray-900 dark:text-white text-left">{title}</span>
          </div>
          <ChevronIcon isOpen={isOpen} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-700">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── Usuario Free: fila bloqueada ───────────────────────────
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Ícono candado con gradiente teal — igual que app móvil */}
          <div className="w-8 h-8 bg-gradient-to-br from-farmateca-primary-dark to-farmateca-primary rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-farmateca-premium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          {/* Ícono original grisado */}
          <span className="opacity-40 dark:opacity-30">{icon}</span>
          {/* Título grisado */}
          <span className="font-semibold text-gray-400 dark:text-gray-500 text-left">{title}</span>
          {/* Estrella dorada premium */}
          <svg className="w-4 h-4 text-farmateca-premium flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <ChevronIcon isOpen={isOpen} className="text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-gray-700">
              <PremiumLockedContent featureName={featureName || title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contenido de bloqueo premium ───────────────────────────
function PremiumLockedContent({ featureName }: { featureName: string }) {
  const hasUsedTrial = useHasUsedTrial();

  return (
    <div className="my-2 p-5 rounded-xl border border-farmateca-primary/30 dark:border-farmateca-primary/20 bg-farmateca-primary/5 dark:bg-farmateca-primary/10">
      <div className="flex flex-col items-center text-center gap-4">
        {/* Ícono candado grande */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'linear-gradient(135deg, var(--farmateca-primary-dark), var(--farmateca-primary))' }}
        >
          <svg className="w-7 h-7 text-farmateca-premium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Título */}
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">Contenido Premium</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Actualiza a Premium para ver{' '}
            <span className="font-medium text-farmateca-primary">{featureName.toLowerCase()}</span>
            {' '}y toda la información clínica completa.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/farmateca/web/app/paywall"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--farmateca-primary-dark), var(--farmateca-primary))' }}
        >
          <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          {hasUsedTrial ? 'Ver Planes Premium' : 'Prueba GRATIS 7 días'}
        </Link>
      </div>
    </div>
  );
}

// ─── Chevron helper ─────────────────────────────────────────
function ChevronIcon({ isOpen, className = 'text-gray-400 dark:text-gray-500' }: { isOpen: boolean; className?: string }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
