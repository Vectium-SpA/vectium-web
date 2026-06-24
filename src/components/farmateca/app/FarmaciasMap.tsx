'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import {
  type Farmacia,
  tipoEnum,
  tieneUbicacion,
  TIPO_COLOR,
  TIPO_LABEL,
  mapsUrl,
} from '@/lib/farmateca/farmacias';

// Centro de Chile (Santiago) — igual que la app móvil.
const CENTRO_CHILE: [number, number] = [-33.45, -70.65];

export default function FarmaciasMap({ farmacias }: { farmacias: Farmacia[] }) {
  const conUbicacion = farmacias.filter(tieneUbicacion);

  return (
    <MapContainer
      center={CENTRO_CHILE}
      zoom={5}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {conUbicacion.map((f, i) => {
        const tipo = tipoEnum(f.tipo);
        const color = TIPO_COLOR[tipo];
        return (
          <CircleMarker
            key={`${f.nombre}-${f.lat}-${f.lng}-${i}`}
            center={[f.lat as number, f.lng as number]}
            radius={6}
            pathOptions={{
              color: '#ffffff',
              weight: 1.5,
              fillColor: color,
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold text-gray-900">{f.nombre}</p>
                <span
                  className="inline-block mt-1 mb-1 px-2 py-0.5 rounded-full text-[11px] font-medium text-white"
                  style={{ backgroundColor: color }}
                >
                  {TIPO_LABEL[tipo]}
                </span>
                <p className="text-xs text-gray-600">{f.direccion}</p>
                <p className="text-xs text-gray-500">
                  {f.comuna}, {f.region}
                </p>
                <a
                  href={mapsUrl(f)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-semibold text-farmateca-primary hover:underline"
                >
                  Abrir en Maps →
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
