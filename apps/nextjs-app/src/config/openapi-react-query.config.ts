'use client';

import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { apiLocalConfig } from '@/config/api-local.config';
import type { paths } from '@/lib/openapi/local-api.types.generated';

const client = createFetchClient<paths>({
  baseUrl: apiLocalConfig.apiServer,
});

export const $api = createClient(client);
