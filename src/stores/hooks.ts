import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsAuthLoading = (state: RootState) =>
  state.auth.isAuthLoading;

export const selectUserGreeting = (state: RootState): string => {
  const firstName = state.auth.user?.usr_fname?.trim();

  return firstName ? `Hello ${firstName}!` : 'Hello!';
};

export const selectFavoriteIds = (state: RootState): string[] =>
  Object.keys(state.favorites.items);

export const selectFavoriteItems = (state: RootState) =>
  Object.values(state.favorites.items);

export const selectIsFavorite = (
  state: RootState,
  eventId: string,
  apiIsFavorite = false,
): boolean => {
  if (state.favorites.unfavoritedIds[eventId]) {
    return false;
  }

  if (state.favorites.items[eventId]) {
    return true;
  }

  return apiIsFavorite;
};
