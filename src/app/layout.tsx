import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter as FontSans } from 'next/font/google';

import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import ClerkProvider from '@/components/ClerkProvider';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Build-A-Body',
  description: 'A place to help you build a better self',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'bodybuilding',
    'tracking',
    'gym',
    'diet',
    'data driven',
    'fitness',
    'health',
    'build-a-body',
  ],
  authors: [
    { name: 'Ana Berg', url: 'https://www.linkedin.com/in/ana-berg-dev/' },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'icon', url: '/pwa-192x192.png' },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
