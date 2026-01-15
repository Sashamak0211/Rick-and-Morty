import { QueryClient } from '@tanstack/react-query';

const TIME_STALE = 10000;
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: TIME_STALE,
    },
    mutations: {
      retry: 0,
    },
  },
});
