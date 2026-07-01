import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { navigationRef } from "./actions";
import { RootNavigator } from "./navigation/RootNavigator";

/**
 * React Navigation entry point.
 * Mounts the root navigator and wires it to the typed `navigationRef`.
 */
const Routes: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Routes;

