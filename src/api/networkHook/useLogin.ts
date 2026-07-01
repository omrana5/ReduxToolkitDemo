// hooks/useLogin.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  LoginRequest,
  LoginResponse,
  ApiErrorResponse,
} from 'AppApi/types/auth.types';
import {
  clearAuthSession,
  persistAuthSession,
} from 'AppStores/authPersistence';
import { clearCredentials, setCredentials } from 'AppStores/slices/authSlice';
import { store } from 'AppStores/store';
import { mmkvStorage, ACCESS_TOKEN_VALUE, REFRESH_TOKEN_VALUE } from 'AppUtils/storageUtils';

import { networkService } from './services/authService';

/**
 * Options for the useLogin hook
 */
interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void | Promise<void>;
  onError?: (error: AxiosError<ApiErrorResponse>) => void | Promise<void>;
}

/**
 * Custom hook to handle user login using React Query mutation.
 */
export const useLogin = (
  options?: UseLoginOptions
): UseMutationResult<
  LoginResponse,
  AxiosError<ApiErrorResponse>,
  LoginRequest
> => {
  return useMutation<LoginResponse, AxiosError<ApiErrorResponse>, LoginRequest>({
    mutationFn: networkService.login,
    onSuccess: async (data) => {
      const token = data?.data?.token;
      const user = data?.data?.user;

      if (token && user) {
        await persistAuthSession(user, token);
        store.dispatch(setCredentials({ user, token }));
      } else if (token) {
        await mmkvStorage.setItem(ACCESS_TOKEN_VALUE, token);
      }

      if (data?.data?.refreshToken) {
        await mmkvStorage.setItem(REFRESH_TOKEN_VALUE, data.data.refreshToken);
      }

      await options?.onSuccess?.(data);
    },

    onError: async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        store.dispatch(clearCredentials());
        await clearAuthSession();
        await mmkvStorage.removeItem(REFRESH_TOKEN_VALUE);
      }

      await options?.onError?.(error);
    },
  });
};
