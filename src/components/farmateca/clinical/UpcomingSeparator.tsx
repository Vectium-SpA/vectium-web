'use client';

import { Clock } from 'lucide-react';

/**
 * Separador visual entre resultados disponibles y "Próximamente".
 * Nivel 3 del algoritmo de ordenamiento de búsqueda.
 */
export function UpcomingSeparator() {
  return (
    <div className="flex items-center gap-3 py-4 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        <Clock className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Pr&oacute;ximamente
        </span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
    </div>
  );
}
