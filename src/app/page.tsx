'use client';

import dynamic from 'next/dynamic';

// Leaflet / Mapbox harita bileşenini SSR kapalı olarak yüklüyoruz
const LeafletMap = dynamic(() => import('@/components/map/LeafletMapContainer'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-amber-500 font-mono text-sm animate-pulse">
      🗺️ İstanbul Elektronik Müzik Haritası Yükleniyor...
    </div>
  )
});

export default function Page() {
  return (
    <main className="w-screen h-screen m-0 p-0 overflow-hidden bg-slate-950 relative">
      <LeafletMap />
    </main>
  );
}