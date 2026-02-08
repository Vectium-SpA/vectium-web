import { PricingSection } from '@/components/farmateca/marketing/PricingSection';
import { FarmatecaFooter } from '@/components/farmateca/marketing/Footer';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Precios - Farmateca',
  description: 'Planes y precios de Farmateca. Plan Free, Mensual $3.790 CLP y Anual $34.990 CLP.',
  openGraph: {
    title: 'Precios - Farmateca | Vectium SpA',
    description: 'Comienza gratis y desbloquea funciones premium cuando lo necesites.',
    url: 'https://vectium.cl/farmateca/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 pt-28">
        <div className="text-center px-6 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Precios Simples y Transparentes
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Comienza con un trial de 7 dias completamente gratis.
          </p>
        </div>
        <PricingSection />
      </div>
      <FarmatecaFooter />
    </>
  );
}
