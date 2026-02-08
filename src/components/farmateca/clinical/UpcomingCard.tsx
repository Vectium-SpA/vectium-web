'use client';

import { useState } from 'react';
import { Lock, Clock } from 'lucide-react';
import { NotifyMeDialog } from './NotifyMeDialog';

interface UpcomingCardProps {
  /** Nombre del medicamento/compuesto */
  name: string;
  /** Subtítulo (familia, laboratorio, etc.) */
  subtitle?: string;
  /** Tipo de item para el diálogo */
  type: 'compound' | 'brand';
}

/**
 * Card para items "Próximamente" - información clínica incompleta.
 * Fondo gris, opacidad reducida, badge visible, NO navegable.
 * Al click abre NotifyMeDialog.
 */
export function UpcomingCard({ name, subtitle, type }: UpcomingCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 opacity-60 cursor-pointer hover:opacity-70 transition-opacity text-left"
      >
        <div className="flex items-start gap-3">
          {/* Icono de lock/reloj */}
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
            {type === 'compound' ? (
              <Clock className="w-5 h-5 text-gray-400" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-500 dark:text-gray-400 truncate">
                {name}
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full uppercase tracking-wider flex-shrink-0">
                Pr&oacute;ximamente
              </span>
            </div>
            {subtitle && (
              <p className="text-sm text-gray-400 dark:text-gray-500 truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </button>

      <NotifyMeDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        itemName={name}
        itemType={type}
      />
    </>
  );
}
