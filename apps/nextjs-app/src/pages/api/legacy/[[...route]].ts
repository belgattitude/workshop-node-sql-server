import { handle } from '@hono/node-server/vercel';
import { Hono } from 'hono';

import { productRouter } from '@/features/products/server/product.router';
import { workshopRouter } from '@/features/workshop/workshop.router';

export const config = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath('/api/legacy');

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

app.route('/workshop', workshopRouter);
app.route('/products', productRouter);

export default handle(app);
