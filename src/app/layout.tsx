import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rag Week | Etkinlik Haritası',
  description: 'İstanbul elektronik müzik ve etkinlik haritası',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-zinc-950 text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}