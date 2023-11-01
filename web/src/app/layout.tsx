import type { Metadata } from 'next';
import { Merriweather_Sans } from 'next/font/google';

import './globals.css';
import { Navbar } from '@/components/Navbar';

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
