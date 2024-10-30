import { localApiFetcher } from '@/config/local-api-fetcher.config';
import type { ProductRepoSearchData } from '@/features/products/server/product.repo';

export const searchBrands = async () => {
  return localApiFetcher.get<ProductRepoSearchData>('/brands/search').json();
};
