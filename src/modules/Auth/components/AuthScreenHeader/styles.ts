import { StyleSheet } from "react-native";

import type { ColorsType } from "AppTypes";
import { moderateScaling } from "AppUtils/styleHelper";

import {
  AUTH_ONBOARDING_COLORS,
  AUTH_ONBOARDING_RADIUS,
} from "../../constants/onboarding.constants";

const getStyles = (colors: ColorsType, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: moderateScaling(56),
      marginBottom: moderateScaling(24),
      paddingHorizontal: moderateScaling(16),
    },
    backButton: {
      position: "absolute",
      left: moderateScaling(16),
      width: moderateScaling(40),
      height: moderateScaling(40),
      borderRadius: moderateScaling(AUTH_ONBOARDING_RADIUS.backButton),
      backgroundColor: isDark ? colors.darkInputcolor : colors.white,
      borderWidth: 1,
      borderColor: isDark
        ? colors.backButtonBorderColor
        : colors.backButtonColor,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    backIcon: {
      fontSize: moderateScaling(15),
      color: colors.skyBlue,
    },
    title: {
      fontSize: moderateScaling(18),
      fontWeight: "600",
      color: isDark ? colors.white : AUTH_ONBOARDING_COLORS.textPrimary,
      textAlign: "center",
    },
  });

export default getStyles;
