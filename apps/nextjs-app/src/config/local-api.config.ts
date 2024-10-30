import { isBrowser } from '@/lib/utils/is-browser';

import type { HonoLocalApiAppType } from '../pages/api/[[...route]]';

const apiServer = 'http://localhost:3000';

type LocalApiConfig = {
  /**
   *
   */
  apiUrl: string;
  /**
   * Hold the origin (protocol, hostname, port) of the api server
   * without the pathname part
   *
   * ie: https://localhost:3000
   */
  serverOrigin: string;
  /**
   * Url serving the openapi schema
   */
  openApiSchemaUrl: string;
};

export const localApiConfig: LocalApiConfig = {
  apiUrl: isBrowser() ? '/api' : `${apiServer}/api`,
  /**
   * Get the origin of the api server
   * ie: https://localhost:3000 (without pathname)
   */
  serverOrigin: `${apiServer}`,
  openApiSchemaUrl: `${apiServer}/api/doc`,
} as const;

export type LocalApiType = HonoLocalApiAppType;
