import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { hydrateAuthFromStorage } from 'AppStores/authPersistence';
import { useAppDispatch, useAppSelector } from 'AppStores/hooks';

interface AuthBootstrapProps {
  children: React.ReactNode;
}

const AuthBootstrap: React.FC<AuthBootstrapProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector(state => state.auth.isAuthLoading);

  useEffect(() => {
    hydrateAuthFromStorage(dispatch);
  }, [dispatch]);

  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default AuthBootstrap;
