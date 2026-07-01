import React from "react";
import {
  Text,
  TextProps,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
} from "react-native";
import { useApp } from "AppContex/hooks/useApp";
import { PRIMARY_FONT_OBJECT } from "AppTheme/fonts"; 
import { moderateScaling } from "AppUtils/styleHelper";

export type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "small"
  | "label"
  | "extraSmall"
  | "heading"
  | "subHeading"
  | "commonText";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: string; // optional override
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<TextStyle>;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = "body",
  color,
  style,
  onPress,
  ...rest
}) => {
  const { colors , appTheme } = useApp();
  const isDark = appTheme === 'dark';

  // base text styles without fontWeight
  const baseStyles: Record<TextVariant, TextStyle> = {
    title: {
      fontFamily: PRIMARY_FONT_OBJECT[700],
      fontSize: moderateScaling(28),
         fontWeight:'700',
      lineHeight: moderateScaling(36),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    subtitle: {
      fontFamily: PRIMARY_FONT_OBJECT[600],
      fontSize: moderateScaling(26),
         fontWeight:'600',
      lineHeight: moderateScaling(38),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    body: {
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontWeight:'400',
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(22),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    caption: {
      fontFamily: PRIMARY_FONT_OBJECT[400],
         fontWeight:'400',
      fontSize: moderateScaling(13),
      lineHeight: moderateScaling(18),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    small: {
      fontFamily: PRIMARY_FONT_OBJECT[300],
      fontSize: moderateScaling(12),
         fontWeight:'300',
      lineHeight: moderateScaling(16),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    label: {
      fontFamily: PRIMARY_FONT_OBJECT[500],
      fontSize: moderateScaling(24),
         fontWeight:'500',
      lineHeight: moderateScaling(26),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    extraSmall: {
      fontFamily: PRIMARY_FONT_OBJECT[400],
      fontSize: moderateScaling(10),
      lineHeight: moderateScaling(22),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    heading: {
      fontFamily: PRIMARY_FONT_OBJECT[600],
      fontSize: moderateScaling(16),
      lineHeight: moderateScaling(28),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    subHeading: {
      fontFamily: PRIMARY_FONT_OBJECT[500],
      fontSize: moderateScaling(13),
      lineHeight: moderateScaling(18),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
    commonText:{
      fontFamily: PRIMARY_FONT_OBJECT[500],
      fontSize: moderateScaling(12),
      lineHeight: moderateScaling(16),
      color: color || isDark ? colors.lightPurple : colors.iconColor,
    },
  };

  const textStyle = baseStyles[variant];

  return (
    <Text style={[textStyle, style]} onPress={onPress} {...rest}>
      {children}
    </Text>
  );
};

export default React.memo(CustomText);
