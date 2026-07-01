import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Platform,
  Pressable,
  Text,
  TextStyle,
  View,
} from 'react-native';
import Toast, { ToastConfig, ToastPosition } from 'react-native-toast-message';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


import { useApp } from 'AppContex/hooks/useApp';

import { CustomStyles } from 'AppTypes';

import useStyles from './styles';

interface ToastConfigProps {
  text1?: string;
}

interface ProgressToastProps extends ToastConfigProps {
  progressString?: string;
}

interface ToastTextProps {
  text1: string;
  color?: string;
  minWidth?: string;
}
interface ToastProviderProps {
  config: ToastConfig;
}

const DEFAULT_TOAST_POSITION: ToastPosition = 'top';
const toastOffset =
  Platform.OS === 'ios'
    ? getStatusBarHeight() + 100
    : getStatusBarHeight() * 2.2;

const ToastText: React.FC<ToastTextProps> = ({
  text1,
  color,
  minWidth = '70%',
}) => {
  const { colors } = useApp();
  const styles = useStyles(colors);
  const TEXT_STYLE: TextStyle = {
    minWidth: minWidth as DimensionValue,
    color: color ?? colors.white,
  };
  return <Text style={[styles.toastText, TEXT_STYLE]}>{text1}</Text>;
};

export const ToastProvider: React.FC<ToastProviderProps> = Toast;

/**
 * ShowSuccessToast function displays a success toast message.
 * @param message - The success message to be displayed.
 */
export const ShowInfoToast = (message: string): void => {
  Toast.show({
    type: 'info',
    text1: `${message}  \u2713`,
    position: DEFAULT_TOAST_POSITION,
    visibilityTime: 3000,
    topOffset: toastOffset,
  });
};
/**
 * ShowSuccessToast function displays a success toast message.
 * @param message - The success message to be displayed.
 */
export const ShowSuccessToast = (
  message: string,
  position: ToastPosition = DEFAULT_TOAST_POSITION,
): void => {
  Toast.show({
    type: 'success',
    text1: `${message}`,
    position: position,
    visibilityTime: 3000,
    topOffset: toastOffset,
  });
};

/**
 * ShowErrorToast function displays an error toast message.
 * @param message - The error message to be displayed.
 */
export const ShowErrorToast = (
  message: string = 'Something went wrong',
): void => {
  Toast.show({
    type: 'error',
    text1: message,
    position: DEFAULT_TOAST_POSITION,
    visibilityTime: 3000,
    topOffset: toastOffset,
  });
};

/**
 * ShowLoading function displays a loading toast message.
 */
export const ShowLoading = (text?:string): void => {
  Toast.show({
    type: 'loading',
    text1: text? text :`Loading...`,
    autoHide: false,
    position: DEFAULT_TOAST_POSITION,
    topOffset: toastOffset,
  });
};

/**
 * HideLoading function hides the loading toast.
 */
export const HideLoading = (): void => {
  HideToast();
};

/**
 * HideToast function hides the currently displayed toast.
 */
export const HideToast = (): void => {
  Toast.hide();
};

const SuccessToast = ({ text1 = '' }: ToastConfigProps): React.JSX.Element => {
  const { colors } = useApp();
  const styles = useStyles(colors);
  return (
    <View style={[styles.mainToastView as CustomStyles, styles.successToast]}>

      <View>
        <ToastText color={colors.textBlack} text1={text1} />
      </View>
    </View>
  );
};

const ErrorToast = ({ text1 = '' }: ToastConfigProps): React.JSX.Element => {
  const { colors } = useApp();
  const styles = useStyles(colors);
  return (
     <View style={[styles.mainToastView as CustomStyles, styles.errorToast]}>
      <View>
        <ToastText color={colors.textBlack} text1={text1} />
      </View>
    </View>



  );
};

const LoadingToast = ({ text1 = '' }: ToastConfigProps): React.JSX.Element => {
  const { colors } = useApp();
  const styles = useStyles(colors);
  return (
    <View style={[styles.mainToastLoadingView as CustomStyles, styles.successToast]}>
      <ActivityIndicator color={colors.textBlack} />
      <ToastText text1={text1} color={colors.textBlack} minWidth={'30%'} />
    </View>
  );
};

const ProgressToast = ({
  text1 = '',
  progressString,
}: ProgressToastProps): React.JSX.Element => {
  const { colors } = useApp();
  const styles = useStyles(colors);
  return (
    <View style={[styles.mainToastView, styles.loadingToast]}>
      <ToastText
        text1={text1 + progressString}
        color={colors.white}
        minWidth={'30%'}
      />
      <ActivityIndicator color={colors.white} />
    </View>
  );
};

/**
 * toastConfig object defines the configuration for different types of toasts.
 */
export const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
  loading: LoadingToast,
  progressToaster: ProgressToast,
};

