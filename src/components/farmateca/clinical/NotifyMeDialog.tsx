'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

interface NotifyMeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: 'compound' | 'brand';
}

/**
 * Diálogo modal para items "Próximamente".
 * Muestra información y opción de notificación futura.
 */
export function NotifyMeDialog({
  isOpen,
  onClose,
  itemName,
}: NotifyMeDialogProps) {
  const handleNotify = () => {
    // TODO: Implementar registro de notificación (API/Firestore)
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              {/* Icono */}
              <div className="w-16 h-16 bg-farmateca-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-farmateca-primary" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Pr&oacute;ximamente
              </h3>

              {/* Mensaje */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                La informaci&oacute;n cl&iacute;nica de{' '}
                <strong className="text-gray-900 dark:text-white">{itemName}</strong>{' '}
                estar&aacute; disponible pronto. Estamos completando su informaci&oacute;n cl&iacute;nica.
              </p>

              {/* Botones */}
              <div className="space-y-2">
                <button
                  onClick={handleNotify}
                  className="w-full py-3 bg-farmateca-primary text-white font-semibold rounded-xl hover:bg-farmateca-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Notificarme
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
