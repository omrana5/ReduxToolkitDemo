// ─────────────────────────────────────────────────────────────
//  navigation/stack/mainStack.styles.ts
// ─────────────────────────────────────────────────────────────

import { StyleSheet } from 'react-native';
import { moderateScaling } from 'AppUtils/styleHelper';
import { ColorsType } from 'AppTypes';

const getStyles = (colors: ColorsType, isDark: boolean) =>
  StyleSheet.create({
    backIconView: {
      position: 'absolute',
      left: 0,
      height: moderateScaling(36),
      width: moderateScaling(36),
      backgroundColor: colors.blurBg,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateScaling(9),
      marginLeft: moderateScaling(15),
      borderWidth: isDark ? StyleSheet.hairlineWidth : 0,
      borderColor: isDark ? colors.backIconBgcolor : colors.transparent,
      shadowColor: isDark ? colors.transparent : colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    iconStyle: {
      fontSize: moderateScaling(15),
      color: colors.textTitleColor,
    },
    iconButton: {
      width: moderateScaling(38),
      height: moderateScaling(38),
      borderRadius: moderateScaling(19),
      alignItems: 'center',
      justifyContent: 'center',
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
  });

export default getStyles;
