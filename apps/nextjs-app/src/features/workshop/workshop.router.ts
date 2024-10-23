import { Hono } from 'hono';
import { sql } from 'kysely';

import { workshopRepo } from '@/features/workshop/workshop.config';
import { WorkshopRepo } from '@/features/workshop/workshop.repo';
import { zodOpenApi } from '@/features/workshop/workshop.utils';
import { dbKyselySqlServer } from '@/server/config/db.kysely-sqlserver.config';

const app = new Hono();

const validators = WorkshopRepo.validators;

app.get('/query0', async (c) => {
  const sqlRaw = sql` 
    SELECT TOP 10 b.id, b.name
    FROM [common].[brand] as b
  `;
  const result = await sqlRaw.execute(dbKyselySqlServer);
  return c.json({
    data: result.rows,
  });
});

app.get('/brands', zodOpenApi(validators.getBrands), async (c) => {
  const rows = await workshopRepo.getBrands(c.req.valid('query'));
  return c.json(rows);
});

app.get('/products', zodOpenApi(validators.getProducts), async (c) => {
  const rows = await workshopRepo.query2(c.req.valid('query'));
  return c.json(rows);
});

export { app as workshopRouter };
