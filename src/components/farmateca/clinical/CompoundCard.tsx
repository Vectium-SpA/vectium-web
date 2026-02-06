'use client';

import Link from 'next/link';
import { CompoundSummary } from '@/lib/farmateca/types';
import { FavoriteButton } from './FavoriteButton';

interface CompoundCardProps {
  compound: CompoundSummary;
}

export function CompoundCard({ compound }: CompoundCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-farmateca-primary hover:shadow-md transition-all duration-200 relative group">
      <Link href={`/app/compound/${compound.idPA}`} className="block">
        <div className="flex items-start gap-3">
          {/* Icono */}
          <div className="w-10 h-10 bg-farmateca-compound/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-farmateca-compound"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{compound.pa}</h3>
              {compound.acceso === 'P' && (
                <span className="px-1.5 py-0.5 text-xs font-medium bg-farmateca-premium/20 text-farmateca-premium-dark rounded">
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{compound.familia}</p>
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
        <FavoriteButton itemId={compound.idPA} itemType="compound" size="sm" />
      </div>
    </div>
  );
}
