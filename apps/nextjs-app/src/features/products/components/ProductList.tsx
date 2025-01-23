import type { InferQResult } from '@flowblade/core';
import type { FC } from 'react';

import { cn } from '@/components/utils';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { ProductRepo } from '@/features/products/server/product.repo';

type Props = {
  className?: string;
  data: InferQResult<ReturnType<ProductRepo['search']>>;
};
export const ProductList: FC<Props> = (props) => {
  const { data, className } = props;
  return (
    <div className={cn('grid gap-5 grid-cols-3', className)}>
      {data.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
