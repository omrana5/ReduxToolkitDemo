import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiErrorResponse } from 'AppApi/types/auth.types';
import { EventsListResponse } from 'AppApi/types/events.types';
import { ACCESS_TOKEN_VALUE, mmkvStorage } from 'AppUtils/storageUtils';

import { networkService } from './services/authService';

export const EVENT_LIST_QUERY_KEY = ['events', 'listing'] as const;

interface UseEventListOptions {
  enabled?: boolean;
}

/**
 * Custom hook to fetch the events listing using React Query.
 * Requires a valid auth token (set after login).
 */
export const useEventList = (
  options?: UseEventListOptions,
): UseQueryResult<EventsListResponse, AxiosError<ApiErrorResponse>> => {
  return useQuery<EventsListResponse, AxiosError<ApiErrorResponse>>({
    queryKey: EVENT_LIST_QUERY_KEY,
    enabled: options?.enabled ?? true,
    queryFn: async () => {
      const token = await mmkvStorage.getItem(ACCESS_TOKEN_VALUE);

      if (!token) {
        throw new Error('Authentication required to load events.');
      }

      return networkService.eventList();
    },
  });
};
