import {
  ACCESS_TOKEN_VALUE,
  mmkvStorage,
  USER_DATA_KEY,
} from 'AppUtils/storageUtils';
import type { AuthUser } from 'AppApi/types/auth.types';

import type { AppDispatch } from './store';
import {
  clearCredentials,
  setAuthLoading,
  setCredentials,
} from './slices/authSlice';

const parseStoredUser = (raw: unknown): AuthUser | null => {
  if (!raw) {
    return null;
  }

  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  return raw as AuthUser;
};

export const hydrateAuthFromStorage = async (
  dispatch: AppDispatch,
): Promise<void> => {
  dispatch(setAuthLoading(true));

  try {
    const [token, userRaw] = await Promise.all([
      mmkvStorage.getItem(ACCESS_TOKEN_VALUE),
      mmkvStorage.getItem(USER_DATA_KEY),
    ]);

    const parsedToken = typeof token === 'string' ? token : null;
    const user = parseStoredUser(userRaw);

    if (parsedToken && user) {
      dispatch(setCredentials({ user, token: parsedToken }));
      return;
    }

    dispatch(clearCredentials());
  } catch {
    dispatch(clearCredentials());
  }
};

export const persistAuthSession = async (
  user: AuthUser,
  token: string,
): Promise<void> => {
  await Promise.all([
    mmkvStorage.setItem(ACCESS_TOKEN_VALUE, token),
    mmkvStorage.setItem(USER_DATA_KEY, JSON.stringify(user)),
  ]);
};

export const clearAuthSession = async (): Promise<void> => {
  await Promise.all([
    mmkvStorage.removeItem(ACCESS_TOKEN_VALUE),
    mmkvStorage.removeItem(USER_DATA_KEY),
  ]);
};
