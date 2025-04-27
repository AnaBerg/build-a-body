import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'build-a-body',
  description: 'App to build a body',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased')}>{children}</body>
    </html>
  );
}
