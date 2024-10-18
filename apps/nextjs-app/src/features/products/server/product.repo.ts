import type { KyselyDatasource } from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import { z } from 'zod';

import { workshopDatasource } from '@/server/config/datasource.kysely-sqlserver.config';

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
type SearchResult = z.infer<typeof validators.search.result>;

export class ProductRepo<T = KyselyDatasource<DBKyselySqlServer>> {
  private datasource: KyselyDatasource<DBKyselySqlServer>;
  public static readonly validators = validators;

  constructor(params: { datasource: KyselyDatasource<DBKyselySqlServer> }) {
    this.datasource = params.datasource;
  }
  search = async (params: SearchParams): Promise<SearchResult> => {
    const { searchName, limit } = params;
    const db = this.datasource.getConnection();
    const rows = db
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
      .top(limit)
      .execute();
    return rows;
  };
}

export const productRepo = new ProductRepo({ datasource: workshopDatasource });
