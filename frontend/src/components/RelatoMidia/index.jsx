import React from 'react';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker in React
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function RelatoMidia({ report, locationStr }) {
  const hasCoordinates = report.latitude && report.longitude;

  return (
    <section className="space-y-6">
      {report.imagem_url ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white mb-4">
            <ImageIcon className="h-5 w-5 text-zinc-400" /> Foto do Local
          </h2>
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative group">
            <img 
              src={report.imagem_url}
              alt="Foto do problema"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </div>
      ) : null}

      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white mb-2">
          <MapPin className="h-5 w-5 text-red-600" /> Localização Exata
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          {locationStr}
        </p>

        {hasCoordinates ? (
          <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner border border-zinc-200 dark:border-zinc-700 relative z-0">
            <MapContainer 
              center={[report.latitude, report.longitude]} 
              zoom={15} 
              scrollWheelZoom={false} 
              style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
              <TileLayer
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                attribution='&copy; Google Maps'
              />
              <Marker position={[report.latitude, report.longitude]} icon={customIcon} />
            </MapContainer>
          </div>
        ) : (
          <div className="w-full h-64 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <div className="flex flex-col items-center opacity-50">
              <MapPin className="h-10 w-10 text-zinc-400 mb-2" />
              <span className="font-bold text-sm text-zinc-500">Coordenadas não disponíveis neste relato</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
