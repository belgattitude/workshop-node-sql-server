import type { InferAsyncQueryResultData } from '@flowblade/source-kysely';
import type { FC } from 'react';

import { cn } from '@/components/utils';
import type { ProductRepo } from '@/features/products/server/product.repo';

type Props = {
  className?: string;
  data: InferAsyncQueryResultData<ReturnType<ProductRepo['search']>>;
};
export const ProductList: FC<Props> = (props) => {
  const { data, className } = props;
  return (
    <div className={cn('grid gap-5 grid-cols-3', className)}>
      {data.map((product) => {
        return (
          <div className={'border rounded p-5'} key={String(product.id)}>
            {product.name}
            <div className={'text-xs border rounded text-white bg-black'}>
              {product.brand_name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
