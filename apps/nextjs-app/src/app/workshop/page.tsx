export const dynamic = 'force-dynamic';

import { QueryResultDebugger } from '@/components/devtools/QueryResultDebugger';
import { productRepo } from '@/features/products/config/product-repo.config';
import { workshopRepo } from '@/features/workshop/workshop.config';

export default async function WorkshopRoute() {
  const workshopExamples = {
    product: productRepo.search({ searchName: 'bio', limit: 10 }),
    query1: workshopRepo.query1({ searchName: 'test', limit: 10 }),
  };

  const result = await workshopExamples.product;
  return <QueryResultDebugger result={result} />;
}
