import type { QueryResult, QueryResultSuccess } from '@flowblade/core';

export type UnwrappedQueryResultData<T extends QueryResult<unknown[]>> =
  T extends QueryResult<infer TData> ? QueryResultSuccess<TData> : never;

type A = UnwrappedQueryResultData<QueryResult<{ id: number }[]>>;
const a: A = {
  success: true,
  data: [{ name: 'cool' }],
};

export type UnwrappedAsyncQueryResultData<T> =
  T extends Promise<infer P>
    ? P extends QueryResult<unknown[]>
      ? Promise<P>
      : never
    : never;

/*
export const unwrapQueryResult = <T extends QueryResult<unknown[]>>(
  queryResult: T
): UnwrappedQueryResultData<T> => {
  if (queryResult.success === false) {
    throw new Error(queryResult.error.message);
  }
  return {
    success: true,
    meta: queryResult.meta,
    data: queryResult.data,
  };
};
*/
