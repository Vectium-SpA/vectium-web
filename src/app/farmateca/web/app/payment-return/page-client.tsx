'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import toast from 'react-hot-toast';

// ─── Contenido principal ──────────────────────────────────────
function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, updateLocalSubscription } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando tu pago...');

  useEffect(() => {
    if (!user) return; // AppLayout redirige si no hay sesión

    const plan = searchParams.get('plan') as 'monthly' | 'yearly' | null;

    // Recuperar el token de registro de tarjeta guardado antes del redirect a Flow
    const token = sessionStorage.getItem('flow_register_token');
    if (token) sessionStorage.removeItem('flow_register_token');

    async function verifyAndActivate() {
      // Sin plan → error de parámetros
      if (!plan) {
        setStatus('error');
        setMessage('Parámetros de retorno incompletos. Contacta a soporte.');
        return;
      }

      // Sin token → el pago puede estar siendo procesado
      if (!token) {
        setStatus('success');
        setMessage(
          'Tu suscripción está siendo procesada. Accederás a Premium en breve.'
        );
        setTimeout(() => router.push('/farmateca/web/app'), 3000);
        return;
      }

      try {
        // ── Confirmar registro de tarjeta + crear suscripción (server-side) ──
        const res = await fetch(
          `/api/farmateca/flow/confirm?token=${token}`
        );
        const data = await res.json() as { isActive: boolean; planId?: string };

        if (data.isActive) {
          // La activación en Firestore la realiza el endpoint /confirm server-side
          // (Admin SDK). Aquí solo reflejamos el estado localmente para UX inmediato;
          // el cliente ya NO escribe 'suscripcion' (lo bloquean las Firestore Rules).
          updateLocalSubscription(plan, true);

          setStatus('success');
          setMessage('¡Suscripción Premium activada!');
          toast.success('¡Bienvenido a Farmateca Premium! 🎉');
          setTimeout(() => router.push('/farmateca/web/app'), 2500);
        } else {
          setStatus('error');
          setMessage(
            'El pago no fue confirmado aún. Si ya pagaste, espera unos minutos y recarga la app.'
          );
        }
      } catch {
        setStatus('error');
        setMessage(
          'Error al verificar el pago. Si ya completaste el pago, contacta a soporte.'
        );
      }
    }

    verifyAndActivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-[65vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-[#147790] to-[#004D4F] rounded-3xl p-10 max-w-md w-full text-center text-white shadow-2xl"
      >
        {/* Loading */}
        {status === 'loading' && (
          <>
            <LoadingSpinner size="lg" />
            <p className="mt-6 text-white/80 text-lg">{message}</p>
          </>
        )}

        {/* Success */}
        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-24 h-24 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                className="w-12 h-12 text-emerald-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold mb-3">¡Pago exitoso!</h2>
            <p className="text-white/80 mb-2">{message}</p>
            <p className="text-white/40 text-sm mt-4">Redirigiendo al dashboard...</p>
          </>
        )}

        {/* Error */}
        {status === 'error' && (
          <>
            <div className="w-24 h-24 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-red-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3">Error en el pago</h2>
            <p className="text-white/70 mb-8 leading-relaxed">{message}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => router.push('/farmateca/web/app/paywall')}
                className="px-6 py-3 bg-[#FFB800] text-black font-bold rounded-xl hover:bg-[#FFB800]/90 transition-all hover:scale-105"
              >
                Reintentar pago
              </button>
              <button
                onClick={() => router.push('/farmateca/web/app')}
                className="px-6 py-3 bg-white/15 text-white rounded-xl hover:bg-white/25 transition-all"
              >
                Ir al dashboard
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

// Suspense boundary requerido por useSearchParams en Next.js 16
export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[65vh]">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}
