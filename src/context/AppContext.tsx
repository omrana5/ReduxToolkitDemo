import React, {
  createContext,
  FC,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useColorScheme, useWindowDimensions, ColorSchemeName } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

import { darkTheme, lightTheme } from 'AppTheme/Colors';
import { AppAnyType, ColorsType, DeviceType } from 'AppTypes';
import { mmkvStorage, ACCESS_TOKEN_VALUE, REMEMBER_ME_VALUE } from 'AppUtils/storageUtils';

// ============================================================================
// CONSTANTS
// ============================================================================

const AUTH_TOKEN_KEY = ACCESS_TOKEN_VALUE;
const USER_DATA_KEY = '@user_data' as const;
const THEME_PREFERENCE_KEY = '@theme_preference' as const;
const TABLET_BREAKPOINT_PX = 600;

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
}

export type ThemeMode = Extract<ColorSchemeName, 'light' | 'dark'>;

export interface AuthMethods {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface AppContextValue {
  // ── Layout & Device ───────────────────────────────────────────────────────
  deviceType: DeviceType;
  orientation: 'Portrait' | 'Landscape';
  width: number;
  height: number;
  isLandscape: boolean;
  isTab: boolean;

  // ── Theme ─────────────────────────────────────────────────────────────────
  colors: ColorsType;
  appTheme: ColorSchemeName;
  toggleTheme: () => void;

  // ── UI State ──────────────────────────────────────────────────────────────
  tabBarHeight: number;
  setTabBarHeight: (height: number) => void;
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  flashListRef: AppAnyType | undefined;
  setFlashListRef: (ref: AppAnyType) => void;
  isBottomTabVisible: boolean;
  setIsBottomTabVisible: (visible: boolean) => void;

  // ── Network ───────────────────────────────────────────────────────────────
  hasInternet: boolean;

  // ── Auth State ────────────────────────────────────────────────────────────
  user: User | null;
  authToken: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  // ── Auth Methods ──────────────────────────────────────────────────────────
  signIn: AuthMethods['signIn'];
  signUp: AuthMethods['signUp'];
  signOut: AuthMethods['signOut'];
}

// ============================================================================
// CONTEXT
// ============================================================================

export const AppContext = createContext<AppContextValue | undefined>(undefined);

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Safely parse a JSON string into a typed object.
 * Returns `null` if parsing fails.
 */
function safeJsonParse<T>(raw: string | null | undefined): T | null {
  if (!raw || typeof raw !== 'string') return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Narrow an unknown storage value to a valid ThemeMode.
 */
function isValidTheme(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

// ============================================================================
// PROVIDER
// ============================================================================

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const systemColorScheme = useColorScheme();

  // ── UI / Device ────────────────────────────────────────────────────────────
  const [themeOverride, setThemeOverride] = useState<ThemeMode | null>(null);
  const [tabBarHeight, setTabBarHeight] = useState<number>(100);
  const [flashListRef, setFlashListRef] = useState<AppAnyType | undefined>(undefined);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isBottomTabVisible, setIsBottomTabVisible] = useState<boolean>(true);
  const [hasInternet, setHasInternet] = useState<boolean>(true);

  // ── Auth ───────────────────────────────────────────────────────────────────
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // ── Derived / Computed ─────────────────────────────────────────────────────
  const isTablet = Math.min(width, height) >= TABLET_BREAKPOINT_PX;
  const isPortrait = height >= width;
  const activeTheme: ColorSchemeName = themeOverride ?? systemColorScheme;
  
  const colors: AppAnyType = activeTheme === 'dark' ? darkTheme.colors : lightTheme.colors;

  // ── Network Monitor ────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setHasInternet(state.isConnected === true);
    });
    return unsubscribe;
  }, []);

  // ── Auth & Theme Initialization ────────────────────────────────────────────
  useEffect(() => {
    const initializeApp = async (): Promise<void> => {
      try {
        setIsAuthLoading(true);

        const rememberMeRaw = await mmkvStorage.getItem(REMEMBER_ME_VALUE);
        const rememberMe = rememberMeRaw === 'true';

        if (rememberMe) {
          const token = await mmkvStorage.getItem(AUTH_TOKEN_KEY);
          if (token && typeof token === 'string') {
            setAuthToken(token);
          }

          const userDataRaw = await mmkvStorage.getItem(USER_DATA_KEY);
          const parsedUser = safeJsonParse<User>(userDataRaw as string);
          if (parsedUser) {
            setUser(parsedUser);
          } else if (userDataRaw) {
            console.warn('[AppProvider] Failed to parse stored user data.');
          }
        }

        const savedTheme = mmkvStorage.getItem(THEME_PREFERENCE_KEY);
        if (isValidTheme(savedTheme)) {
          setThemeOverride(savedTheme);
        }
      } catch (error) {
        console.error('[AppProvider] Initialization error:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeApp();
  }, []);

  // ── Auth Methods ────────────────────────────────────────────────────────────

  const signIn = useCallback(async (email: string, _password: string): Promise<void> => {
    try {
      setIsAuthLoading(true);

      // TODO: Replace with real API call
      await new Promise<void>(resolve => setTimeout(resolve, 800));

      const token = `mock-jwt-token-${Date.now()}`;
      const newUser: User = {
        id: String(Date.now()),
        email,
        name: email.split('@')[0] ?? email,
      };

      await Promise.all([
        mmkvStorage.setItem(AUTH_TOKEN_KEY, token),
        mmkvStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser)),
      ]);

      setAuthToken(token);
      setUser(newUser);
    } catch (error) {
      console.error('[AppProvider] Sign-in error:', error);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (email: string, _password: string, name: string): Promise<void> => {
      try {
        setIsAuthLoading(true);

        // TODO: Replace with real API call
        await new Promise<void>(resolve => setTimeout(resolve, 1000));

        const token = `mock-signup-token-${Date.now()}`;
        const newUser: User = { id: String(Date.now()), email, name };

        await Promise.all([
          mmkvStorage.setItem(AUTH_TOKEN_KEY, token),
          mmkvStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser)),
        ]);

        setAuthToken(token);
        setUser(newUser);
      } catch (error) {
        console.error('[AppProvider] Sign-up error:', error);
        throw error;
      } finally {
        setIsAuthLoading(false);
      }
    },
    [],
  );

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setIsAuthLoading(true);

      await Promise.all([
        mmkvStorage.removeItem(AUTH_TOKEN_KEY),
        mmkvStorage.removeItem(USER_DATA_KEY),
      ]);

      setAuthToken(null);
      setUser(null);
    } catch (error) {
      console.error('[AppProvider] Sign-out error:', error);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // ── Theme Toggle ────────────────────────────────────────────────────────────

  const toggleTheme = useCallback((): void => {
    const current = themeOverride ?? systemColorScheme;
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  
    setThemeOverride(next);
    mmkvStorage.setItem(THEME_PREFERENCE_KEY, next);
  }, [themeOverride, systemColorScheme]);

  // ── Memoized Context Value ──────────────────────────────────────────────────

  const value = useMemo<AppContextValue>(
    () => ({
      // Layout & Device
      deviceType: isTablet ? DeviceType.TABLET : DeviceType.PHONE,
      orientation: isPortrait ? 'Portrait' : 'Landscape',
      isLandscape: !isPortrait,
      isTab: isTablet,
      width,
      height,

      // Theme
      colors,
      appTheme: activeTheme,
      toggleTheme,

      // UI State
      tabBarHeight,
      setTabBarHeight,
      isMinimized,
      setIsMinimized,
      flashListRef,
      setFlashListRef,
      isBottomTabVisible,
      setIsBottomTabVisible,

      // Network
      hasInternet,

      // Auth State
      user,
      authToken,
      isAuthenticated: authToken !== null,
      isAuthLoading,

      // Auth Methods
      signIn,
      signUp,
      signOut,
    }),
    [
      isTablet,
      isPortrait,
      width,
      height,
      colors,
      activeTheme,
      toggleTheme,
      tabBarHeight,
      isMinimized,
      flashListRef,
      isBottomTabVisible,
      hasInternet,
      user,
      authToken,
      isAuthLoading,
      signIn,
      signUp,
      signOut,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider };
