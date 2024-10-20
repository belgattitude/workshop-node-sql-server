'use client';

import dynamic from 'next/dynamic';

export const DynamicShikiCodeEditor = dynamic(
  () => import('./ShikiCodeEditor').then((mod) => mod.ShikiCodeEditor),
  {
    ssr: false,
  }
);
