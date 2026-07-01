// config/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Type-safe error handler
const isClientError = (error: unknown): boolean => {
  if (error instanceof AxiosError && error.response?.status) {
    const status = error.response.status;
    return status >= 400 && status < 500;
  }
  return false;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on client errors (4xx)
        if (isClientError(error)) return false;
        // Retry up to 2 times for server errors
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: (failureCount, error) => {
        // Never retry on client errors
        if (isClientError(error)) return false;
        // Retry once for network errors
        return failureCount < 1;
      },
    },
  },
});