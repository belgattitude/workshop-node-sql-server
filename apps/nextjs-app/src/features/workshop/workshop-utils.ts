import type { QueryResult } from '@flowblade/source-kysely';
import { openApi } from 'hono-zod-openapi';
import type { z } from 'zod';

export type WorkshopValidator = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: z.ZodArray<any> | z.ZodObject<any>;
};

export type AsyncQueryResult<T> = Promise<QueryResult<T>>;

export const zodOpenApi = <T extends WorkshopValidator>(validator: T) => {
  return openApi({
    request: {
      query: validator.params as T['params'],
    },
    responses: {
      200: validator.result as T['result'],
    },
  });
};
