import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { useApp } from "AppContex/hooks/useApp";
import { SvgIcon } from "AppComponents/SvgIcon";

import { getTabConfig } from "./tabConfig";
import getStyles from "./tabBar.styles";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CustomTabBarProps extends BottomTabBarProps {
  showLabels?: boolean;
}

interface TabAnimations {
  scales: Animated.Value[];
  opacities: Animated.Value[];
  translateYs: Animated.Value[];
  animate: (focusedIndex: number) => void;
}
type SpringConfig = Omit<Animated.SpringAnimationConfig, "toValue">;

// ─── Animation config ──────────────────────────────────────────────────────────

const SPRING_CONFIG: SpringConfig = {
  friction: 5,
  tension: 100,
  useNativeDriver: true,
};

const BOUNCE_CONFIG: SpringConfig = {
  friction: 4,
  tension: 100,
  useNativeDriver: true,
};

const OPACITY_DURATION = 200;
const TRANSLATE_DURATION = 150;

const FOCUSED_SCALE = 1.15;
const IDLE_SCALE = 1;
const FOCUSED_OPACITY = 1;
const IDLE_OPACITY = 0.6;
const FOCUSED_TRANSLATE_Y = -4;
const IDLE_TRANSLATE_Y = 0;

// ─── Hook: stable per-tab animated values ──────────────────────────────────────

function useTabAnimations(count: number): TabAnimations {
  const scales = useRef<Animated.Value[]>([]);
  const opacities = useRef<Animated.Value[]>([]);
  const translateYs = useRef<Animated.Value[]>([]);

  // Initialise animated values once; reinitialise only if tab count changes
  if (scales.current.length !== count) {
    scales.current = Array.from(
      { length: count },
      () => new Animated.Value(IDLE_SCALE),
    );
    opacities.current = Array.from(
      { length: count },
      () => new Animated.Value(IDLE_OPACITY),
    );
    translateYs.current = Array.from(
      { length: count },
      () => new Animated.Value(IDLE_TRANSLATE_Y),
    );
  }

  const animate = useCallback((focusedIndex: number): void => {
    const animations = scales.current.map(
      (scale, i): Animated.CompositeAnimation => {
        const isFocused = i === focusedIndex;

        return Animated.parallel([
          Animated.spring(scale, {
            toValue: isFocused ? FOCUSED_SCALE : IDLE_SCALE,
            ...SPRING_CONFIG,
          }),
          Animated.timing(opacities.current[i]!, {
            toValue: isFocused ? FOCUSED_OPACITY : IDLE_OPACITY,
            duration: OPACITY_DURATION,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(translateYs.current[i]!, {
              toValue: isFocused ? FOCUSED_TRANSLATE_Y : IDLE_TRANSLATE_Y,
              duration: TRANSLATE_DURATION,
              useNativeDriver: true,
            }),
            Animated.spring(translateYs.current[i]!, {
              toValue: IDLE_TRANSLATE_Y,
              ...BOUNCE_CONFIG,
            }),
          ]),
        ]);
      },
    );

    Animated.parallel(animations).start();
  }, []);

  return {
    scales: scales.current,
    opacities: opacities.current,
    translateYs: translateYs.current,
    animate,
  };
}

// ─── Component ─────────────────────────────────────────────────────────────────

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  showLabels = true,
}) => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === "dark";

  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const { scales, opacities, translateYs, animate } = useTabAnimations(
    state.routes.length,
  );

  // Run entrance / transition animation whenever the active tab changes
  useEffect(() => {
    animate(state.index);
  }, [state.index, animate]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handlePress = useCallback(
    (routeName: string, routeKey: string, isFocused: boolean): void => {
      const event = navigation.emit({
        type: "tabPress",
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [navigation],
  );

  const tabItems = state?.routes?.map((route, index): React.ReactNode => {
    const isFocused = state?.index === index;
    const config = getTabConfig(route?.name);

    if (!route?.name) {
      if (__DEV__)
        console.warn("[CustomTabBar] route.name is undefined at index", index);
      return null;
    }

    if (!config) return null;

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={config.accessibilityLabel}
        onPress={() => handlePress(route.name, route.key, isFocused)}
        style={styles.tabButton}
        activeOpacity={0.7}
      >
        {/* Icon with scale + translateY spring */}
        <Animated.View
          style={{
            opacity: opacities[index],
            transform: [
              { scale: scales[index] },
              { translateY: translateYs[index] },
            ],
          }}
        >
          <SvgIcon
            Icon={config.lightIconMode}
            style={styles.iconStyle}
          />
        </Animated.View>

        {/* Optional label fades with the opacity animation */}
        {showLabels && (
          <Animated.Text
            style={[
              styles.label,
              isFocused && styles.labelActive,
              { opacity: opacities[index] },
            ]}
          >
            {config?.label}
          </Animated.Text>
        )}
      </TouchableOpacity>
    );
  });

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.containerWrapper}>
      {tabItems}
    </View>
  );
};
