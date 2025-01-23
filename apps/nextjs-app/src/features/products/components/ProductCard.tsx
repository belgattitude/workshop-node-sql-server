import type { InferQResult } from '@flowblade/core';
import type { FC } from 'react';

import { cn } from '@/components/utils';
import type { ProductRepo } from '@/features/products/server/product.repo';

type Props = {
  className?: string;
  product: InferQResult<ReturnType<ProductRepo['search']>>[number];
};
export const ProductCard: FC<Props> = (props) => {
  const { product, className } = props;

  return (
    <div
      className={cn('max-w-sm overflow-hidden rounded-sm shadow-lg', className)}
    >
      <div className="aspect-h-9 aspect-w-16 lg:aspect-none h-40">
        <img
          className="size-full p-10 object-cover object-center"
          src={
            'https://images.openfoodfacts.org/images/products/325/149/033/2080/front_fr.121.400.jpg'
          }
          alt={product.name}
        />
      </div>
      <article className="prose px-6 py-4">
        <div className="mb-2 text-xl font-bold">{product.name}</div>
        <p className="text-indigo-600">{product.brand_name}</p>
        <p className="line-clamp-4 text-base text-gray-700"></p>
      </article>
    </div>
  );
};
