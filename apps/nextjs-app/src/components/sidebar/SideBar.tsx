'use client';
/**
 * Inspired by https://x.com/shadcn/status/1842329194535272494
 */

import { RiSidebarFoldLine } from '@remixicon/react';
import { type FC, type PropsWithChildren, useState } from 'react';

import { cn } from '@/components/utils';

type Props = PropsWithChildren & {
  className?: string;
  initialCollapsed?: boolean;
};

export const SideBar: FC<Props> = (props) => {
  const { children, initialCollapsed = false, className } = props;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'relative flex flex-col gap-5 bg-indigo-600',
        'transition-all ease-in-out duration-300',
        'w-5/12 max-w-5/12 data-[collapsed=true]:w-16',
        'group',
        className
      )}
    >
      {/* side bar collapse button/icon */}
      <div className={'absolute w-full grid'}>
        <RiSidebarFoldLine
          className={[
            'mt-2 justify-self-end translate-x-[10px] text-gray-700 cursor-pointer bg-white rounded-full border-2 border-indigo-600 shadow-2xl drop-shadow-2xl size-6 p-[3px]',
            'group-data-[collapsed=true]:-rotate-180 group-data-[collapsed=true]:translate-x-[10px]',
            'transition-all ease-in-out delay-75 duration-150',
          ].join(' ')}
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        />
      </div>
      {/* sidebar content */}
      <div>{children}</div>
    </div>
  );
};
