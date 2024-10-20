import type { FC, PropsWithChildren } from 'react';

import { Banner } from '@/components/banner/Banner';
import { fontInter } from '@/components/fonts/FontInter';

type Props = PropsWithChildren;
export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={`${fontInter.className} ${fontInter.variable} antialiased`}>
      <header>
        <Banner />
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};
