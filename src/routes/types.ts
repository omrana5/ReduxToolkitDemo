// ─────────────────────────────────────────────────────────────
//  navigation/types.ts
//  Single source of truth for every param-list in the app.
// ─────────────────────────────────────────────────────────────

import type { NavigatorScreenParams } from "@react-navigation/native";


// ── Auth ─────────────────────────────────────────────────────
export type AuthStackParamList = {
  LoginScreen: undefined;
};

// ── Main Tabs ─────────────────────────────────────────────────
export type MainTabParamList = {
  EventsScreen: undefined;
  FavouritesScreen: undefined;
  ProfileScreen: undefined;
  SearchScreen: undefined;
};

// ── Main Stack (screens on top of tabs) ──────────────────────
export type MainStackParamList = {
  MainTabs: { initialTab?: keyof MainTabParamList } | undefined;
};

// ── Root ──────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<MainStackParamList> | undefined;
};
