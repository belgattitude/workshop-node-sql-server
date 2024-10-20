import type { HonoLocalAppType } from '../app/api/[...route]/route';

const apiServer = 'http://localhost:3000';

export const apiLocalConfig = {
  apiUrl: `${apiServer}/api`,
  apiServer: `${apiServer}`,
  schemaUrl: `${apiServer}/api/doc`,
} as const;

export type LocalApiType = HonoLocalAppType;
