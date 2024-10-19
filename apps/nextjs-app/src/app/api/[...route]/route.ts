import { faker } from '@faker-js/faker';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createOpenApiDocument, openApi } from 'hono-zod-openapi';
import { sql } from 'kysely';
import { z } from 'zod';

import { productRouter } from '@/features/products/server/product.router';
import { workshopRouter } from '@/features/workshop/workshop.router';
import { dbKyselySqlServer as db } from '@/server/config/db.kysely-sqlserver.config';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

/**
 * Sample 1
 */
const zProduct = z.object({
  id: z.number(),
  name: z.string(),
} satisfies Record<string, unknown>);

app.route('/products', productRouter);
app.route('/workshop', workshopRouter);

app.get(
  '/products/ex2',
  openApi({
    request: {
      query: z.object({
        limit: z.coerce.number().optional().default(100),
        searchName: z.string().optional(),
      }),
    },
    responses: {
      200: z.array(zProduct),
    },
  }),
  async (c) => {
    const { limit, searchName } = c.req.valid('query');
    const rows = await db
      .selectFrom('common.product as p')
      .select(['name', 'barcode_ean13'])
      .$if(searchName !== undefined, (q) =>
        q.where('name', 'like', `%${searchName}%`)
      )
      .top(limit)
      .execute();
    return c.json(rows);
  }
);

// Examples TRANSACT-SQL

app.get('/transact-sql/ex1', async (c) => {
  type Row = {
    countryId: string;
    productId: string;
    productName: string;
  };

  const initialTableData: Row[] = Array.from({ length: 1000 }, (_) => ({
    countryId: faker.location.countryCode('alpha-2'),
    productId: faker.commerce.isbn(13),
    productName: faker.commerce.productName(),
  }));

  const productToUpdate = initialTableData.slice(0, 10).map((row) => ({
    ...row,
    productName: `Updated ! ${row.productName}`,
  }));

  const sqlRaw = sql<Row[]>`
    -- TRANSACT-SQL
    DECLARE @InitialData NVARCHAR(MAX); -- WARNING LIMIT TO 2GB
    DECLARE @ProductToUpdate NVARCHAR(MAX);        
    SET @InitialData = ${JSON.stringify(initialTableData)};
    SET @ProductToUpdate = ${JSON.stringify(productToUpdate)};

    -- DDL
    CREATE TABLE #correctedProducts (
      productId NVARCHAR(255),
      countryId NVARCHAR(10),
      productName NVARCHAR(255),
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
    );
    -- INSERT
    
    INSERT INTO #correctedProducts (productId, countryId, productName)
       SELECT productId, countryId, productName
         FROM OPENJSON(@InitialData) WITH (productId NVARCHAR(255), countryId NVARCHAR(255),productName NVARCHAR(255));
          
    -- FROM HERE I AM IN A SITUATION WHERE THE TABLE Is FILLED
    
    UPDATE T
    SET productName = tNewData.productName
    FROM (SELECT productId, countryId, productName FROM OPENJSON(@ProductToUpdate) WITH (productId NVARCHAR(255), countryId NVARCHAR(255),productName NVARCHAR(255))) AS tNewData
    INNER JOIN #correctedProducts AS T
    ON tNewData.productId = T.productId and T.countryId = tNewData.countryId;    
    
    -- SELECT
    SELECT productId, countryId, productName, createdAt, updatedAt 
    FROM #correctedProducts;
  `;

  const { rows } = await sqlRaw.execute(db);

  return c.json(rows);
});

createOpenApiDocument(app, {
  info: {
    title: 'Workshop Node SQL Server Api',
    version: '1.0.0',
  },
});

app.get('/documentation', swaggerUI({ url: '/api/doc' }));

const handleRequest = handle(app);

export const DELETE = handleRequest;
export const GET = handleRequest;
export const PATCH = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const OPTIONS = handleRequest;
