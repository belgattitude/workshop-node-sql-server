import type { InferAsyncQueryResultData } from '@flowblade/source-kysely';
import type { FC } from 'react';

import type { ProductRepo } from '@/features/products/server/product.repo';

type Props = {
  data: InferAsyncQueryResultData<
    ReturnType<InstanceType<typeof ProductRepo>['search']>
  >;
};
export const ProductList: FC<Props> = (props) => {
  const { data } = props;
  return (
    <div className={'grid gap-5 grid-cols-4'}>
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
