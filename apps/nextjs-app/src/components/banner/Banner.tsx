import type { FC } from 'react';

import { IconBell } from '@/components/icons/IconBell';
import { IconClose } from '@/components/icons/IconClose';
import { cn } from '@/components/utils';

type Props = {
  className?: string;
};

export const Banner: FC<Props> = (props) => {
  const { className } = props;
  return (
    <div className={cn('bg-indigo-600', className)}>
      <div className="mx-auto max-w-7xl p-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <IconBell className="size-6 text-white" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Big news! We're excited to announce a brand new product.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="@/components/banner/Banner#"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-xs hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
          <div className="order-2 shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <IconClose className="size-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
