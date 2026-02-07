'use client';

import Link from 'next/link';
import { BrandSummary } from '@/lib/farmateca/types';
import { FavoriteButton } from './FavoriteButton';

interface BrandCardProps {
  brand: BrandSummary;
}

export function BrandCard({ brand }: BrandCardProps) {
  const isGeneric = brand.tipoM.toLowerCase().includes('genérico');

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-farmateca-primary hover:shadow-md transition-all duration-200 relative group">
      <Link href={`/farmateca/web/app/brand/${brand.idMA}`} className="block">
        <div className="flex items-start gap-3">
          {/* Icono */}
          <div className="w-10 h-10 bg-farmateca-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-farmateca-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900">{brand.ma}</h3>
              <span
                className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                  isGeneric
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-farmateca-primary/10 text-farmateca-primary-dark'
                }`}
              >
                {isGeneric ? 'Genérico' : 'Comercial'}
              </span>
              <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                {brand.viaM}
              </span>
            </div>
            <p className="text-sm text-gray-500">{brand.paM}</p>
            <p className="text-xs text-gray-400 mt-1">{brand.labM}</p>
          </div>

          {/* Flecha */}
          <div className="flex-shrink-0 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>

      {/* Botón de favoritos */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <FavoriteButton itemId={brand.idMA} itemType="brand" size="sm" />
      </div>
    </div>
  );
}
