import React, { useMemo } from "react";
import {  View } from "react-native";

import CustomText from "AppComponents/CustomText";
import { useApp } from "AppContex/hooks/useApp";
import { goBack } from "AppRoutes/actions";

import getStyles from "./styles";

export interface AuthScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const AuthScreenHeader: React.FC<AuthScreenHeaderProps> = ({
  title,
  onBackPress,
}) => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === "dark";
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    goBack();
  };

  return (
    <View style={styles.container}>
      {/* <Pressable
        style={styles.backButton}
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <CustomIcon name="backArrow" style={styles.backIcon} />
      </Pressable> */}
      <CustomText style={styles.title}>{title}</CustomText>
    </View>
  );
};

export default AuthScreenHeader;
