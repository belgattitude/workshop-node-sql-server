import type {
  AsyncQueryResult,
  KyselyDatasource,
} from '@flowblade/source-kysely';
import { isStringNonEmpty } from '@httpx/assert';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import type { z } from 'zod';

import {
  type WorkshopValidators,
  workshopValidators,
} from '@/features/workshop/workshop.validators';

type GetBrandsParams = z.infer<WorkshopValidators['getBrands']['params']>;
type GetBrandsResult = z.infer<WorkshopValidators['getBrands']['result']>;

type GetProdutsParams = z.infer<WorkshopValidators['getProducts']['params']>;
type GetProductsResult = z.infer<WorkshopValidators['getProducts']['result']>;

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
  query2 = async (
    params: GetProdutsParams
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
}
