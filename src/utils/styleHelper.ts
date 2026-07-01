

import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { moderateScale } from 'react-native-size-matters';

/**
 * Represents the screen size information.
 */
interface ScreenSize {
  height: number;
  width: number;
}

type EmPxConverter = (em: number, fontSize: number) => number;

/**
 * Represents the device screen size.
 */
const { height, width }: ScreenSize = Dimensions.get('screen');

/**
 * Scales the provided value using moderate scale.
 * @param val - The value to be scaled.
 * @param factor - The scaling factor. Default is 0.4.
 * @returns The scaled value.
 */
export function moderateScaling(val: number): number {
  if (DeviceInfo.isTablet()) {
    return moderateScale(val, 0.1);
  }
  return moderateScale(val);
}


/**
 * Scales the provided value vertically.
 * @param val - The value to be scaled.
 * @param factor - The scaling factor. Default is 0.4.
 * @returns The scaled value.
 */
export function verticalScaling(val: number): number {
  return moderateScaling(val);
}

/**
 * Gets the actual screen width (considering the orientation).
 * @returns The actual screen width.
 */
export function getScreenActualWidth(): number {
  return height > width ? width : height;
}

/**
 * Gets the actual screen height (considering the orientation).
 * @returns The actual screen height.
 */
export function getScreenActualHeight(): number {
  return height > width ? height : width;
}

/**
 * Calculates the width based on the discount percentage and device width.
 * @param discountPercent - The discount percentage.
 * @param deviceWidth - The device width.
 * @returns The calculated width after applying the discount percentage.
 */
export const getPercentWidth = (discountPercent: number, deviceWidth: number): number => {
  discountPercent = discountPercent / 100;

  let totalValue = deviceWidth - deviceWidth * discountPercent;
  totalValue = deviceWidth - totalValue;
  if (totalValue <= 0) {
    totalValue = deviceWidth;
  }

  return totalValue;
};

/**
 * Calculates the image height based on the actual width and height.
 * @param actualWidth - The actual width (found in figma).
 * @param actualHeight - The actual height (found in figma).
 * @returns The calculated image height based on the aspect ratio.
 */
export function calculateImageHeight(
  actualWidth: number = getScreenActualWidth(),
  actualHeight: number = getScreenActualHeight(),
): number {
  // actualWidth = width found in figma
  // actualHeight = height found in figma
  // NOTE: this function calculates dynamic height responsive for any device for any platform based on ratio
  const aspectRatio = actualHeight / actualWidth;
  return actualWidth * aspectRatio;
}

// Implement the converter function
export const emPxConverter: EmPxConverter = (em, fontSize) => {
  // 1em is equal to the font size in pixels
  return moderateScaling(em * fontSize);
};

export const getWindowHeight = Dimensions.get('window').height;

export const getScreenDimensions = (): { width: number; height: number } => {
  const { width, height } = Dimensions.get('screen');
  return { width, height };
};
