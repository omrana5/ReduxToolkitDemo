import React, { useCallback, useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StatusBar } from "react-native";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import { CustomTabBar } from "./CustomTabBar";

import { useApp } from "AppContex/hooks/useApp";
import { TAB_ROUTES } from "AppRoutes/routes";
import type { MainStackParamList, MainTabParamList } from "AppRoutes/types";

import { CustomTopNavHeader } from "AppComponents/CustomTopNavHeader";
import EventsScreen from "AppModules/Main/EventsScreen";
import FavouritesScreen from "AppModules/Main/FavouritesScreen";
import ProfileScreen from "AppModules/Main/ProfileScreen";
import SearchScreen from "AppModules/Main/SearchScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();



// ─── Component ───────────────────────────────────────────────
export const MainTabs: React.FC = () => {
  const { colors, appTheme } = useApp();
  const insets = useSafeAreaInsets();
  const isDark = appTheme === "dark";
  const isAndroid15 = Platform.OS === "android" && Platform.Version >= 35;

  const stackRoute = useRoute<RouteProp<MainStackParamList, "MainTabs">>();
  const initialTab = stackRoute.params?.initialTab;
  const initialTabName = (initialTab ??
    TAB_ROUTES.SearchScreen) as keyof MainTabParamList;

  const backgroundColor = colors?.white;

  // Shared navigator defaults
  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerShown: false,
      contentStyle: { backgroundColor },
      headerStyle: { backgroundColor: "transparent" },
      headerShadowVisible: false,
      ...(isAndroid15 && {
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }),
    }),
    [backgroundColor, isAndroid15, insets.bottom],
  );

  // Header factory – keeps each screen's options declaration small
  const AppHeader = useCallback(
    (title: string): BottomTabNavigationOptions => ({
      headerStatusBarHeight: 0,
      headerStyle: { backgroundColor: "transparent" },
      headerShadowVisible: false,
      headerShown: true,
      header: () => (
        <CustomTopNavHeader
          title={title}
          showLeftIcon={true}
          showSearch={false}
          showRightIcon
        />
      ),
    }),
    [],
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Tab.Navigator
        key={String(initialTabName)}
        tabBar={(props) => <CustomTabBar {...props} showLabels />}
        screenOptions={screenOptions}
        initialRouteName={initialTabName}
      >
        <Tab.Screen
          name={TAB_ROUTES.SearchScreen}
          component={SearchScreen}
        />
        <Tab.Screen name={TAB_ROUTES.EventsScreen} component={EventsScreen} />

        <Tab.Screen
          name={TAB_ROUTES.FavouritesScreen}
          component={FavouritesScreen}
        />


        <Tab.Screen
          name={TAB_ROUTES.ProfileScreen}
          component={ProfileScreen}
          options={() => AppHeader("Profile")}
        />
        
      </Tab.Navigator>
    </>
  );
};

