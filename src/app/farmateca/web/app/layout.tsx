'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import { SubscriptionStatusBanner } from '@/components/farmateca/app/PremiumGuard';
import Link from 'next/link';
import { signOut } from '@/lib/farmateca/firebase/auth';
import { AuthProvider } from '@/components/farmateca/providers/AuthProvider';
import { useThemeStore } from '@/lib/farmateca/store/theme-store';
import dynamic from 'next/dynamic';

const Onboarding = dynamic(() => import('@/components/farmateca/onboarding/Onboarding'), {
  ssr: false,
});

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, userData, loading } = useAuthStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Aplicar clase 'dark' al elemento <html> según el tema
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Cleanup: remover dark al desmontar (ej: al salir de /farmateca)
    return () => {
      root.classList.remove('dark');
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (!loading && !user && !redirecting) {
      setRedirecting(true);
      router.replace('/farmateca/web/login');
    }
  }, [user, loading, router, redirecting]);

  useEffect(() => {
    // Check if onboarding has been completed
    if (user && !loading) {
      const onboardingCompleted = localStorage.getItem('onboarding_completed');
      if (!onboardingCompleted) {
        setShowOnboarding(true);
      }
    }
  }, [user, loading]);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/farmateca/web');
  };

  // Show loading spinner while checking auth or redirecting
  if (loading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-farmateca-background-light dark:bg-farmateca-background-dark">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">{redirecting ? 'Redirigiendo...' : 'Cargando...'}</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  // Show onboarding if needed
  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-farmateca-background-light dark:bg-farmateca-background-dark transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-farmateca-gray-900 border-b border-gray-200 dark:border-farmateca-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/farmateca/web/app" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-farmateca-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Farmateca</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/farmateca/web/app"
                className="text-gray-600 dark:text-gray-300 hover:text-farmateca-primary transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/farmateca/web/app/search"
                className="text-gray-600 dark:text-gray-300 hover:text-farmateca-primary transition-colors"
              >
                Búsqueda
              </Link>
              <Link
                href="/farmateca/web/app/favorites"
                className="text-gray-600 dark:text-gray-300 hover:text-farmateca-primary transition-colors"
              >
                Favoritos
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Estado de suscripción */}
              <div className="hidden sm:block">
                <SubscriptionStatusBanner />
              </div>

              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userData?.alias || userData?.nombre || user.displayName || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userData?.profesion || 'Profesional de salud'}
                </p>
              </div>

              <Link
                href="/farmateca/web/app/settings"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>

              <button
                onClick={handleSignOut}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Cerrar sesión"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </AuthProvider>
  );
}
