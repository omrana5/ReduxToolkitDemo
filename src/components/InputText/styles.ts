import { moderateScaling } from "AppUtils/styleHelper";
import { ColorsType, CustomStyles } from "AppTypes";
import { PRIMARY_FONT_OBJECT } from "AppTheme/fonts";

const styles = (colors: ColorsType) =>
  ({
    containerStyle: {},
    sliderViewStyle: { marginTop: moderateScaling(-12) },
    inputContainer: {
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: moderateScaling(12),
    },
    centerStyle: {
      alignItems: "center",
      flexDirection: "row",
    },
    labelPadding: {
      paddingHorizontal: moderateScaling(5),
    },
    requiredText:{
      color: colors.error,
    },
    label: {
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(16),
      color: colors.textTitleColor,
      fontFamily: PRIMARY_FONT_OBJECT[400],
    },
    input: {
      flex: 1,
      fontSize: moderateScaling(16),
      fontFamily: PRIMARY_FONT_OBJECT[500],
      color: colors.black,
      backgroundColor: colors.transparent,
      paddingHorizontal: moderateScaling(12),
    },
    inputMarginStyle: {
      marginLeft: moderateScaling(8),
    },
    accessoryContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: colors.error,
    },
    errorContainerStyle: {
      borderWidth: 1,
      borderColor: colors.error,
    },
    errorText: {
      fontSize: moderateScaling(12),
      lineHeight: moderateScaling(16),
      color: colors.error,
      marginLeft: moderateScaling(2),
      marginTop: moderateScaling(6),
      fontFamily: PRIMARY_FONT_OBJECT[400],
    },
    description: {
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(19.6),
      color: colors.taupe,
      marginTop: moderateScaling(2),
      marginLeft: moderateScaling(1),
      letterSpacing: 0.32,
      textAlign: "left",
      fontFamily: PRIMARY_FONT_OBJECT[400],
    },
  } satisfies CustomStyles);

export default styles;
