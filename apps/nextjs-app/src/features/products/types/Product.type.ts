import type { InferAsyncQueryResultData } from '@flowblade/source-kysely';

import type { BrandRepo } from '@/features/products/server/brand.repo';
import type { ProductRepo } from '@/features/products/server/product.repo';

export type BrandSearchResult = InferAsyncQueryResultData<
  ReturnType<BrandRepo['search']>
>;

export type ProductSearchResult = InferAsyncQueryResultData<
  ReturnType<ProductRepo['search']>
>;
