'use server';

import type { FC } from 'react';

import { QueryResultDebugger } from '@/components/devtools/QueryResultDebugger';
import { productRepo } from '@/features/products/config/product-repo.config';
import { workshopRepo } from '@/features/workshop/workshop.config';

const workshopExamples = {
  example: () => productRepo.search({ searchName: 'bio', limit: 10 }),
  getStarter: () => workshopRepo.getStarter({ limit: 10 }),
  getBrands: () => workshopRepo.getBrands({ limit: 10 }),
  getProducts: () => workshopRepo.getProducts({ searchName: 'bio', limit: 10 }),
  getAdvanced: () => workshopRepo.getAdvanced({ limit: 100 }),
};

export const WorkshopPage: FC = async () => {
  const result = await workshopExamples.getAdvanced();
  return <QueryResultDebugger result={result} />;
};
