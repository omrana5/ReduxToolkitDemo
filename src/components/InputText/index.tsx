import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useApp } from "AppContex/hooks/useApp";

import { AppAnyType } from "AppTypes";

import useStyles from "./styles";

/**
 * Represents the props for the InputText component.
 * @interface InputTextProps
 */
interface InputTextProps extends Partial<TextInputProps> {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  leftAccessoryStyles?: StyleProp<ViewStyle>;
  extraLabelStyles?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  error?: boolean;
  displaySlider?: boolean;
  textProps?: TextProps;
  inputContainerStyle?: StyleProp<ViewStyle>;
  selectionColor?: string;
  errorText?: string;
  errorStyle?: StyleProp<TextStyle>;
  isRequired?: boolean;
  description?: string;
  descriptionStyle?: TextStyle;
  useBottomSheetInput?: boolean; 
  placeHolderColor?:string;
}

/**
 * InputText component with animated placeholder label and left/right accessories.
 * @param {InputTextProps} props - The props for the InputText component.
 * @returns {JSX.Element} - The rendered JSX element.
 */
const InputText: React.ForwardRefRenderFunction<TextInput, InputTextProps> = (
  props,
  forwardedRef
) => {
  const {
    label,
    value,
    onChangeText,
    leftAccessory,
    rightAccessory,
    containerStyle,
    leftAccessoryStyles,
    extraLabelStyles = {},
    textInputStyle = {},
    textProps,
    error = false,
    displaySlider = false,
    inputContainerStyle = {},
    selectionColor,
    errorStyle = {},
    errorText = "Please enter valid data",
    isRequired = false,
    placeHolderColor
    // NEW PROP
    // description,
    // descriptionStyle,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<AppAnyType>(null);
  const animation = useRef(new Animated.Value(0)).current;

  const { colors } = useApp();
  const styles = useStyles(colors);
  const ERROR_STYLE = { color: colors.error };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [animation, isFocused, value]);

  /**
   * Represents the style for the animated label.
   * @type {Animated.WithAnimatedObject<TextStyle>}
   */

  useEffect(() => {
    if (forwardedRef) {
      if (typeof forwardedRef === "function") {
        forwardedRef(inputRef.current);
      } else {
        forwardedRef.current = inputRef.current;
      }
    }
  }, [forwardedRef]);


  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {!!label && (
        <Text style={[styles.label, extraLabelStyles]} {...textProps}>
          {label}
          {isRequired && <Text style={styles.requiredText}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          error && styles.errorContainerStyle,
        ]}
      >
        <View style={!displaySlider && styles.centerStyle}>
          {leftAccessory && (
            <View style={[styles.accessoryContainer, leftAccessoryStyles]}>
              {leftAccessory}
            </View>
          )}

            <TextInput
              ref={inputRef}
              selectionColor={selectionColor ?? colors.taupe}
              style={[styles.input, textInputStyle]}
              onFocus={() => setIsFocused(true)}
              onEndEditing={(e) => {
                setIsFocused(false);
                if (props?.onEndEditing) {
                  props?.onEndEditing(e);
                }
              }}
              onChangeText={onChangeText}
              placeholderTextColor={placeHolderColor ?? colors.fontcolor}
              value={value}
              {...props}
            />

          {rightAccessory && (
            <View style={styles.accessoryContainer}>{rightAccessory}</View>
          )}
        </View>
      </View>
      {error && <Text style={[styles.errorText, errorStyle]}>{errorText}</Text>}
    </View>
  );
};

const InputTextComponent = React.forwardRef(InputText);

export default React.memo(InputTextComponent);
