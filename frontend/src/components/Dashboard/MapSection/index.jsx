import React from 'react';
import MapLegend from '../MapLegend';
import DashboardMap from '../DashboardMap';

export default function MapSection({ mapCenter, mapZoom, locateUser, filteredData }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DashboardMap 
        mapCenter={mapCenter} 
        mapZoom={mapZoom} 
        locateUser={locateUser} 
        filteredData={filteredData} 
      />
      <MapLegend />
    </section>
  );
}
