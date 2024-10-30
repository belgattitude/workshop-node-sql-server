import ky from 'ky';

import { localApiConfig } from '@/config/local-api.config';

export const localApiFetcher = ky.create({
  prefixUrl: localApiConfig.apiUrl,
  timeout: 30_000,
  retry: {
    limit: 3,
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    afterStatusCodes: [413, 429, 503],
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
    delay: (attemptCount) => 0.3 * 2 ** (attemptCount - 1) * 1000,
  },
  /*
  hooks: {
    beforeRetry: [
      async ({ request, options, error, retryCount }) => {
        const token = await ky('https://example.com/refresh-token');
        request.headers.set('Authorization', `token ${token}`);
      },
    ],
  },
  */
});
