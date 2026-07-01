import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStack } from "AppRoutes/navigation/stack/AuthStack";
import { useAppSelector } from "AppStores/hooks";

import type { RootStackParamList } from "AppRoutes/types";
import { ROOT_ROUTES } from "AppRoutes/routes";
import { MainStack } from "./stack/MainStack";

const Root = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      {isAuthenticated ? (
        <Root.Screen name={ROOT_ROUTES.App} component={MainStack} />
      ) : (
        <Root.Screen name={ROOT_ROUTES.Auth} component={AuthStack} />
      )}
    </Root.Navigator>
  );
};
