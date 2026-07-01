import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

export type SvgComponent = React.FC<SvgProps>;

export interface SvgIconProps extends Omit<SvgProps, "width" | "height"> {
  /** SVG component from `*.svg` import */
  Icon: SvgComponent;
  /** Sets both width and height when `width` / `height` are omitted */
  size?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Normalizes SVG imports to a consistent sizing API while preserving `SvgProps` passthrough
 * (`fill`, `stroke`, `opacity`, accessibility props, etc.).
 */
export const SvgIcon: React.FC<SvgIconProps> = ({
  Icon,
  size = 24,
  width,
  height,
  ...rest
}) => (
  <Icon
    width={width ?? size}
    height={height ?? size}
    {...rest}
  />
);
