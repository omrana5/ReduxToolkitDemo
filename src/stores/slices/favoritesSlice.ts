import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { EventItem } from 'AppModules/Main/SearchScreen/eventTypes';

interface FavoritesState {
  items: Record<string, EventItem>;
  unfavoritedIds: Record<string, true>;
}

const initialState: FavoritesState = {
  items: {},
  unfavoritedIds: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<EventItem>) => {
      const { id } = action.payload;

      if (state.items[id]) {
        delete state.items[id];
        state.unfavoritedIds[id] = true;
        return;
      }

      delete state.unfavoritedIds[id];
      state.items[id] = {
        ...action.payload,
        isFavourited: true,
      };
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      state.unfavoritedIds[action.payload] = true;
    },
    clearFavorites: state => {
      state.items = {};
      state.unfavoritedIds = {};
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
