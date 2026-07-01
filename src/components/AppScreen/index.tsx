import React from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
}

const AppScreen = ({
  children,
  style,
  edges = ["top"],
}: ScreenProps) => {
  return (
    <SafeAreaView
      style={[{ flex: 1 }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;