import type { BrandRepo } from '@/features/products/server/brand.repo';

type Response = Awaited<ReturnType<BrandRepo['search']>>;
const tempResponse = {
  data: [
    {
      name: 'Nestlé',
      id: 1,
    },
  ],
} as Response;

export const fetchAllBrands = async () => {
  return Promise.resolve(tempResponse).then((result) => {
    if (result.error !== undefined) {
      throw new Error(result.error.message);
    }
    return result.data;
  });
};
