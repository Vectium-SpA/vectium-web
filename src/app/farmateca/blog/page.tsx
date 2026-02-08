import { FarmatecaFooter } from '@/components/farmateca/marketing/Footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Farmateca',
  description: 'Noticias, actualizaciones y articulos sobre farmacologia clinica.',
  openGraph: {
    title: 'Blog - Farmateca | Vectium SpA',
    url: 'https://vectium.cl/farmateca/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <div className="py-20 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Noticias, actualizaciones y articulos sobre farmacologia clinica.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Proximamente</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Articulos, guias clinicas y actualizaciones de la plataforma. Estamos preparando contenido de calidad para profesionales de la salud.
            </p>
          </div>
        </div>
      </div>
      <FarmatecaFooter />
    </>
  );
}
