import {
  DrawerActionHelpers,
  NavigationHelpers,
  ParamListBase,
  StackActionHelpers,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { RootStackParamList } from "AppRoutes/types";

export interface Params {
  [key: string]: AppAnyType;
}
export interface CustomStyles {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

export type AppAnyType = any;

// type ResponseType = Promise<AxiosResponse | undefined | boolean>;

export type CustomDrawerProps = DefaultInterface;
export type NavBarProps = DefaultInterface;
export type SplashScreenProps = DefaultInterface;

export interface syncSubscriptionVariables {
  spaceId: number;
  revenueCatSubscriptionId?: string;
  transactionId?: string;
}

export interface StoreInterface {
  sampleStore?: AppAnyType;
  [key: string]: AppAnyType;
}

type CustomNavigationType = StackActionHelpers<ParamListBase> &
  NavigationHelpers<ParamListBase> &
  DrawerActionHelpers<ParamListBase> &
  NavigationProp<ParamListBase>;

export interface NavigationInterface {
  navigation: CustomNavigationType;
  route: AppAnyType;
}

interface CommonInterface extends NavigationInterface {
  route?: AppAnyType;
}

type DefaultInterface = CommonInterface & StoreInterface;

export interface CustomMenuType {
  iconName: string;
  title: string;
  onPress: () => void;
  rightIcon?: string;
  bottomLine?: boolean;
  isInChina?: boolean;
}

export interface ContactValue {
  firstName?: string;
  lastName?: string;
  emails?: string;
  numbers?: number;
}

export interface ImagePickerResponse {
  path: string;
  didCancel?: boolean;
  error?: string;
  data?: string;
}

export interface ImageData {
  mime?: string;
  path: string;
  data?: string;
  name?: string;
  size?: number;
  width?: number;
  height?: number;
  data?: string;
  url?: string;
}

export interface ImageSize {
  width: number;
  height: number;
}

export interface FileObject {
  uri: string;
  name: string;
  type: string;
}

export interface RecognizedText {
  recognized_text: string;
  confidence: string;
}

export interface TextFieldProps {
  fieldState: AppAnyType;
  inputOptions?: TextInputProps | AppAnyType;
  inputStyle?: StyleProp<TextStyle>;
  leftIconStyle?: StyleProp<TextStyle>;
  leftIcon?: string;
  label?: string;
  isSpecialChar?: boolean;
  isErrorShow?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  errorContainer?: ViewStyle;
  isNumeral?: boolean;
  containerStyle?: ViewStyle;
  keyboardType?: TextInputProps["keyboardType"];
  placeholderText?: string;
  rightIconStyle?: StyleProp<TextStyle>;
  rightIcon?: string;
  inputContainerStyle?: ViewStyle;
  rightIconPress?: () => void;
}

export interface MenuData {
  appId: string;
}
export interface userData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailConfirmed: boolean;
  roles: string[];
  rememberMe: boolean;
  isGoogleAuthenticatorEnabled: boolean;
  isEmailAuthenticatorEnabled: boolean;
  isAuthenticatorEnabledForLogIn: boolean;
}

export interface LoginResponse {
  user: UserData;
  accessToken: string;
  refreshToken?: string;
}

export interface TabItem {
  id: number;
  title: string;
  icon: string;
}

export interface SlideItem {
  key: string;
  title: string;
  text: string;
  iconName: string;
}

export interface GroupSelectionRef {
  closeDropdown: () => void;
}

export interface StorageData {
  key: string; // Unique key to identify the data
  date: string; // ISO date string of when the data was stored
  response: AppAnyType; // The actual data stored (can be any type)
}

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;
export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "Profile"
>;
export type SettingsScreenProps = StackScreenProps<
  RootStackParamList,
  "Settings"
>;
export type DetailsScreenProps = StackScreenProps<
  RootStackParamList,
  "Details"
>;

export type HomeTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "HomeTab">,
  StackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface AuthorThemeColor {
  backgroundColor?: string;
  textLight?: boolean;
}

export interface ThemeColors {
  bgColor: string;
  textColor: string;
  primaryBtnBgColor: string;
  primaryBtnTextColor: string;
  secondaryBtnBgColor: string;
  secondaryBtnTextColor: string;
  primaryActiveBtnBgColor: string;
  primaryActiveBtnTextColor: string;
  secondaryActiveBtnBgColor: string;
  secondaryActiveBtnTextColor: string;
}

export interface ColorsType {
  white: string;
  placeHolderTextColor: string;
  black: string;
  darkGrey: string;
  cardBoarder: string;
  lightGrey: string;
  blackOP85: string;
  primary: string;
  error: string;
  systemInactive: string;
  appTransparent: string;
  skyBlue: string;
  primaryText: string;
  offWhite: string;
  tabIconcolor: string;
  appThemeColor: string;
  fillInputbgThemeColor: string;
  backButtonBorderColor: string;
  darkThemeText: string;
  darkInputborder: string;
  darkInputcolor: string;
  blackTextColor: string;
  creamBackground: string;
  borderCream: string;
  googleBlackText: string;
  blueText: string;
  cream: string;
  neutral900: string;
  blackOP1: string;
  neutral200Cream: string;
  transparent: string;
  successToastColor: string;
  errorToastColor: string;
  errorBorder: string;
  addressappDarkBgback: string;
  androidappDarkBgback: string;
  iosappDarkBgback: string;
  skeletonColor: string;
  searchIconColor: string;
  modelborder: string;
  modalBgcolor: string;
  dropDownBgcolor: string;
  backIconBgcolor: string;
  cardBgColor: string;
  transparentBlack: string;
  taupe: string;
  darkLoginInput: string;
  darkLogininputborder: string;
  backButtonColor: string;
  iconColor: string;
  discriptionColor: string;
  otpContainerBorder: string;
  themeBoredrColor: string;
  inputbgThemeColor: string;
  homeBackground: string;
  cardBordercolor: string;
  clubBadgeBackground: string;
  buttonShadow: string;
  green: string;
  red: string;
  activeTab: string;
  oprationButtonBg: string;
  darkButtonShadow: string;
  appthemeColor: string;
  darkBlurColor: string;
  silverlightTheme: string;
  darkFontColor: string;
  lightGreen: string;
  clubBorderColor: string;
  revenewCardBorder: string;
  counterBgcolor: string;
  counterTimeBorder: string;
  lightSkyBlue: string;
  logoCircleBorder: string;
  usdfontColor: string;
  percenttextColor: string;
  gradiantBorder: string;
  standardTextColor: string;
  accountBadges: string;
  marginBgColor: string;
  accountAmountView: string;
  darkYellow: string;
  darkBlue: string;
  lightSkyBlueSecondary: string;
  balanceTextColor: string;
  depositButton: string;
  cardBG: string;
  homeNameColor: string;
  liveContestBorder: string;
  contestCardBg: string;
  tabBgcolor: string;
  timmerText: string;
  rewardBorder: string;
  dividerBorder: string;
  fontGreen: string;
  fontcolor: string;
  avatarBorder: string;
  skyBGcolor: string;
  skyBordercolor: string;
  iconHighlighterColor: string;
  contestWinngColor: string;
  bodyColor: string;
  mt5ElementBGColor: string;
  mt5ElementborderColor: string;
  buyTagBgcolor: string;
  shadowColor: string;
  backGroundSkylight: string;
  dodgerBlueOp12: string;
  subjectBgPill: string;
  chatBgblue: string;
  lightPurple: string;
  darkBG: string;
  darkBorderColor: string;
  inputDarkBgColor: string;
  inputDarkBorderColor: string;
  darkHighlightsArea: string;
  borderColor: string;
  contestCard: string;
  contestIconBG: string;
  darkTabColor: string;
  darkJoinBtn: string;
  darkBGBlue: string;
  activeTabColor:string;
  buttomText:string;
  darkBgColor:string;
  networkTabBGColor:string;
  networkTabBorderColor:string;
  networkTabActiveBGColor:string;
  blurBlurBG:string;
  darkLightSkyBlue:string;
  avatarBg:string;
  breakLineColor:string;
  tabBackGround:string;
  appBackground:string;
}

type RNStyle = ViewStyle | TextStyle | ImageStyle | AppAnyType;
export type StyleRecord = Record<
  string,
  RNStyle | ((...args: AppAnyType[]) => RNStyle | object)
>;

export enum DeviceType {
  PHONE = "mobile",
  TABLET = "tablet",
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: NotificationType;
}

export type NotificationType =
  | "deposit"
  | "withdrawal"
  | "password"
  | "maintenance"
  | "swap"
  | "general";

export interface NotificationSection {
  title: string;
  data: Notification[];
}

// ─────────────────────────────────────────────────────────────
//  Navigation param lists — re-exported from AppRoutes/types
// ─────────────────────────────────────────────────────────────

export type {
  AuthStackParamList,
  MainTabParamList,
  MainStackParamList,
  RootStackParamList,
} from "AppRoutes/types";
