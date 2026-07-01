'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore, useSubscriptionStatus } from '@/lib/farmateca/store/auth-store';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import toast from 'react-hot-toast';

// ─── Feature Cards Data ──────────────────────────────────────
const featureCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Información clínica completa',
    items: [
      'Busca sin límites todos los compuestos y marcas comerciales',
      'Posología y vías de administración',
      'Contraindicaciones y efectos adversos',
      'Precauciones especiales: embarazo, renal, hepático y más',
      'Mecanismos de acción, indicaciones, dosis y más',
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Buscador Pro y filtros avanzados',
    items: [
      'Catálogos completos por laboratorio',
      'Busca por familia farmacológica y sus compuestos',
      'Encuentra marcas comerciales o genéricas al instante',
      'Accede a marcas asociadas a compuestos en un solo clic',
      'Navega rápidamente entre marcas y principios activos',
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Favoritos y acceso completo',
    items: [
      'Filtra tus guardados por marcas o compuestos',
      'Todo sin conexión: contenido Premium 100% disponible',
      'Dudas: Soporte preferencial las 24 horas del día',
    ],
  },
];

export default function PaywallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const { isPremium } = useSubscriptionStatus();

  const planParam = searchParams.get('plan');
  const defaultPlan: 'monthly' | 'yearly' = planParam === 'monthly' ? 'monthly' : 'yearly';

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(defaultPlan);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubscribe = async () => {
    if (!user) return;

    setIsSubscribing(true);
    setError(null);

    try {
      // ── Llamar a la API de Flow para crear la suscripción ──
      const response = await fetch('/api/farmateca/flow/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          uid: user.uid,
          email: user.email ?? '',
          name: user.displayName ?? undefined,
        }),
      });

      const data = await response.json() as { url?: string; subscriptionId?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Error al iniciar el proceso de pago');
      }

      // Guardar subscriptionId en sessionStorage para verificar al volver
      if (data.subscriptionId) {
        sessionStorage.setItem('flow_subscription_id', data.subscriptionId);
      }

      // Redirigir a Flow para que el usuario complete el pago
      window.location.href = data.url;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error al procesar el pago';
      toast.error(errorMsg);
      setError(errorMsg);
      setIsSubscribing(false);
    }
  };

  // Si ya es premium
  if (isPremium && !successMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a2a2b] via-[#147790] to-[#0d1117] flex items-center justify-center p-6">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-3">Ya tienes acceso Premium</h2>
          <p className="text-white/70 mb-8">
            Tu suscripción está activa
          </p>
          <button
            onClick={() => router.push('/farmateca/web/app')}
            className="px-8 py-4 bg-[#FFB800] text-black font-bold rounded-xl hover:bg-[#FFB800]/90 transition-all hover:scale-105"
          >
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2a2b] via-[#147790] to-[#0d1117]">
      {/* Close button */}
      <div className="sticky top-0 z-20 flex justify-end p-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 -mt-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/farmateca/logos/logotipo_farmateca.png"
              alt="Farmateca"
              width={180}
              height={54}
              className="drop-shadow-lg brightness-0 invert"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Decide con seguridad<br className="hidden sm:block" /> en segundos
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Información clínica completa de la bibliomédica chilena offline
          </p>
        </motion.div>

        {/* SUCCESS / ERROR messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FEATURE CARDS — 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
            >
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-4 text-white/90">
                {card.icon}
              </div>
              <h3 className="font-bold text-base mb-4 text-white">{card.title}</h3>
              <ul className="space-y-2">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/75">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* PRICING SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-xl mx-auto"
        >
          {/* Toggle Mensual / Anual */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                selectedPlan === 'monthly'
                  ? 'bg-white text-[#147790]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Mensual
            </button>
            <motion.button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all relative ${
                selectedPlan === 'yearly'
                  ? 'bg-white text-[#147790]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Anual
              <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                -27%
              </span>
            </motion.button>
          </div>

          {/* Precio */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlan}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-center mb-8"
            >
              {selectedPlan === 'yearly' ? (
                <>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Más Popular
                    </span>
                    <span className="text-white/60 text-sm">= 2 meses gratis</span>
                  </div>
                  <div className="text-6xl font-bold text-white mb-1">
                    $34.990
                  </div>
                  <div className="text-white/60 text-sm">CLP/año · $2.916/mes</div>
                </>
              ) : (
                <>
                  <div className="text-6xl font-bold text-white mb-1">
                    $3.990
                  </div>
                  <div className="text-white/60 text-sm">CLP/mes</div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA Principal */}
          <motion.button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            whileHover={{ scale: isSubscribing ? 1 : 1.03 }}
            whileTap={{ scale: isSubscribing ? 1 : 0.97 }}
            className="w-full bg-[#FFB800] text-black font-bold py-4 px-6 rounded-xl text-lg shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
          >
            {isSubscribing ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Procesando...</span>
              </>
            ) : (
              'Comenzar ahora'
            )}
          </motion.button>

          {/* Restaurar compra */}
          <button
            onClick={() => toast('Para restaurar tu compra contacta a soporte', { icon: 'ℹ️' })}
            className="w-full text-white/40 hover:text-white/60 text-xs py-1 transition-colors"
          >
            Restaurar compra
          </button>
        </motion.div>

        {/* Footer legal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-white/30 text-xs mt-8 px-4 leading-relaxed"
        >
          Al suscribirte aceptas los Términos de Servicio y la Política de Privacidad. La suscripción se renueva automáticamente a menos que se cancele 24 horas antes del fin del período.
        </motion.p>
      </div>
    </div>
  );
}
