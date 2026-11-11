export const vectiumTheme = {
  colors: {
    black: '#1A1A1A',
    gray: {
      900: '#2A2A2A',
      800: '#3A3A3A',
      700: '#4A4A4A',
      600: '#6B6B6B',
      500: '#8C8C8C',
      400: '#A0A0A0',
      300: '#B8B8B8',
      200: '#D0D0D0',
      100: '#E8E8E8',
      50: '#F5F5F5',
    },
    white: '#FFFFFF',
    // Paleta de marca 2026-11 (acero y grafito); el turquesa viejo se retiró.
    accent: '#3B5A73',
    accentDark: '#1C2024',
  },
  navLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Soluciones', href: '/soluciones' },
    { label: 'Cómo trabajamos', href: '/como-trabajamos' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ],
  company: {
    name: 'Vectium SpA',
    tagline: 'Software a la medida de tu negocio',
    email: 'contacto@vectium.cl',
    location: 'Las Condes, Región Metropolitana · operamos desde la Región de Atacama',
  },
} as const;
