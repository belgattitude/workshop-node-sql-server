import { localApiFetcher } from '@/config/local-api-fetcher.config';
import type { BrandRepoSearchData } from '@/features/products/server/brand.repo';

export const searchBrands = async () => {
  return localApiFetcher.get<BrandRepoSearchData>('/brands/search').json();
};
