import type { KyselyDatasource, QueryResult } from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import type { z } from 'zod';

import {
  type WorkshopValidators,
  workshopValidators,
} from '@/features/workshop/workshop.validators';
import type { AsyncQueryResult } from '@/features/workshop/workshop-utils';

type Q1Params = z.infer<WorkshopValidators['query1']['params']>;
type Q1Result = z.infer<WorkshopValidators['query1']['result']>;

type Q2Params = z.infer<WorkshopValidators['query2']['params']>;
type Q2Result = z.infer<WorkshopValidators['query2']['result']>;

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
   * Query 1: return a list of products
   */
  query1 = async (params: Q1Params): AsyncQueryResult<Q1Result> => {
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
   * Query 2: return a list of products
   */
  query2 = async (params: Q2Params): AsyncQueryResult<Q2Result> => {
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
      ].slice(0, limit),
    } satisfies QueryResult<unknown>;
  };
}
