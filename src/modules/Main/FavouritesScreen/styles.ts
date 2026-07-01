import { StyleSheet } from 'react-native';

import { ColorsType } from 'AppTypes';
import { moderateScaling } from 'AppUtils/styleHelper';
import { PRIMARY_FONT_OBJECT } from 'AppTheme/fonts';

const getStyles = (colors: ColorsType, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollView: {
      // flex: 1,
    },
    scrollContent: {
      paddingHorizontal: moderateScaling(15),
    },

    header: {
      paddingHorizontal: moderateScaling(16),
      paddingTop: moderateScaling(20),
      paddingBottom: moderateScaling(8),
      backgroundColor: isDark ? colors.appThemeColor : colors.white,
    },

    greeting: {
      fontSize: moderateScaling(26),
      fontFamily: PRIMARY_FONT_OBJECT[600],
      color: isDark ? colors.white : colors.homeNameColor,
      lineHeight: moderateScaling(34),
    },

    subtitle: {
      fontSize: moderateScaling(16),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      color: isDark ? colors.lightPurple : colors.iconColor,
      marginTop: moderateScaling(2),
    },
    // ── HeaderIconButton ───────────────────────────────────────────────────────
    iconButton: {
      width: moderateScaling(38),
      height: moderateScaling(38),
      borderRadius: moderateScaling(19),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? colors.darkInputcolor : colors.white,
      borderWidth: 1,
      borderColor: isDark ? '#3E4B78' : colors.backButtonColor,

      ...(!isDark && {
        shadowColor: colors.white,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }),
    },
    buttonIcon: {
      fontSize: moderateScaling(17),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScaling(16),
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuButton: {
      width: moderateScaling(38),
      height: moderateScaling(38),
      borderRadius: moderateScaling(19),
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: isDark ? colors.white : colors.white,
      borderWidth: 1,
      borderColor: isDark ? colors.lightPurple : colors.backButtonColor,

      ...(!isDark && {
        shadowColor: colors.white,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }),
    },
    menuIcon: {
      height: moderateScaling(30),
      width: moderateScaling(30),
      overflow: 'visible',
    },
    greetingColumn: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginLeft: moderateScaling(15),
    },
    welcomeText: {
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      fontSize: moderateScaling(10),
      lineHeight: moderateScaling(12),
      textAlign: 'left',
    },
    nameText: {
      fontFamily: PRIMARY_FONT_OBJECT[600],
      fontSize: moderateScaling(16),
      lineHeight: moderateScaling(20),
      fontWeight: '600',
      textAlign: 'left',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScaling(10),
    },
    tabWrapper: {
      paddingVertical: moderateScaling(5),
      marginHorizontal: moderateScaling(15),
      borderRadius: moderateScaling(18),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: moderateScaling(25),
      marginBottom: moderateScaling(10),
    },
    tabPill: {
      position: 'absolute',
      top: moderateScaling(5),
      bottom: moderateScaling(5),
      borderRadius: moderateScaling(14),
    },
    tabLabelStack: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabLabelAbsolute: {
      position: 'absolute',
    },
    tab: {
      paddingHorizontal: moderateScaling(10),
      paddingVertical: moderateScaling(8),
      borderRadius: moderateScaling(14),
    },
    tabText: {
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '500',
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(16),
    },
    selectedTab: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      overflow: 'hidden',
      backgroundColor: isDark ? colors.activeTab : colors.white,
    },
    tabTextActive: {
      fontFamily: PRIMARY_FONT_OBJECT[600],
    },
    placeholderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScaling(80),
    },
    placeholderText: {
      fontFamily: PRIMARY_FONT_OBJECT[600],
      fontSize: moderateScaling(18),
      opacity: 0.4,
    },
    spacer: {
      height: moderateScaling(20),
    },
    hstack: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScaling(15),
    },
  });

export default getStyles;
