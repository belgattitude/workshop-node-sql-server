import type { InferQResult } from '@flowblade/core';

import type { BrandRepo } from '@/features/products/server/brand.repo';
import type { ProductRepo } from '@/features/products/server/product.repo';

export type BrandSearchResult = InferQResult<ReturnType<BrandRepo['search']>>;

export type ProductSearchResult = InferQResult<
  ReturnType<ProductRepo['search']>
>;
