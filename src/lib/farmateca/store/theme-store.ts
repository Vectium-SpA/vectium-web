'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

/**
 * Store de tema con persistencia en localStorage.
 * Controla el modo oscuro de la aplicación Farmateca.
 *
 * Uso:
 *   const { isDarkMode, toggleTheme } = useThemeStore();
 *   const isDark = useIsDarkMode();
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setTheme: (isDark: boolean) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'farmateca-theme',
    }
  )
);

/**
 * Hook selector para obtener solo el estado de dark mode.
 * Optimiza re-renders al no suscribirse a cambios de acciones.
 */
export const useIsDarkMode = () => useThemeStore((state) => state.isDarkMode);
