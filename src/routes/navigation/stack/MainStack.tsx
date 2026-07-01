import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { MainTabs } from './tabs/MainTabs';

import { useApp } from 'AppContex/hooks/useApp';
import { MainStackParamList } from 'AppRoutes/types';
import { STACK_ROUTES } from 'AppRoutes/routes';
import getStyles from './mainStack.styles';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack: React.FC = () => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === 'dark';
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const backgroundColor = colors?.white;

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerShown: false,
      animation: 'slide_from_right',
      contentStyle: { backgroundColor },
    }),
    [backgroundColor],
  );


  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={STACK_ROUTES.MainTabs}
        component={MainTabs}
        options={{ animation: 'none' }}
      />  
    </Stack.Navigator>
  );
};
