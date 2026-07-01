import React, { useMemo } from "react";
import { View, TouchableOpacity, Pressable, StatusBar, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "AppContex/hooks/useApp";

import CustomText from "AppComponents/CustomText";
import InputText from "AppComponents/InputText";

import getStyles from "./styles";

interface CustomTopNavHeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIconSize?: number;
  rightIconSize?: number;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  searchPlaceholder?: string;
}

export const CustomTopNavHeader: React.FC<CustomTopNavHeaderProps> = ({
  title = "",
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showLeftIcon = true,
  showRightIcon = true,
  leftIconSize = 24,
  rightIconSize = 24,
  showSearch = false,
  searchValue = "",
  onSearchChange,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      navigation.goBack();
    }
  };

  const { colors, appTheme, hasInternet } = useApp();
  const isDark = appTheme === "dark";
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <View
      style={[
        styles.safeArea,
      { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : insets.top }
      ]}
    >
      {/* ✅ Make StatusBar transparent so it blends with your header bg */}
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <View style={[styles.container, showLeftIcon && styles.mb]}>
        {/* LEFT ICON */}
        <View style={styles.leftContainer}>
          {showLeftIcon && (
            <TouchableOpacity
              style={[
                styles.iconButton,
                { width: leftIconSize + 16, height: leftIconSize + 16 },
              ]}
              onPress={handleLeftPress}
              activeOpacity={0.7}
            >
              {leftIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* CENTERED TITLE */}
        <View style={styles.titleContainer}>
          <CustomText variant={"subtitle"} style={styles.title}>
            {title}
          </CustomText>
        </View>

        {/* RIGHT ICON */}
        <View style={styles.rightContainer}>
          {showRightIcon && (
            <TouchableOpacity
              style={[
                styles.iconButton,
                { width: rightIconSize + 16, height: rightIconSize + 16 },
              ]}
              onPress={onRightPress}
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          )}

          {showSearch && (
            <Pressable
              style={styles.hskack}
              onPress={() => {}}
            >
              <CustomText variant="body" style={styles.addText}>
                Add New
              </CustomText>
            </Pressable>
          )}
        </View>
      </View>

      {!hasInternet && (
        <View style={styles.header}>
          <CustomText variant={"body"}>No internet connection</CustomText>
        </View>
      )}

      {showSearch && (
        <View style={styles.searchContainer}>
          <InputText
            isRequired={false}
            importantForAutofill={"yes"}
            value={searchValue}
            blurOnSubmit={false}
            onChangeText={onSearchChange}
            autoCapitalize={"none"}
            returnKeyType={"next"}
            placeholder={"Search"}
            keyboardType={"email-address"}
            textInputStyle={styles.searchInputStyle}
            inputContainerStyle={styles.searchContainerView}
          />
        </View>
      )}
    </View>
  );
};