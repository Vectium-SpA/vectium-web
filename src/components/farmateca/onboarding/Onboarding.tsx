'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

const screens = [
  {
    id: 1,
    title: 'Bienvenido a Farmateca',
    description: 'Tu enciclopedia médica en línea',
    icon: (
      <div className="w-32 h-32 bg-gradient-to-br from-farmateca-primary-dark to-farmateca-primary rounded-3xl flex items-center justify-center shadow-2xl">
        <span className="text-white font-bold text-6xl">F</span>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Busca medicamentos',
    description: 'Por nombre, familia o laboratorio',
    icon: (
      <div className="w-32 h-32 bg-gradient-to-br from-farmateca-compound to-blue-400 rounded-3xl flex items-center justify-center shadow-2xl">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Accede al contenido Premium',
    description: 'Información completa y detallada',
    icon: (
      <div className="w-32 h-32 bg-gradient-to-br from-farmateca-premium via-yellow-300 to-farmateca-premium rounded-3xl flex items-center justify-center shadow-2xl">
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
      className="fixed inset-0 z-50 bg-gradient-to-br from-farmateca-primary-dark via-farmateca-primary to-farmateca-primary-light flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Skip button */}
        {!isLastScreen && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSkip}
            className="absolute top-8 right-8 text-white/80 hover:text-white font-medium transition-colors"
          >
            Omitir
          </motion.button>
        )}

        {/* Content */}
        <div className="relative h-[500px] flex items-center justify-center">
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
                className="text-lg text-white/90 max-w-sm"
              >
                {currentScreenData.description}
              </motion.p>
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
