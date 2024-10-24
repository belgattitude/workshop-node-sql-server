import type { QueryResultSuccess } from '@flowblade/source-kysely';
import type { FC } from 'react';

import type { SearchResult } from '@/features/products/server/product.repo';

type Props = {
  data: QueryResultSuccess<SearchResult>['data'];
};
export const ProductList: FC<Props> = (props) => {
  const { data } = props;
  return (
    <div className={'grid gap-5 grid-cols-4'}>
      {data.map((product) => {
        return (
          <div className={'border rounded p-5'} key={String(product.id)}>
            {product.name}
          </div>
        );
      })}
    </div>
  );
};
