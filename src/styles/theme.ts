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
    accent: '#00A9A5',
    accentDark: '#008B87',
  },
  navLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Soluciones', href: '/soluciones' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ],
  company: {
    name: 'Vectium SpA',
    tagline: 'Innovación Tecnológica para el Sector Salud',
    email: 'contacto@vectium.cl',
    location: 'Chile',
  },
} as const;
