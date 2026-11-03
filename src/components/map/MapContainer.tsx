'use client';

import dynamic from 'next/dynamic';

// Eğer harita bileşenin client-side (tarayıcı tarafında) çalışıyorsa SSR'ı kapatarak buraya dahil edebilirsin:
// const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  return (
    <main className="w-screen h-screen m-0 p-0 overflow-hidden bg-slate-950">
      {/* Orijinal harita bileşenini buraya çağırıyoruz */}
      {/* <MapComponent /> */}
    </main>
  );
}