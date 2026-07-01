import { StyleSheet } from "react-native";

import { ColorsType } from "AppTypes";
import { moderateScaling } from "AppUtils/styleHelper";
import { PRIMARY_FONT_OBJECT } from "AppTheme/fonts";

const getStyles = (colors: ColorsType, isDark: boolean) => {
  return StyleSheet.create({
    safeArea: {
      backgroundColor:isDark ? colors.appThemeColor: colors.homeBackground,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: moderateScaling(15),
      backgroundColor:isDark ? colors.appThemeColor: colors.homeBackground,
    },
    mb: {
      marginBottom: moderateScaling(10),
    },
    bglightImage: {
      width: moderateScaling(220),
      height: moderateScaling(100),
      borderBottomRightRadius: moderateScaling(50),
      borderBottomLeftRadius: moderateScaling(50),
      resizeMode: "contain",
      alignSelf: "center",
      position: "absolute",
      zIndex: 9999,
      overflow: "hidden",
    },
    leftContainer: {
      flex: 1,
      alignItems: "flex-start",
    },
    titleContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: moderateScaling(5),
      marginTop:moderateScaling(15),
      paddingBottom: moderateScaling(10),
    },
    title: {
      fontFamily: PRIMARY_FONT_OBJECT[500],
      fontSize: moderateScaling(16),
      lineHeight: moderateScaling(22),
      fontWeight:'500',
      color: colors.homeNameColor,
    },
    rightContainer: {
      flex: 1,
      alignItems: "flex-end",
    },
    iconButton: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: moderateScaling(8),
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingBottom: 12,
      paddingTop: 8,
    },
    hskack: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: moderateScaling(5),
    },
    searchInputStyle: {
      backgroundColor: colors.transparent,
      fontSize: moderateScaling(14),
      fontFamily: PRIMARY_FONT_OBJECT[500],
      borderRadius: moderateScaling(50),
      height: moderateScaling(43),
    },
    searchContainerView: {
      borderRadius: moderateScaling(50),
      backgroundColor: colors.addressBlur,
      justifyContent: "center",
      borderWidth: 0,
    },
    iconStyle: {
      color: colors.searchIconColor,
      fontSize: moderateScaling(15),
    },
    eyeTouchable: {
      flex: 1,
      alignSelf: "center",
      justifyContent: "center",
      marginLeft: moderateScaling(14),
    },
    subText: {
      fontFamily: PRIMARY_FONT_OBJECT[500],
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(22),
      color: colors.activeTabIconcolor,
    },
    addText: {
      fontFamily: PRIMARY_FONT_OBJECT[500],
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(22),
      color: colors.skyBlue,
      marginHorizontal: moderateScaling(2),
    },
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: moderateScaling(10),
      backgroundColor: colors.addressBlur,
      padding: moderateScaling(10),
    },
    internerStyle: {
      fontSize: moderateScaling(18),
      fontFamily: PRIMARY_FONT_OBJECT[500],
      color: colors.skyBlue,
      alignSelf: "center",
      marginHorizontal: moderateScaling(10),
    },
  });
};

export default getStyles;
