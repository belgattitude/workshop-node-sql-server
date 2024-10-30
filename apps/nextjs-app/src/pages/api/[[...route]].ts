import { handle } from '@hono/node-server/vercel';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { createOpenApiDocument } from 'hono-zod-openapi';

import { brandRouter } from '@/features/products/server/brand.router';
import { productRouter } from '@/features/products/server/product.router';
import { workshopRouter } from '@/features/workshop/workshop.router';

export const config = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath('/api');

app.get('/health', (c) => {
  return c.json({
    time: new Date().toISOString(),
  });
});

app.route('/workshop', workshopRouter);
app.route('/products', productRouter);
app.route('/brands', brandRouter);

createOpenApiDocument(app, {
  info: {
    title: 'Workshop Node SQL Server Api',
    version: '1.0.0',
  },
});

app.get('/documentation', swaggerUI({ url: '/api/doc' }));

export type HonoLocalApiAppType = typeof app;

export default handle(app);
