// styles.ts - Updated with sticky background styles
import { StyleSheet } from 'react-native';

import { ColorsType } from 'AppTypes';
import { moderateScaling } from 'AppUtils/styleHelper';
import { PRIMARY_FONT_OBJECT } from 'AppTheme/fonts';
import { lightTheme } from 'AppTheme/Colors';

const getStyles = (colors: ColorsType, isDark: boolean) => {
  return StyleSheet.create({
    authModuleContainer: {
      flex: 1,
      backgroundColor: colors.homeBackground,
    },

    backgroundImage: {
      width: moderateScaling(380),
      aspectRatio: 380 / 190,
      alignSelf: 'center',
      marginTop: moderateScaling(20),
    },
    bglightImage: {
      width: moderateScaling(240),
      height: moderateScaling(140),
      resizeMode: 'cover',
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    },
    oronLogo: {
      width: moderateScaling(291),
      aspectRatio: 1,
      resizeMode: 'contain',
      alignSelf: 'center',
      position: 'absolute',
      top: 25,
    },
    logoSpacer: {
      height: moderateScaling(230), // Adjust based on your logo size
    },
    scrollContent: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    textStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      fontSize: moderateScaling(72),
      lineHeight: moderateScaling(86),
      color: isDark ? colors.white : colors.homeNameColor,
    },
    forgottextStyle: {
      alignSelf: 'flex-end',
      textAlign: 'right',
      marginTop: moderateScaling(10),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      fontSize: moderateScaling(12),
      lineHeight: moderateScaling(16),
      color: isDark ? colors.white : colors.iconColor,
      letterSpacing: 0.3,
    },
    subTextStyle: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontSize: moderateScaling(16),
      lineHeight: moderateScaling(20),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      width: moderateScaling(250),
      color: isDark ? colors.lightPurple : colors.iconColor,
    },
    continueTextStyle: {
      alignSelf: 'center',
      textAlign: 'left',
      fontWeight: '600',
      fontFamily: PRIMARY_FONT_OBJECT[600],
      fontSize: moderateScaling(18),
      lineHeight: moderateScaling(22),
      color: isDark ? colors.white : colors.homeNameColor,
      letterSpacing: 0.3,
      marginTop: moderateScaling(20),
    },
    flexOne: {
      position: 'absolute',
      left: moderateScaling(20),
      top: moderateScaling(30),
    },
    fieldView: {
      flex: 0.7,
      paddingHorizontal: moderateScaling(20),
      paddingTop: moderateScaling(30),
      backgroundColor: isDark ? colors.darkBG : colors.white,
      marginTop: moderateScaling(20),
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: isDark ? colors.darkBorderColor : colors.borderCream,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowOpacity: 0.04,
      shadowRadius: 17,
      elevation: 8,
    },
    passwordContainer: {
      marginTop: moderateScaling(20),
    },
    inputTextStyle: {
      fontSize: moderateScaling(14),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      height: moderateScaling(43),
      color: isDark ? colors.white : colors.iconColor,
    },
    inputContainerStyle: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25, // #40 = 64/255 ≈ 0.25
      shadowRadius: 4,
      elevation: 4, // Android
    },
    marginLabelStyles: {
      marginBottom: moderateScaling(6),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight: '400',
      fontSize: moderateScaling(16),
      color: isDark ? colors.white : colors.homeNameColor,
    },
    eyeTouchable: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: moderateScaling(8),
    },
    iconStyle: {
      fontSize: moderateScaling(20),
      color: colors.borderColor,
    },
    forgotPasswordButtonText: {
      color: colors.skyBlue,
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(19.6),
      fontWeight: '500',
      alignSelf: 'flex-end',
    },
    rememberButtonText: {
      color: isDark ? colors.lightPurple : colors.fontcolor,
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(19.6),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      marginLeft: moderateScaling(5),
    },
    noAccount: {
      color: isDark ? colors.lightPurple : colors.black,
      fontSize: moderateScaling(12),
      lineHeight: moderateScaling(14),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      alignSelf: 'flex-end',
      textAlign: 'center',
      marginTop: moderateScaling(10),
    },
    noAccountSignUp: {
      color: colors.black,
      fontSize: moderateScaling(12),
      lineHeight: moderateScaling(24),
      fontFamily: PRIMARY_FONT_OBJECT[500],
      alignSelf: 'center',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    continueButton: {
      height: moderateScaling(35),
      width: '30%',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      alignItems: 'center',
      borderRadius: moderateScaling(4),
      marginTop: moderateScaling(20),
      backgroundColor: colors.lightGreen,
    },
    googleSignInButton: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      borderRadius: moderateScaling(10),
      marginTop: moderateScaling(20),
      alignItems: 'center',
    },
    continueButtonText: {
      fontSize: moderateScaling(16),
      lineHeight: moderateScaling(24),
      color: colors.white,
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      fontWeight: '500',
      fontFamily: PRIMARY_FONT_OBJECT[500],
    },
    googleSignInText: {
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(24),
      color: isDark ? colors.lightPurple : colors.iconColor,
      textAlign: 'center',
      marginBottom: moderateScaling(4),
      letterSpacing: 0.5,
      alignSelf: 'center',
      fontWeight: '400',
    },
    googleIconStyle: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    disabledButtonStyle: {
      opacity: 0.5,
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateScaling(10),
    },
    hstack: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxIcon: {
      fontSize: moderateScaling(18),
      color: colors.textTitleColor,
    },
    orLoginContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 30,
    },
    line: {
      flex: 1,
      height: 0.5,
      backgroundColor: isDark ? colors.breakLineColor : colors.fontcolor,
    },
    text: {
      marginHorizontal: moderateScaling(10),
      color: isDark ? colors.lightPurple : colors.fontcolor,
      fontSize: moderateScaling(14),
    },
    guestText: {
      color: isDark ? colors.lightPurple : colors.iconColor,
      fontSize: moderateScaling(14),
      alignSelf: 'flex-end',
      marginTop: moderateScaling(10),
    },
    headerContainer: {
      justifyContent: 'space-between',
      width: '100%',
      marginTop: moderateScaling(10),
      marginVertical: moderateScaling(10),
      flex: 0.3,
    },
    inputIcon: {},
    svgIconStyle: {
      alignSelf: 'center',
    },
  });
};

export default getStyles;
