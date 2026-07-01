// ─────────────────────────────────────────────────────────────
//  navigation/routes.ts
//  Route name constants typed against their param lists.
//  Import these everywhere instead of raw strings.
// ─────────────────────────────────────────────────────────────

import type {
  AuthStackParamList,
  MainStackParamList,
  MainTabParamList,
  RootStackParamList,
} from "./types";

// Utility – ensures every key you declare matches the param list
type RouteKeys<T> = { [K in keyof T]: K };

export const ROOT_ROUTES: RouteKeys<RootStackParamList> = {
  Auth: "Auth",
  App: "App",
} as const;

export const AUTH_ROUTES: RouteKeys<AuthStackParamList> = {
  LoginScreen: "LoginScreen",
} as const;

export const TAB_ROUTES: RouteKeys<MainTabParamList> = {
  EventsScreen: 'EventsScreen',
  FavouritesScreen: 'FavouritesScreen',
  ProfileScreen: 'ProfileScreen',
  SearchScreen: 'SearchScreen'
} as const;

export const STACK_ROUTES: RouteKeys<MainStackParamList> = {
  MainTabs: "MainTabs",
} as const;
