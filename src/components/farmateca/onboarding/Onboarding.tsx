'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const screens: Slide[] = [
  {
    id: 1,
    title: 'Bienvenido a Farmateca',
    description: 'Tu bibliomédica chilena para estudiantes y profesionales de la salud.',
    features: ['Datos ISP · MINSAL', 'Siempre actualizado', 'Multiplataforma'],
    icon: (
      <div className="w-32 h-32 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xl ring-1 ring-white/30">
        <Image
          src="/farmateca/logos/isotipo_farmateca.png"
          alt="Farmateca"
          width={88}
          height={88}
          className="h-22 w-22 object-contain drop-shadow-lg"
        />
      </div>
    ),
  },
  {
    id: 2,
    title: 'Busca medicamentos',
    description: 'Por nombre comercial, principio activo, familia farmacológica o laboratorio.',
    features: ['+2.500 marcas', 'Fichas clínicas', 'Búsqueda avanzada'],
    icon: (
      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-farmateca-blue to-farmateca-bright flex items-center justify-center shadow-2xl ring-1 ring-white/30">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Todo en un solo lugar',
    description: 'Favoritos sincronizados, Farmacias de Chile con mapa y asistente integrado.',
    features: ['Favoritos en la nube', 'Farmacias + mapa', 'Asistente'],
    icon: (
      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-farmateca-premium to-yellow-400 flex items-center justify-center shadow-2xl ring-1 ring-white/30">
        <svg className="w-16 h-16 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
    ),
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setDirection(1);
      setCurrentScreen(currentScreen + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentScreenData = screens[currentScreen];
  const isLastScreen = currentScreen === screens.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-farmateca-primary-dark via-farmateca-primary to-farmateca-bright flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute -top-28 -left-24 w-[26rem] h-[26rem] rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-farmateca-bright/25 blur-3xl" />

      <div className="w-full max-w-md relative">
        {/* Skip button */}
        {!isLastScreen && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSkip}
            className="absolute top-2 right-2 text-white/80 hover:text-white font-medium transition-colors z-10"
          >
            Omitir
          </motion.button>
        )}

        {/* Content */}
        <div className="relative h-[520px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentScreenData.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full flex flex-col items-center text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-8"
              >
                {currentScreenData.icon}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                {currentScreenData.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/90 max-w-sm mb-6"
              >
                {currentScreenData.description}
              </motion.p>

              {/* Feature chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 max-w-sm"
              >
                {currentScreenData.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-white text-sm font-medium"
                  >
                    {f}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mb-8"
        >
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentScreen ? 1 : -1);
                setCurrentScreen(index);
              }}
              className="transition-all"
              aria-label={`Ir a pantalla ${index + 1}`}
            >
              <div
                className={`h-2 rounded-full transition-all ${
                  index === currentScreen
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </motion.div>

        {/* Next/Start button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-farmateca-primary-dark py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
        >
          {isLastScreen ? (
            <>
              <span>Comenzar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          ) : (
            <>
              <span>Continuar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
