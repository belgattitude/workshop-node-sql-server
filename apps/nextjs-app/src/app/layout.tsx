import '../styles/globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { MainLayout } from '@/components/layout/MainLayout';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';
import { ReduxStoreProvider } from '@/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Workshop node sql server',
  description:
    'Example for https://github.com/belgattitude/workshop-node-sql-server',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxStoreProvider>
          <ReactQueryClientProvider>
            <MainLayout>{children}</MainLayout>
          </ReactQueryClientProvider>
        </ReduxStoreProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
