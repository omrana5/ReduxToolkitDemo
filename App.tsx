import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import Routes from 'AppRoutes/index';
import { darkTheme, lightTheme } from 'AppTheme/Colors';
import { queryClient } from 'AppApi/queryConfig/queryClient';
import { toastConfig, ToastProvider } from 'AppComponents/ToastMessage/Toast';
import { AppProvider } from 'AppContex/AppContext';
import { store } from 'AppStores/store';
import AuthBootstrap from 'AppStores/AuthBootstrap';
import { appDefault } from 'AppUtils/appDefault';

appDefault();
const App = () => {
  const isDarkMode: boolean = useColorScheme() === 'dark';

  if (Platform.OS === 'android') {
    // Set the default background color for Android
    const SystemNavigationBar = require('react-native').StatusBar;
    SystemNavigationBar.setBackgroundColor('transparent', true);
    SystemNavigationBar.setTranslucent(true);
    SystemNavigationBar.setBarStyle(
      isDarkMode ? 'light-content' : 'dark-content',
    );
    SystemNavigationBar.setHidden(true);
    SystemNavigationBar.setBackgroundColor(
      isDarkMode
        ? darkTheme.colors.appBackground
        : lightTheme.colors.appBackground,
    );
    SystemNavigationBar.setTranslucent(true);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider
        style={{
          backgroundColor: isDarkMode
            ? darkTheme.colors.appBackground
            : lightTheme.colors.appBackground,
        }}
      >
        <AppProvider>
          <Provider store={store}>
            <AuthBootstrap>
              <QueryClientProvider client={queryClient}>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <Routes />

                <ToastProvider config={toastConfig} />
              </QueryClientProvider>
            </AuthBootstrap>
          </Provider>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
