'use client';

import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { localApiConfig } from '@/config/local-api.config';
import type { paths } from '@/lib/openapi/local-api.types.generated';

const client = createFetchClient<paths>({
  baseUrl: localApiConfig.serverOrigin,
});

export const $api = createClient(client);
