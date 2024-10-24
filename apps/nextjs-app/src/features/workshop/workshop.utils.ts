import type {
  QueryResultError,
  QueryResultMeta,
} from '@flowblade/source-kysely';
import { openApi } from 'hono-zod-openapi';
import { z } from 'zod';

export type WorkshopValidator = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: z.ZodObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: z.ZodArray<any> | z.ZodObject<any>;
};

const zMeta = z.object({
  affectedRows: z.number().optional(),
  timeMs: z.number().optional(),
  query: z
    .object({
      sql: z.string().optional(),
      params: z.array(z.unknown()).optional(),
    } satisfies Record<keyof QueryResultMeta['query'], z.Schema>)
    .optional(),
} satisfies Record<keyof QueryResultMeta, z.Schema>);

const zError = z.object({
  message: z.string(),
} satisfies Record<keyof QueryResultError['error'], z.Schema>);

const zQueryResult = <T extends z.Schema>(zSchema: T) =>
  z.object({
    success: z.boolean(),
    data: zSchema.optional(),
    error: zError.optional(),
    meta: zMeta.optional(),
  });

export const zodOpenApi = <T extends WorkshopValidator>(validator: T) => {
  return openApi({
    request: {
      query: validator.params as T['params'],
    },
    responses: {
      200: zQueryResult(validator.result),
    },
  });
};
