'use client';

import type { QueryResultSuccess } from '@flowblade/source-kysely';

import { $api } from '@/config/openapi-react-query.config';
import { ProductList } from '@/features/products/components/ProductList';
import type { SearchResult } from '@/features/products/server/product.repo';

export const ProductSearchPage = () => {
  const { data, isPending, error } = $api.useQuery(
    'get',
    '/api/products/search',
    {
      query: {
        query: 'bio',
        limit: 10,
      },
    }
  );

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const products =
    // eslint-disable-next-line sonarjs/no-in-misuse
    'data' in data
      ? (data as unknown as QueryResultSuccess<SearchResult>).data
      : null;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="border-1 flex flex-col items-center gap-5 rounded-md p-5 shadow-lg">
          {products && <ProductList data={products} />}
        </div>
      </div>
    </>
  );
};
