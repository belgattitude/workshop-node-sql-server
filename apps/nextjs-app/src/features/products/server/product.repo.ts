import type { KyselyDatasource, QueryResult } from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import type { SimplifyDeep } from 'type-fest';
import { z } from 'zod';

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

type SearchParams = z.infer<typeof validators.search.params>;
type SearchResult = QueryResult<
  SimplifyDeep<z.infer<typeof validators.search.result>>
>;

export class ProductRepo<T = KyselyDatasource<DBKyselySqlServer>> {
  private ds: KyselyDatasource<DBKyselySqlServer>;
  public static readonly validators = validators;

  constructor(params: { ds: KyselyDatasource<DBKyselySqlServer> }) {
    this.ds = params.ds;
  }
  search = async (params: SearchParams): Promise<SearchResult> => {
    const { searchName, limit } = params;

    const query = this.ds
      .eb()
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
