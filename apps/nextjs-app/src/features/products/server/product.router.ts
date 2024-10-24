import { Hono } from 'hono';
import { openApi } from 'hono-zod-openapi';

import { productRepo } from '@/features/products/config/product-repo.config';
import { ProductRepo } from '@/features/products/server/product.repo';
import { zQueryResult } from '@/features/workshop/workshop.utils';

const app = new Hono();

const validators = ProductRepo.validators;

app.get(
  '/search',
  openApi({
    request: {
      query: validators.search.params,
    },
    responses: {
      200: zQueryResult(validators.search.result),
    },
  }),
  async (c) => {
    const rows = await productRepo.search(c.req.valid('query'));
    return c.json(rows);
  }
);

export { app as productRouter };
