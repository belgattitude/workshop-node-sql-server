import { localApiFetcher } from '@/config/local-api-fetcher.config';
import type { ProductRepo } from '@/features/products/server/product.repo';

type Response = ReturnType<InstanceType<typeof ProductRepo>['search']>;

export const searchProducts = async () => {
  return localApiFetcher.get<Response>('products/search').json();
};
