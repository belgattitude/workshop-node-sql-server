import { Hono } from 'hono';
import { sql } from 'kysely';

import { workshopRepo } from '@/features/workshop/workshop.config';
import { WorkshopRepo } from '@/features/workshop/workshop.repo';
import { zodOpenApi } from '@/features/workshop/workshop-utils';
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

app.get('/query1', zodOpenApi(validators.query1), async (c) => {
  const rows = await workshopRepo.query1(c.req.valid('query'));
  return c.json(rows);
});

app.get('/query2', zodOpenApi(validators.query2), async (c) => {
  const rows = await workshopRepo.query2(c.req.valid('query'));
  return c.json(rows);
});

export { app as workshopRouter };
