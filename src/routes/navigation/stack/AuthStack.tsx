// ─────────────────────────────────────────────────────────────
//  navigation/stack/AuthStack.tsx
// ─────────────────────────────────────────────────────────────

import React, { useCallback, useMemo } from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import LoginScreen from "AppModules/Auth/LoginScreen";

import { useApp } from "AppContex/hooks/useApp";
import { AUTH_ROUTES } from "AppRoutes/routes";
import { CustomTopNavHeader } from "AppComponents/CustomTopNavHeader";
import getStyles from "./mainStack.styles";
import { AuthStackParamList } from "AppTypes";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === "dark";
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerShown: false,
      animation: Platform.OS === "android" ? "fade" : "default",
      contentStyle: {
        backgroundColor: colors.white,
      },
    }),
    [colors],
  );



  const AppHeader = useCallback(
    (title: string, onPress: () => void) => ({
      headerStatusBarHeight: 0,
      headerStyle: { backgroundColor: "transparent" },
      headerShadowVisible: false,
      animation: "slide_from_right",

      headerShown: true,
      header: () => (
        <CustomTopNavHeader
          title={title}
          showLeftIcon={true}
          onLeftPress={onPress}
          showSearch={false}
          showRightIcon
        />
      ),
    }),
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName={AUTH_ROUTES.LoginScreen}
      screenOptions={screenOptions}
    >

      <Stack.Screen
        name={AUTH_ROUTES.LoginScreen}
        component={LoginScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};
