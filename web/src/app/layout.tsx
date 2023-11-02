import type { Metadata } from 'next';
import { Merriweather_Sans } from 'next/font/google';

import { Navbar } from '@/components/Navbar';

import './globals.css';

const inter = Merriweather_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Webstreams',
  description: 'Consuming data with webstreams',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
