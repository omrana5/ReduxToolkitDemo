import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

import { useApp } from "AppContex/hooks/useApp";

import styles from "./styles";

interface ButtonProps extends Partial<PressableProps> {
  title: string;
  onPress: () => void;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextStyle;

  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;

  disabled?: boolean;
  loading?: boolean;
  indicatorColor?: string;
  isOverride?: boolean;
}

const CustomPress: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  textProps,
  leftComponent,
  rightComponent,
  loading = false,
  disabled = false,
  indicatorColor = "#FFFFFF",
  isOverride,
}) => {
  const { colors } = useApp();

  const combinedStyle = [
    style,
    !isOverride && styles.externalStyle,
  ];

  return (
    <Pressable
      style={combinedStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {leftComponent}

      {loading ? (
        <ActivityIndicator
          size="small"
          color={indicatorColor ?? colors.white}
        />
      ) : (
        <Text {...textProps} style={textStyle}>
          {title}
        </Text>
      )}

      {rightComponent}
    </Pressable>
  );
};

export default React.memo(CustomPress);