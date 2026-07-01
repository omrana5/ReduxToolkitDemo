import { StyleSheet } from "react-native";
import { moderateScaling } from "AppUtils/styleHelper";
import type { ColorsType } from "AppTypes";

const getStyles = (colors: ColorsType, isDark: boolean) =>
  StyleSheet.create({
    rightView: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.white,
      paddingRight: moderateScaling(8),
    },
    historyIcon: {
      width: moderateScaling(18),
      height: moderateScaling(18),
      color: colors.iconColor,
    },
    rightIcon: {
      color: colors.iconColor,
      fontSize: moderateScaling(12),
      lineHeight: moderateScaling(18),
    },
    containerWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      overflow:'hidden',
      backgroundColor: isDark ? colors.tabBackGround : colors.white,
      paddingTop: moderateScaling(10),
      paddingBottom: moderateScaling(7),
      paddingHorizontal: moderateScaling(20),
      borderTopColor: isDark
        ? colors.backButtonBorderColor
        : colors.drawerBorder,
      borderStartColor: isDark
        ? colors.backButtonBorderColor
        : colors.drawerBorder,
      borderEndColor: isDark
        ? colors.backButtonBorderColor
        : colors.drawerBorder,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.14,
      shadowRadius: 14,
      elevation: 12,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: moderateScaling(12),
      paddingTop: moderateScaling(6),
      paddingBottom: moderateScaling(10),
    },
    iconButton: {
      width: moderateScaling(38),
      height: moderateScaling(38),
      borderRadius: moderateScaling(19),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? colors.darkInputcolor : colors.white,
      borderWidth: 1,
      borderColor: isDark
        ? colors.backButtonBorderColor
        : colors.backButtonColor,
      shadowColor: colors.white,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    buttonIcon: {
      fontSize: moderateScaling(16),
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      paddingVertical: moderateScaling(10),
    },
    iconStyle: {
      height: moderateScaling(18),
      width: moderateScaling(18),
      alignSelf: "center",
    },

    label: {
      fontSize: moderateScaling(10),
      lineHeight: moderateScaling(14),
      color: colors.tabIconcolor,
      marginTop: moderateScaling(4),
    },
    labelActive: {
      color: isDark ? colors.white : colors.black,
    },
    darkGradientFill: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    // Dark mode gradient wrapper
    blurWrapper: {
      backgroundColor: "transparent",
      paddingHorizontal: moderateScaling(12),
      paddingTop: moderateScaling(6),
      paddingBottom: moderateScaling(10),
      borderRadius: moderateScaling(16),
      overflow: "hidden",
    },
    fillGradient: {
      width: "100%",
    },
    liquidGlassTab: {
      borderRadius: moderateScaling(14),
      // overflow: 'hidden',
    },

    liquidGlassTabFocused: {
      shadowColor: isDark ? colors.skyBlue : colors.skyBlue,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: moderateScaling(8),
      elevation: 4,
    },

    tabTouchable: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      paddingVertical: moderateScaling(10),
    },
  });

export default getStyles;
