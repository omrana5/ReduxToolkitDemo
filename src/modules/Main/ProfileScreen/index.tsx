import React, { useMemo } from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';

import { useApp } from 'AppContex/hooks/useApp';

import AppScreen from 'AppComponents/AppScreen';
import getStyles from './styles';

const ProfileScreen: React.FC = () => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === 'dark';

  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  // ── Derived theme tokens ───────────────────────────────────────────────────

  const backgroundColor = isDark ? colors.appThemeColor : colors.homeBackground;
  const headerBg = colors.homeBackground;

  return (
    <AppScreen style={[styles.safeArea, { backgroundColor: headerBg }]}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        style={[styles.scrollView, { backgroundColor }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        nestedScrollEnabled
      >
        <Text>Search</Text>
      </ScrollView>
    </AppScreen>
  );
};

export default ProfileScreen;
