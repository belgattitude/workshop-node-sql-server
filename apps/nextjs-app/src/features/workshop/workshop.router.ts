import { Hono } from 'hono';

import { workshopRepo } from '@/features/workshop/workshop.config';
import { WorkshopRepo } from '@/features/workshop/workshop.repo';
import { zodOpenApi } from '@/features/workshop/workshop.utils';

const app = new Hono();

const validators = WorkshopRepo.validators;

app.get('/start', zodOpenApi(validators.getStarter), async (c) => {
  const result = await workshopRepo.getStarter(c.req.valid('query'));
  return c.json(result);
});

app.get('/brands', zodOpenApi(validators.getBrands), async (c) => {
  return c.json(await workshopRepo.getBrands(c.req.valid('query')));
});

app.get('/products', zodOpenApi(validators.getProducts), async (c) => {
  return c.json(await workshopRepo.getProducts(c.req.valid('query')));
});

app.get('/advanced', zodOpenApi(validators.getAdvanced), async (c) => {
  return c.json(await workshopRepo.getAdvanced(c.req.valid('query')));
});

export { app as workshopRouter };
