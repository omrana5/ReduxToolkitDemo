import { StyleSheet } from 'react-native';
import { ColorsType } from 'AppTypes';
import { moderateScaling } from 'AppUtils/styleHelper';
import { PRIMARY_FONT_OBJECT } from 'AppTheme/fonts';

const getStyles = (colors: ColorsType, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      // backgroundColor: isDark ? colors.appThemeColor : colors.homeBackground,
    },

    // ── Header ─────────────────────────────────────────────────────────────
    header: {
      paddingHorizontal: moderateScaling(16),
      paddingTop:        moderateScaling(20),
      paddingBottom:     moderateScaling(8),
      backgroundColor:   isDark ? colors.appThemeColor : colors.white,
    },

    greeting: {
      fontSize:   moderateScaling(26),
      fontFamily: PRIMARY_FONT_OBJECT[600],
      color:      isDark ? colors.white : colors.homeNameColor,
      lineHeight: moderateScaling(34),
    },

    subtitle: {
      fontSize:   moderateScaling(16),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      color:      isDark ? colors.lightPurple : colors.iconColor,
      marginTop:  moderateScaling(2),
    },

    // ── List ───────────────────────────────────────────────────────────────
    listContent: {
      flexGrow: 1,
      paddingTop: moderateScaling(12),
      paddingBottom: moderateScaling(24),
      backgroundColor: isDark ? colors.appThemeColor : colors.homeBackground,
      paddingHorizontal:moderateScaling(16),
    },

    emptyContainer: {
      flex: 1,
      alignItems:     'center',
      justifyContent: 'center',
      paddingVertical: moderateScaling(60),
    },

    emptyText: {
      fontSize:   moderateScaling(15),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      color:      isDark ? colors.lightPurple : colors.iconColor,
    },
  });

export default getStyles;
