'use client';

import type { QueryResultSuccess } from '@flowblade/source-kysely';
import { useQuery } from '@tanstack/react-query';

import { SideBar } from '@/components/sidebar/SideBar';
import { searchProducts } from '@/features/products/api/search-products';
import { BrandMultiSelect } from '@/features/products/components/BrandMultiSelect';
import { ProductList } from '@/features/products/components/ProductList';
import type { ProductRepoSearchResult } from '@/features/products/server/product.repo';

export const ProductSearchPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['products/search'],
    queryFn: () => {
      return searchProducts();
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const products =
    data?.success === true
      ? // isQueryResultSuccess(data)
        (data as unknown as QueryResultSuccess<ProductRepoSearchResult>).data
      : null;

  return (
    <>
      <div className="flex">
        <SideBar className={'w-5/12'}>
          <div className={'p-5 max-w-full flex'}>
            <BrandMultiSelect />
          </div>
        </SideBar>
        <div className="border-1 flex flex-col items-center gap-5 rounded-md p-5 shadow-lg">
          {products && <ProductList data={products} />}
        </div>
      </div>
    </>
  );
};
