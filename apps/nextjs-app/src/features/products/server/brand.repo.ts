import type {
  AsyncQueryResult,
  InferAsyncQueryResultData,
} from '@flowblade/core';
import type { KyselyDatasource } from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import { z } from 'zod';

export type BrandRepoSearchData = InferAsyncQueryResultData<
  ReturnType<BrandRepo['search']>
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
        name: z.string(),
      })
    ),
  },
} as const;

export type BrandRepoSearchParams = z.infer<typeof validators.search.params>;
export type BrandRepoSearchResult = z.infer<typeof validators.search.result>;

export class BrandRepo<
  T extends
    KyselyDatasource<DBKyselySqlServer> = KyselyDatasource<DBKyselySqlServer>,
> {
  private ds: T;
  public static readonly validators = validators;

  constructor(params: { ds: T }) {
    this.ds = params.ds;
  }
  search = async (
    params: BrandRepoSearchParams
  ): AsyncQueryResult<BrandRepoSearchResult> => {
    const { searchName, limit } = params;

    const query = this.ds.queryBuilder
      .selectFrom('common.brand as b')
      .select(['b.id', 'b.name'])
      .$if(searchName !== undefined, (q) =>
        q.where('b.name', 'like', `%${searchName}%`)
      )
      .top(limit);

    return this.ds.query(query);
  };
}
