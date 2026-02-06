'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore, useSubscriptionStatus } from '@/lib/farmateca/store/auth-store';
import { startTrial } from '@/lib/farmateca/firebase/auth';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import {
  initializeRevenueCat,
  getCurrentOfferings,
  purchasePackage,
  isUserPremium,
  getCustomerInfo,
} from '@/lib/farmateca/revenuecat/config';
import toast from 'react-hot-toast';

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
    title: 'Filtros avanzados',
    subtitle: 'Busca por familia, laboratorio y tipo',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Información completa',
    subtitle: 'Posología, efectos adversos, interacciones',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '200+ compuestos y 2,500+ marcas',
    subtitle: 'Base de datos actualizada constantemente',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
      </svg>
    ),
    title: 'Acceso offline',
    subtitle: 'Funciona sin conexión a internet',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: 'Favoritos ilimitados',
    subtitle: 'Guarda todos tus medicamentos frecuentes',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    title: 'Soporte prioritario',
    subtitle: 'Respuesta rápida a tus consultas',
  },
];

export default function PaywallPage() {
  const router = useRouter();
  const { user, updateLocalTrialData, updateLocalSubscription } = useAuthStore();
  const { isPremium, isTrialActive, hasUsedTrial, trialDaysRemaining } = useSubscriptionStatus();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isActivatingTrial, setIsActivatingTrial] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [offerings, setOfferings] = useState<any>(null);
  const [loadingOfferings, setLoadingOfferings] = useState(true);

  // Inicializar RevenueCat y cargar offerings
  useEffect(() => {
    if (!user) return;

    // Inicializar RevenueCat con Firebase UID
    initializeRevenueCat(user.uid);

    // Cargar offerings
    async function loadOfferings() {
      try {
        setLoadingOfferings(true);
        const currentOfferings = await getCurrentOfferings();
        setOfferings(currentOfferings);
      } catch (error) {
        console.error('Error loading offerings:', error);
        const errorMsg = 'No se pudieron cargar los planes disponibles';
        toast.error(errorMsg);
        setError(errorMsg);
      } finally {
        setLoadingOfferings(false);
      }
    }

    loadOfferings();
  }, [user]);

  const handleActivateTrial = async () => {
    if (!user) return;

    setIsActivatingTrial(true);
    setError(null);

    const result = await startTrial(user.uid);

    if (result.success) {
      const now = new Date();
      const trialEnd = new Date(now);
      trialEnd.setDate(trialEnd.getDate() + 7);

      updateLocalTrialData(now, trialEnd);
      const successMsg = '¡Prueba activada! Tienes 7 días de acceso Premium completo.';
      toast.success(successMsg);
      setSuccessMessage(successMsg);

      setTimeout(() => {
        router.push('/farmateca/web/app');
      }, 2000);
    } else {
      const errorMsg = result.error || 'Error al activar la prueba';
      toast.error(errorMsg);
      setError(errorMsg);
    }

    setIsActivatingTrial(false);
  };

  const handleSubscribe = async () => {
    if (!user) return;
    if (!offerings?.current) {
      setError('No hay planes disponibles');
      return;
    }

    setIsSubscribing(true);
    setError(null);

    try {
      // Obtener el package correcto según plan seleccionado
      const packageToPurchase =
        selectedPlan === 'yearly'
          ? offerings.current.annual // Debe coincidir con identifier en dashboard
          : offerings.current.monthly;

      if (!packageToPurchase) {
        throw new Error(`Plan ${selectedPlan} no disponible`);
      }

      // Realizar compra a través de RevenueCat
      const customerInfo = await purchasePackage(packageToPurchase);

      // Verificar si la compra fue exitosa
      if (isUserPremium(customerInfo)) {
        updateLocalSubscription(selectedPlan, true);
        const successMsg = `¡Suscripción ${selectedPlan === 'yearly' ? 'anual' : 'mensual'} activada!`;
        toast.success(successMsg);
        setSuccessMessage(successMsg);

        // RevenueCat ya sincronizó con backend, redirect después de 2s
        setTimeout(() => {
          router.push('/farmateca/web/app');
        }, 2000);
      } else {
        throw new Error('La compra no se completó correctamente');
      }
    } catch (error: any) {
      console.error('Error subscribing:', error);

      // Manejo de errores específicos de RevenueCat
      let errorMsg = 'Error al procesar la suscripción';
      if (error.code === 'PURCHASE_CANCELLED') {
        errorMsg = 'Compra cancelada';
      } else if (error.code === 'PURCHASE_NOT_ALLOWED') {
        errorMsg = 'No tienes permisos para realizar compras';
      } else if (error.code === 'PAYMENT_PENDING') {
        errorMsg = 'Pago pendiente. Te notificaremos cuando se complete.';
      } else if (error.message) {
        errorMsg = error.message;
      }
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Mostrar loading mientras carga offerings
  if (loadingOfferings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Cargando planes...</p>
        </div>
      </div>
    );
  }

  // Si ya es premium, redirigir
  if (isPremium && !successMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ya tienes acceso Premium</h2>
          <p className="text-gray-600 mb-4">
            {isTrialActive
              ? `Tu prueba gratuita está activa (${trialDaysRemaining} días restantes)`
              : 'Tu suscripción está activa'}
          </p>
          <button onClick={() => router.push('/farmateca/web/app')} className="btn-farmateca-primary">
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header con botón cerrar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Planes Premium</h1>
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-farmateca-primary-dark via-farmateca-primary to-farmateca-primary-light rounded-3xl p-8 text-white mb-6 shadow-xl"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Desbloquea Todo el Potencial
          </h2>
          <p className="text-white/90 text-center text-sm md:text-base">
            Únete a miles de profesionales de la salud que confían en Farmateca
          </p>
        </motion.div>

        {/* Mensajes de error/éxito */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4"
            >
              {error}
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trial Card (solo si no ha usado trial) */}
        {!hasUsedTrial && !isTrialActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-farmateca-premium/10 to-farmateca-premium/5 border-2 border-farmateca-premium rounded-2xl p-6 mb-6 overflow-hidden"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 bg-farmateca-premium/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-farmateca-premium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                Prueba GRATIS por 7 días
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                Acceso completo a todas las funcionalidades. Sin tarjeta de crédito.
              </p>

              <button
                onClick={handleActivateTrial}
                disabled={isActivatingTrial}
                className="w-full bg-farmateca-premium hover:bg-farmateca-premium-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isActivatingTrial ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Comenzar Prueba Gratuita
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancela cuando quieras. Sin compromisos.
              </p>
            </div>
          </motion.div>
        )}

        {/* Trial Activo Card */}
        {isTrialActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Prueba Gratuita Activa</h4>
              <p className="text-sm text-green-700">
                Te quedan {trialDaysRemaining} día{trialDaysRemaining !== 1 ? 's' : ''} de acceso Premium
              </p>
            </div>
          </motion.div>
        )}

        {/* Trial Expirado Card */}
        {hasUsedTrial && !isTrialActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 border border-gray-200 rounded-2xl p-4 mb-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Tu prueba gratuita ha finalizado</h4>
              <p className="text-sm text-gray-600">
                Suscríbete para continuar con acceso Premium
              </p>
            </div>
          </motion.div>
        )}

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-farmateca-primary-light/10 rounded-xl px-4 py-3 mb-6 flex items-center justify-center gap-2"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium text-gray-600">
            Más de 1,000 profesionales confían en Farmateca
          </span>
        </motion.div>

        {/* Planes de suscripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Planes de Suscripción</h3>

          {/* Plan Anual */}
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`w-full mb-3 p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedPlan === 'yearly'
                ? 'border-farmateca-primary-dark bg-farmateca-primary-light/10 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === 'yearly' ? 'border-farmateca-primary-dark' : 'border-gray-300'
                }`}
              >
                {selectedPlan === 'yearly' && (
                  <div className="w-3 h-3 rounded-full bg-farmateca-primary-dark" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">Premium Anual</span>
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-farmateca-premium to-farmateca-premium-dark px-2 py-0.5 rounded">
                    AHORRA 23%
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-farmateca-primary-dark">$2.916</span>
                  <span className="text-gray-500">/mes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>Facturado $34.990 CLP/año</span>
                  <span className="line-through">$45.480</span>
                </div>
              </div>
            </div>
          </button>

          {/* Plan Mensual */}
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedPlan === 'monthly'
                ? 'border-farmateca-primary-dark bg-farmateca-primary-light/10 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === 'monthly' ? 'border-farmateca-primary-dark' : 'border-gray-300'
                }`}
              >
                {selectedPlan === 'monthly' && (
                  <div className="w-3 h-3 rounded-full bg-farmateca-primary-dark" />
                )}
              </div>
              <div className="flex-1">
                <span className="font-bold text-gray-900">Premium Mensual</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-farmateca-primary-dark">$3.790</span>
                  <span className="text-gray-500 text-sm"> CLP/mes</span>
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">¿Qué incluye Premium?</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botón Suscribirse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="w-full bg-gradient-to-r from-farmateca-primary-dark to-farmateca-primary text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubscribing ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                Suscribirse - {selectedPlan === 'yearly' ? '$34.990 CLP/año' : '$3.790 CLP/mes'}
              </>
            )}
          </button>

          <button
            onClick={() => {
              // TODO: Implementar restauración de compras con RevenueCat
              alert('La restauración de compras estará disponible pronto con RevenueCat/Stripe.');
            }}
            className="w-full text-farmateca-primary-dark font-semibold py-2 hover:underline"
          >
            Restaurar Compras
          </button>
        </motion.div>

        {/* Footer Legal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs text-gray-400 text-center mt-6 leading-relaxed"
        >
          Al suscribirte, aceptas los Términos de Servicio y la Política de Privacidad.
          La suscripción se renueva automáticamente a menos que se cancele 24 horas antes del fin del período.
        </motion.p>
      </div>

      {/* CSS para animación shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
