import type { QueryResult, QueryResultSuccess } from '@flowblade/source-kysely';

/**
 * Infer the data type (TData) from a QueryResult<TData>
 *
 * @example
 * ```typescript
 * type Row = { id: number };
 * const queryResult: QueryResult<Row[]> = {
 *   success: true,
 *   data: [ { id: 1 } ],
 * };
 * type TData = InferQueryResultData<typeof queryResult>;
 * ```
 */
export type InferQueryResultData<T extends QueryResult<unknown[]>> =
  T extends QueryResultSuccess<unknown[]> ? T['data'] : never;

/**
 * Infer the data type (TData) from an AsyncQueryResult<TData>
 *
 * @example
 * ```typescript
 * type Row = { id: number };
 * const getQueryResult = async (): AsyncQueryResult<Row[]> => {
 *   return {
 *    success: true,
 *    data: [{ id: 1 }],
 *   };
 * };
 * type TData = InferAsyncQueryResultData<ReturnType<typeof getQueryResult>>;
 * // TData = Row[]
 * ```
 */
export type InferAsyncQueryResultData<T> =
  T extends Promise<infer P>
    ? P extends QueryResultSuccess<unknown[]>
      ? P['data']
      : never
    : never;
