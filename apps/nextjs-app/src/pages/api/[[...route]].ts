import { handle } from '@hono/node-server/vercel';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { createOpenApiDocument } from 'hono-zod-openapi';

import { productRouter } from '@/features/products/server/product.router';
import { workshopRouter } from '@/features/workshop/workshop.router';

export const config = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

app.route('/workshop', workshopRouter);
app.route('/products', productRouter);

createOpenApiDocument(app, {
  info: {
    title: 'Workshop Node SQL Server Api',
    version: '1.0.0',
  },
});

app.get('/documentation', swaggerUI({ url: '/api/doc' }));

export type HonoLocalApiAppType = typeof app;

export default handle(app);
