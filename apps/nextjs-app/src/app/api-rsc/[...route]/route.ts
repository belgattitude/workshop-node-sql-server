import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createOpenApiDocument } from 'hono-zod-openapi';

import { productRouter } from '@/features/products/server/product.router';
import { workshopRouter } from '@/features/workshop/workshop.router';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

app.route('/workshop', workshopRouter);
app.route('/products', productRouter);

createOpenApiDocument(app, {
  info: {
    title: 'Workshop Node SQL Server Api',
    version: '1.0.0',
  },
});

app.get('/documentation', swaggerUI({ url: '/api/doc' }));

export type HonoLocalAppType = typeof app;

const handleRequest = handle(app);

export const DELETE = handleRequest;
export const GET = handleRequest;
export const PATCH = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const OPTIONS = handleRequest;
export const HEAD = handleRequest;
