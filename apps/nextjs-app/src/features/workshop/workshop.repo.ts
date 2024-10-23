import { faker } from '@faker-js/faker';
import type {
  AsyncQueryResult,
  KyselyDatasource,
} from '@flowblade/source-kysely';
import { isStringNonEmpty } from '@httpx/assert';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import { sql } from 'kysely';
import type { z } from 'zod';

import {
  type WorkshopValidators,
  workshopValidators,
} from '@/features/workshop/workshop.validators';

type GetStarterParams = z.infer<WorkshopValidators['getStarter']['params']>;
type GetStarterResult = z.infer<WorkshopValidators['getStarter']['result']>;

type GetBrandsParams = z.infer<WorkshopValidators['getBrands']['params']>;
type GetBrandsResult = z.infer<WorkshopValidators['getBrands']['result']>;

type GetProductsParams = z.infer<WorkshopValidators['getProducts']['params']>;
type GetProductsResult = z.infer<WorkshopValidators['getProducts']['result']>;

type GetAdvancedParams = z.infer<WorkshopValidators['getAdvanced']['params']>;
type GetAdvancedResult = z.infer<WorkshopValidators['getAdvanced']['result']>;

export class WorkshopRepo<
  T extends
    KyselyDatasource<DBKyselySqlServer> = KyselyDatasource<DBKyselySqlServer>,
> {
  private ds: T;
  public static readonly validators = workshopValidators;

  constructor(params: { ds: T }) {
    this.ds = params.ds;
  }

  /**
   * Exercise 1:
   * - pass the parameter limit in the query
   * - pass the parameter searchName with a like clause
   * - Transform sqlRaw in a kysely query builder alternative
   *
   * @see https://kysely-org.github.io/kysely-apidoc/interfaces/Sql.html
   */
  getStarter = async (
    params: GetStarterParams
  ): AsyncQueryResult<GetStarterResult> => {
    const { limit, searchName } = params;
    const sqlRaw = sql<GetStarterResult>` 
       SELECT
           -- limit with top
           b.id, b.name
       FROM [common].[brand] as b
       -- WHERE b.name like 'brand name'
    `;
    return this.ds.queryRaw(sqlRaw);
  };

  /**
   * Query 1: return a list of brands
   */
  getBrands = async (
    params: GetBrandsParams
  ): AsyncQueryResult<GetBrandsResult> => {
    const { limit } = params;

    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'brand name',
        },
      ].slice(0, limit),
    };
  };

  /**
   * Query 2: return a list of products with brand information
   */
  getProducts = async (
    params: GetProductsParams
  ): AsyncQueryResult<GetProductsResult> => {
    const { searchName, limit } = params;
    return {
      success: true,
      data: [
        {
          id: 1,
          brand_id: 1,
          name: 'product name',
          reference: 'product reference',
          brand_name: 'brand name',
          barcode_ean13: 'sample ean13',
        },
      ]
        .filter((product) =>
          isStringNonEmpty(searchName)
            ? product.name.includes(searchName)
            : true
        )
        .slice(0, limit),
    }; // satisfies QueryResult<Q2Result>;
  };

  /**
   * Query 3: return Products with
   *
   * ```typescript
   * type Product = {
   *   id: number;
   *   name: string;
   *   Brand: {
   *     id: number;
   *     name: string;
   *   }
   * }
   * ```
   */
  getProductWithNestedBrands = async () => {
    throw new Error('Not implemented');
  };

  /**
   * Show how to pass json parameters without
   * temporary table and stored procedure in SQL Server
   */
  getAdvanced = async (
    params: GetAdvancedParams
  ): AsyncQueryResult<GetAdvancedResult> => {
    const { limit } = params;

    const initialTableData: GetAdvancedResult = Array.from(
      { length: 1000 },
      (_) => ({
        countryId: faker.location.countryCode('alpha-2'),
        productId: faker.commerce.isbn(13),
        productName: faker.commerce.productName(),
      })
    );

    const productToUpdate = initialTableData.slice(0, 10).map((row) => ({
      ...row,
      productName: `Updated ! ${row.productName}`,
    }));

    const sqlRaw = sql<GetAdvancedResult>`
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
           FROM OPENJSON(@InitialData) WITH (
               productId NVARCHAR(255), 
               countryId NVARCHAR(255),
               productName NVARCHAR(255)
           );
            
      -- FROM HERE I AM IN A SITUATION WHERE THE TABLE Is FILLED
      UPDATE T
      SET productName = tNewData.productName
      FROM (SELECT productId, countryId, productName 
            FROM OPENJSON(@ProductToUpdate) 
            WITH (
                productId NVARCHAR(255), 
                countryId NVARCHAR(255),
                productName NVARCHAR(255))
            ) AS tNewData
      INNER JOIN #correctedProducts AS T
      ON tNewData.productId = T.productId and T.countryId = tNewData.countryId;    
      
      -- SELECT
      SELECT TOP ${sql.lit(limit)} productId, countryId, productName, createdAt, updatedAt 
      FROM #correctedProducts;
    `;

    return this.ds.queryRaw(sqlRaw);
  };
}
