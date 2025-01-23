import type { QResult } from '@flowblade/core';
import type { KyselyDatasource } from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import { z } from 'zod';

export type ProductRepoSearchData = InferAsyncQueryResultData<
  ReturnType<ProductRepo['search']>
>;

const validators = {
  search: {
    params: z.object({
      limit: z.coerce.number().optional().default(100),
      searchName: z.string().optional(),
    }),
    result: z.array(
      z.object({
        id: z.number(),
        reference: z.string(),
        name: z.string(),
        barcode_ean13: z.string().nullable(),
        brand_id: z.number().nullable(),
        brand_name: z.string().nullable(),
      })
    ),
  },
} as const;

export type ProductRepoSearchParams = z.infer<typeof validators.search.params>;
export type ProductRepoSearchResult = z.infer<typeof validators.search.result>;

export class ProductRepo<
  T extends
    KyselyDatasource<DBKyselySqlServer> = KyselyDatasource<DBKyselySqlServer>,
> {
  private ds: T;
  public static readonly validators = validators;

  constructor(params: { ds: T }) {
    this.ds = params.ds;
  }
  search = async (
    params: ProductRepoSearchParams
  ): QResult<ProductRepoSearchResult> => {
    const { searchName, limit } = params;

    const query = this.ds.queryBuilder
      .selectFrom('common.product as p')
      .select([
        'p.id',
        'p.reference',
        'p.name',
        'p.barcode_ean13',
        'p.brand_id',
      ])
      .leftJoin('common.brand as b', 'b.id', 'p.brand_id')
      .select(['b.name as brand_name'])
      .$if(searchName !== undefined, (q) =>
        q.where('p.name', 'like', `%${searchName}%`)
      )
      .top(limit);

    return this.ds.query(query);
  };
}
