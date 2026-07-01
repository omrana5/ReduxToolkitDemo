import { isEmpty } from "lodash";
import {  Linking } from "react-native";





export const checkUrl = (string: string): boolean => {
  try {
    if (!isEmpty(string)) {
      return string.startsWith("http://") || string.startsWith("https://");
    } else {
      return false;
    }
  } catch (error) {
    if (error) {
      return false;
    } else {
      return false;
    }
  }
};

export const openLink = (url: string): void => {
  // Add http:// if missing
  const normalizedUrl =
    url?.startsWith("http://") || url?.startsWith("https://")
      ? url
      : `https://${url}`;

  Linking.canOpenURL(normalizedUrl)
    .then((supported: boolean) => {
      if (supported) {
        Linking.openURL(normalizedUrl);
      }
    })
    .catch(() => {
      //empty
    });
};

