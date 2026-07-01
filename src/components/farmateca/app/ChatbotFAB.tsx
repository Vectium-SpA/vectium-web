'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsPremium } from '@/lib/farmateca/store/auth-store';

export function ChatbotFAB() {
  const isPremium = useIsPremium();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (isPremium) {
      router.push('/farmateca/web/app/chat');
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-shadow hover:shadow-xl"
        style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
        title="Asistente Farmacológico"
      >
        {/* Chat icon */}
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* Premium lock badge */}
        {!isPremium && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-farmateca-premium rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-farmateca-primary-dark" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </span>
        )}
      </motion.button>

      {/* Modal backdrop + dialog */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShowModal(false)}
            />

            {/* Modal — solo usuarios free */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
                >
                  <svg className="w-7 h-7 text-farmateca-premium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">Contenido Premium</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Actualiza a Premium para acceder al{' '}
                    <span className="font-medium text-farmateca-primary">asistente farmacológico</span>
                    {' '}con consultas ilimitadas.
                  </p>
                </div>
                <Link
                  href="/farmateca/web/app/paywall"
                  onClick={() => setShowModal(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
                >
                  <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Ver Planes Premium
                </Link>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  No por ahora
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
