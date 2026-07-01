import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

import type {
  RootStackParamList,
  MainStackParamList,
  MainTabParamList,
  AuthStackParamList,
} from "./types";

import { ROOT_ROUTES, STACK_ROUTES, TAB_ROUTES } from "./routes";

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

// -----------------------------------------------------------------------------
// Main Stack
// -----------------------------------------------------------------------------

export function navigateMainStack<T extends keyof MainStackParamList>(
  screen: T,
  params?: MainStackParamList[T],
) {
  if (!navigationRef.isReady()) return;

  navigationRef.navigate(ROOT_ROUTES.App, {
    screen,
    params,
  } as never);
}

// -----------------------------------------------------------------------------
// Auth Stack
// -----------------------------------------------------------------------------

export function navigateAuthStack<T extends keyof AuthStackParamList>(
  screen: T,
  params?: AuthStackParamList[T],
) {
  if (!navigationRef.isReady()) return;

  navigationRef.navigate(ROOT_ROUTES.Auth, {
    screen,
    params,
  } as never);
}

// -----------------------------------------------------------------------------
// Generic navigate (supports both stacks)
// -----------------------------------------------------------------------------

export function navigate<T extends keyof MainStackParamList>(
  screen: T,
  params?: MainStackParamList[T],
): void;

export function navigate<T extends keyof AuthStackParamList>(
  screen: T,
  params?: AuthStackParamList[T],
): void;

export function navigate(screen: any, params?: any) {
  if (screen in STACK_ROUTES) {
    navigateMainStack(screen, params);
  } else {
    navigateAuthStack(screen, params);
  }
}

// -----------------------------------------------------------------------------
// Navigation helpers
// -----------------------------------------------------------------------------

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function replace<T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(StackActions.replace(screen, params));
}

export function resetToAuth() {
  if (!navigationRef.isReady()) return;

  navigationRef.reset({
    index: 0,
    routes: [{ name: ROOT_ROUTES.Auth }],
  });
}

export function resetToApp(
  initialTab: keyof MainTabParamList = TAB_ROUTES.SearchScreen,
) {
  if (!navigationRef.isReady()) return;

  navigationRef.reset({
    index: 0,
    routes: [
      {
        name: ROOT_ROUTES.App,
        state: {
          routes: [
            {
              name: STACK_ROUTES.MainTabs,
              params: { initialTab },
            },
          ],
        },
      },
    ],
  });
}

export function resetStack<T extends keyof RootStackParamList>(
  route: T,
  params?: RootStackParamList[T],
) {
  if (!navigationRef.isReady()) return;

  navigationRef.reset({
    index: 0,
    routes: [{ name: route, params }],
  });
}

export function navigateToMainTab(
  tab: keyof MainTabParamList = TAB_ROUTES.SearchScreen,
) {
  navigateMainStack(STACK_ROUTES.MainTabs, {
    initialTab: tab,
  });
}

export function popToMainTabs() {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.navigate({
      name: ROOT_ROUTES.App,
      params: {
        screen: STACK_ROUTES.MainTabs,
      },
    }),
  );
}

export function openDrawer() {
  if (__DEV__) {
    console.warn(
      "[navigation] openDrawer called but no drawer navigator is mounted.",
    );
  }
}

export function closeDrawer() {
  if (__DEV__) {
    console.warn(
      "[navigation] closeDrawer called but no drawer navigator is mounted.",
    );
  }
}