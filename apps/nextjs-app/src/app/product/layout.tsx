// import 'primereact/resources/themes/soho-light/theme.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

import type { ReactNode } from 'react';

import { PrimeReactTailwindProvider } from '@/providers/PrimeReactTailwindProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <PrimeReactTailwindProvider>{children}</PrimeReactTailwindProvider>;
}