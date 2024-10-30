import { localApiFetcher } from '@/config/local-api-fetcher.config';
import type { ProductRepoSearchData } from '@/features/products/server/product.repo';

export const searchProducts = async () => {
  return localApiFetcher.get<ProductRepoSearchData>('/products/search').json();
};
