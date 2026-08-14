import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { HelpCircle, Crosshair, Users, Layers } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

// Map Markers logic
const createMarkerIcon = (status, diasAberto) => {
  let pinClass = "pin-ativo";
  if (status === "Resolvido") pinClass = "pin-resolvido"; 
  else if (diasAberto > 20) pinClass = "pin-alerta";
  
  return L.divIcon({ className: pinClass, iconSize: null });
};

export default function MapSection({ mapCenter, mapZoom, locateUser, isDarkMode, filteredData }) {


  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col min-w-0 h-[350px] md:h-[450px] relative">
        <div className="flex justify-between items-start mb-4">
          <div className="min-w-0 pr-2 flex items-center gap-2">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white truncate">Mapa de Problemas</h2>
              <p className="text-xs font-medium text-zinc-500 truncate">Clique nos círculos para ver detalhes do território.</p>
            </div>
            <div className="self-start mt-1">
              <TooltipWrapper posClass="tooltip-bottom-right" text="Disposição geográfica das ocorrências. Agrupa problemas por proximidade para identificar focos de desassistência urbana.">
                <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
              </TooltipWrapper>
            </div>
          </div>
          <button onClick={locateUser} title="Ir para minha localização" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 rounded-xl transition-colors shrink-0">
            <Crosshair className="h-4 w-4" />
          </button>
        </div>
        
        <div className="w-full flex-grow rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 relative z-10">
          <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full">
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <TileLayer 
              url={isDarkMode ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'} 
              maxZoom={19}
            />
            <MarkerClusterGroup chunkedLoading maxClusterRadius={40}>
              {filteredData.map(d => (
                <Marker key={d.id} position={[d.lat, d.lng]} icon={createMarkerIcon(d.status, d.diasAberto)}>
                  <Popup>
                    <div className="text-sm">
                      <strong className="block text-base mb-1">{d.rua}</strong>
                      <span className="text-xs text-zinc-500 mb-2 block">{d.bairro}</span>
                      <p><strong>Tipo:</strong> <span className="text-red-500">{d.category}</span></p>
                      <p><strong>Quem resolve:</strong> {d.operador}</p>
                      <p><strong>Situação:</strong> {d.status} ({d.diasAberto} dias)</p>
                      <p className="text-blue-500 font-bold mt-1"><Users className="h-3 w-3 inline" /> {d.apoios} moradores afetados</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between min-w-0 h-auto lg:h-[450px] relative">
        <div className="absolute top-6 right-6">
          <TooltipWrapper text="Informativo visual detalhando a gravidade temporal de cada alfinete inserido no mapeamento territorial.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div>
          <h3 className="text-zinc-900 dark:text-white font-bold text-base mb-5 flex items-center gap-2"><Layers className="h-4 w-4 text-red-500" /> Legenda do Mapa</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900 block shrink-0"></span>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">Aguardando Conserto</p>
                <p className="text-[11px] text-zinc-500">A prefeitura/órgão ainda não resolveu.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-zinc-900 block shrink-0"></span>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">Alerta de Atraso</p>
                <p className="text-[11px] text-zinc-500">Mais de 20 dias parado.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 block shrink-0"></span>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">Resolvido</p>
                <p className="text-[11px] text-zinc-500">Conserto confirmado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
