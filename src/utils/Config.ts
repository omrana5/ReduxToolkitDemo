import Config from "react-native-config-encrypted"; //?! This as double import anywhere in project won't work
import ConfigProvider from "react-native-config";
import { key } from "./encKey";

Config.configure({
  key: key,
  provider: ConfigProvider,
});

function getConfigValue(value: string): string {
  return Config.get(value, true);
}

const config = {
  APP_VERSION: "0.0.1",
  ANDROID_VERSION_CODE: "1",
  IOS_BUILD_NUMBER: "1",
  HTTPS_PROTOCOL: getConfigValue("HTTPS_PROTOCOL"),
  HTTP_PROTOCOL: getConfigValue("HTTP_PROTOCOL"),
  REST_ENDPOINT: getConfigValue("REST_ENDPOINT"),
};

export default config;
