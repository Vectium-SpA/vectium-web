'use client';

import { useState, useEffect, useCallback } from 'react';

export type FontFamily = 'Inter' | 'Montserrat' | 'Open Sans' | 'Lato' | 'Poppins' | 'Roboto';

export const FONT_OPTIONS: { value: FontFamily; label: string; fallback: string }[] = [
  { value: 'Inter', label: 'Inter', fallback: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { value: 'Montserrat', label: 'Montserrat', fallback: "'Montserrat', -apple-system, sans-serif" },
  { value: 'Open Sans', label: 'Open Sans', fallback: "'Open Sans', -apple-system, sans-serif" },
  { value: 'Lato', label: 'Lato', fallback: "'Lato', -apple-system, sans-serif" },
  { value: 'Poppins', label: 'Poppins', fallback: "'Poppins', -apple-system, sans-serif" },
  { value: 'Roboto', label: 'Roboto', fallback: "'Roboto', -apple-system, sans-serif" },
];

const FONT_SIZE_MIN = 14;
const FONT_SIZE_MAX = 20;
const FONT_SIZE_DEFAULT = 16;
const FONT_FAMILY_DEFAULT: FontFamily = 'Inter';

const STORAGE_KEY_FONT = 'farmateca_font_family';
const STORAGE_KEY_SIZE = 'farmateca_font_size';

function getStoredFontFamily(): FontFamily {
  if (typeof window === 'undefined') return FONT_FAMILY_DEFAULT;
  const stored = localStorage.getItem(STORAGE_KEY_FONT);
  if (stored && FONT_OPTIONS.some((f) => f.value === stored)) {
    return stored as FontFamily;
  }
  return FONT_FAMILY_DEFAULT;
}

function getStoredFontSize(): number {
  if (typeof window === 'undefined') return FONT_SIZE_DEFAULT;
  const stored = localStorage.getItem(STORAGE_KEY_SIZE);
  if (stored) {
    const parsed = parseInt(stored, 10);
    if (!isNaN(parsed) && parsed >= FONT_SIZE_MIN && parsed <= FONT_SIZE_MAX) {
      return parsed;
    }
  }
  return FONT_SIZE_DEFAULT;
}

export function useTypography() {
  const [fontFamily, setFontFamilyState] = useState<FontFamily>(FONT_FAMILY_DEFAULT);
  const [fontSize, setFontSizeState] = useState<number>(FONT_SIZE_DEFAULT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar valores del localStorage al montar
  useEffect(() => {
    setFontFamilyState(getStoredFontFamily());
    setFontSizeState(getStoredFontSize());
    setIsLoaded(true);
  }, []);

  // Aplicar CSS variables y persistir
  useEffect(() => {
    if (!isLoaded) return;

    const fontOption = FONT_OPTIONS.find((f) => f.value === fontFamily);
    const fallback = fontOption?.fallback || FONT_OPTIONS[0].fallback;

    document.documentElement.style.setProperty('--farmateca-font-family', fallback);
    document.documentElement.style.setProperty('--farmateca-font-size', `${fontSize}px`);
    localStorage.setItem(STORAGE_KEY_FONT, fontFamily);
    localStorage.setItem(STORAGE_KEY_SIZE, fontSize.toString());
  }, [fontFamily, fontSize, isLoaded]);

  const setFontFamily = useCallback((family: FontFamily) => {
    setFontFamilyState(family);
  }, []);

  const setFontSize = useCallback((size: number) => {
    const clamped = Math.max(FONT_SIZE_MIN, Math.min(FONT_SIZE_MAX, size));
    setFontSizeState(clamped);
  }, []);

  const resetTypography = useCallback(() => {
    setFontFamilyState(FONT_FAMILY_DEFAULT);
    setFontSizeState(FONT_SIZE_DEFAULT);
  }, []);

  return {
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    resetTypography,
    isLoaded,
    fontSizeMin: FONT_SIZE_MIN,
    fontSizeMax: FONT_SIZE_MAX,
    fontSizeDefault: FONT_SIZE_DEFAULT,
    fontFamilyDefault: FONT_FAMILY_DEFAULT,
  };
}
