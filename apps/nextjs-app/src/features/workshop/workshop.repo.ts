import type {
  DatasourceResult,
  KyselyDatasource,
} from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import type { z } from 'zod';

import {
  type WorkshopValidators,
  workshopValidators,
} from '@/features/workshop/workshop.validators';
import type { ApiResponse } from '@/features/workshop/workshop-utils';

type Q1Params = z.infer<WorkshopValidators['query1']['params']>;
type Q1Result = z.infer<WorkshopValidators['query1']['result']>;

export class WorkshopRepo<T = KyselyDatasource<DBKyselySqlServer>> {
  private ds: T;
  public static readonly validators = workshopValidators;

  constructor(params: { ds: T }) {
    this.ds = params.ds;
  }

  /**
   * Query 1: return a list of products
   */
  query1 = async (params: Q1Params): ApiResponse<Q1Result> => {
    const { searchName, limit } = params;
    return {
      data: [
        {
          id: 1,
          brand_id: 1,
          name: 'name',
          reference: 'reference',
          brand_name: 'brand_name',
          barcode_ean13: 'ean13',
        },
      ],
    };
  };

  /**
   * Query 2: return a list of products
   */
  query2 = async (params: Q1Params): ApiResponse<Q1Result> => {
    const { searchName, limit } = params;
    return {
      data: [
        {
          id: 1,
          brand_id: 1,
          name: 'name',
          reference: 'reference',
          brand_name: 'brand_name',
          barcode_ean13: 'ean13',
        },
      ],
    } satisfies DatasourceResult<unknown>;
  };
}
