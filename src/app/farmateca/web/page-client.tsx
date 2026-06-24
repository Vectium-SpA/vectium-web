'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { AuthProvider } from '@/components/farmateca/providers/AuthProvider';

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    text: 'Compuestos y marcas comerciales',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    text: 'Posología, contraindicaciones y más',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    text: 'Favoritos sincronizados en todos tus dispositivos',
  },
];

function FarmatecaLanding() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/farmateca/web/app');
    }
  }, [user, loading, router]);

  // Show spinner while checking auth or while redirecting
  if (loading || user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#147790] via-[#1e9db9] to-[#0d5f62] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#147790] via-[#1e9db9] to-[#0d5f62] flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center text-white">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Image
            src="/farmateca/logos/logotipo_farmateca.png"
            alt="Farmateca"
            width={220}
            height={66}
            className="mx-auto drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-4 leading-tight max-w-2xl"
        >
          Bibliomédica Chilena Offline
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/85 max-w-xl mb-12"
        >
          Consulta información clínica completa de más de 2.556 medicamentos
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl w-full"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-left border border-white/20 flex-1"
            >
              <div className="text-white/90 flex-shrink-0">{feature.icon}</div>
              <p className="text-sm text-white/90 font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/farmateca/web/login"
            className="px-8 py-4 bg-white text-[#147790] font-bold rounded-xl text-lg hover:bg-white/95 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/farmateca/web/register"
            className="px-8 py-4 bg-white/15 text-white font-bold rounded-xl text-lg border-2 border-white/40 hover:bg-white/25 transition-all backdrop-blur-sm hover:scale-105 active:scale-100"
          >
            Registrarse gratis
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-white/50 text-sm">
        Farmateca · Vectium SpA
      </div>
    </div>
  );
}

export default function FarmatecaWebPage() {
  return (
    <AuthProvider>
      <FarmatecaLanding />
    </AuthProvider>
  );
}
