import { Hono } from 'hono';
import { openApi } from 'hono-zod-openapi';

import { brandRepo } from '@/features/products/config/product-repo.config';
import { BrandRepo } from '@/features/products/server/brand.repo';
import { zQueryResult } from '@/features/workshop/workshop.utils';

const app = new Hono();

const validators = BrandRepo.validators;

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
    const rows = await brandRepo.search(c.req.valid('query'));
    return c.json(rows);
  }
);

export { app as brandRouter };
