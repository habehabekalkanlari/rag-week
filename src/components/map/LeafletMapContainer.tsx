'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet ikon düzeltmesi
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ISTANBUL_CENTER: [number, number] = [41.0082, 28.9784];

export default function LeafletMapContainer() {
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
        else if (data && Array.isArray(data.events)) setEvents(data.events);
        else setEvents([]);
      })
      .catch(() => setEvents([]));
  }, []);

  const filteredEvents = events.filter((e) => {
    const titleMatch = e.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const venueMatch = e.venues?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || venueMatch;
  });

  return (
    <div className="w-screen h-screen flex flex-row bg-zinc-950 overflow-hidden relative">
      {/* Sol / Yan Panel - Etkinlik Bul & Liste */}
      <div className="w-80 h-full bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col z-20 shadow-2xl">
        <h2 className="text-amber-500 font-bold text-lg mb-3 flex items-center gap-2">
          🎧 İstanbul Elektronik Müzik
        </h2>
        
        <input
          type="text"
          placeholder="Etkinlik veya mekan ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 focus:outline-none focus:border-amber-500 text-sm mb-4"
        />

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((e, idx) => (
              <div key={e.id || idx} className="p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-zinc-800/80 transition text-sm cursor-pointer">
                <div className="font-semibold text-zinc-200">{e.title || 'İsimsiz Etkinlik'}</div>
                <div className="text-xs text-zinc-400 mt-1">{e.venues?.name || 'Mekan Bilgisi Yok'}</div>
              </div>
            ))
          ) : (
            <div className="text-xs text-zinc-500 text-center py-4">Etkinlik bulunamadı.</div>
          )}
        </div>
      </div>

      {/* Harita Alanı - Tam Ekran Yan Taraf */}
      <div className="flex-1 h-full relative z-10">
        <MapContainer
          center={ISTANBUL_CENTER}
          zoom={12}
          minZoom={10}
          maxZoom={18}
          style={{ width: '100%', height: '100%', background: '#09090b' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {Array.isArray(filteredEvents) &&
            filteredEvents.map((event, index) => {
              const lat = event?.venues?.lat || event?.lat;
              const lng = event?.venues?.lng || event?.lng;

              if (!lat || !lng) return null;

              return (
                <Marker key={event.id || index} position={[lat, lng]}>
                  <Popup>
                    <div className="text-zinc-900 p-1">
                      <h4 className="font-bold text-sm">{event.title || 'Etkinlik'}</h4>
                      <p className="text-xs text-zinc-600">{event?.venues?.name || 'Mekan'}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
}