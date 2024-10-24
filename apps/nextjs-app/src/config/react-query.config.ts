import type { QueryClientConfig } from '@tanstack/react-query';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
      refetchOnWindowFocus: process.env.NODE_ENV === 'development',
    },
  },
};
