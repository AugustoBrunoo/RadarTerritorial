import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { HelpCircle, Crosshair, Users, MapPin, Sun, Moon } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);

  useEffect(() => {
    // Fix Leaflet's known issue where dragging into new areas leaves grey tiles 
    // because container size wasn't fully computed during initial render
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timeout);
  }, [map]);

  return null;
};

const createMarkerIcon = (status, diasAberto) => {
  let iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
  let iconRetinaUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

  if (status === "Resolvido") {
    iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
    iconRetinaUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
  } else if (diasAberto > 20) {
    iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
    iconRetinaUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
  }

  return new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export default function DashboardMap({ mapCenter, mapZoom, locateUser, filteredData }) {
  const [mapTheme, setMapTheme] = useState(() => {
    return localStorage.getItem('mapTheme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('mapTheme', mapTheme);
  }, [mapTheme]);

  const toggleTheme = () => {
    setMapTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col min-w-0 h-[450px] md:h-[550px] relative">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
        <div className="min-w-0 pr-2 flex items-start gap-2">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white mb-2">
              <MapPin className="h-5 w-5 text-red-600 shrink-0" /> Mapa de Problemas
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Clique nos círculos para ver detalhes do território.
            </p>
          </div>
          <div className="self-start mt-1 shrink-0">
            <TooltipWrapper posClass="tooltip-bottom-right" text="Disposição geográfica das ocorrências. Agrupa problemas por proximidade para identificar focos de desassistência urbana.">
              <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
            </TooltipWrapper>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-start">
          <button 
            onClick={toggleTheme} 
            title="Alternar tema do mapa" 
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 rounded-xl transition-colors shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-700"
          >
            {mapTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={locateUser} title="Ir para minha localização" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 rounded-xl transition-colors shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-700">
            <Crosshair className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={`w-full flex-grow rounded-2xl overflow-hidden shadow-inner border border-zinc-200 dark:border-zinc-700 relative z-0 ${mapTheme === 'dark' ? 'map-dark-theme' : ''}`}>
        <style>
          {`
            .map-dark-theme .leaflet-layer,
            .map-dark-theme .leaflet-control-zoom-in,
            .map-dark-theme .leaflet-control-zoom-out,
            .map-dark-theme .leaflet-control-attribution {
              filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
            }
          `}
        </style>
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          className="h-full w-full"
        >
          <MapUpdater center={mapCenter} zoom={mapZoom} />
          <TileLayer 
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; Google Maps'
            maxZoom={19}
          />
          <MarkerClusterGroup chunkedLoading maxClusterRadius={40}>
            {filteredData.map(d => (
              <Marker key={d.id} position={[d.lat, d.lng]} icon={createMarkerIcon(d.status, d.diasAberto)}>
                <Popup className="premium-popup">
                  <div className="min-w-[240px] font-sans">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <strong className="block text-sm leading-tight font-bold text-zinc-900">{d.rua}</strong>
                        <span className="text-[11px] font-medium text-zinc-500 block mt-0.5">{d.bairro}</span>
                      </div>
                      <span className={`shrink-0 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'Resolvido' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                        (d.diasAberto > 20 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-red-100 text-red-700 border border-red-200')
                      }`}>
                        {d.status === 'Resolvido' ? 'Resolvido' : (d.diasAberto > 20 ? 'Atrasado' : 'Aberto')}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-zinc-500 font-medium">Categoria</span>
                        <span className="text-zinc-900 font-bold max-w-[120px] truncate text-right">{d.category}</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-zinc-500 font-medium">Órgão</span>
                        <span className="text-zinc-900 font-bold max-w-[120px] truncate text-right" title={d.operador}>{d.operador}</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-zinc-500 font-medium">Tempo Útil</span>
                        <span className="text-zinc-900 font-bold">{d.diasAberto} dias</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-blue-600 font-bold text-[11px] flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" /> {d.apoios} apoiadores
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
