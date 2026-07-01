import { isEmpty } from "lodash";

import { AuthorThemeColor, ThemeColors } from "AppTypes";
/**
 * Central color tokens: add new keys here and mirror them on `ColorsType` in `AppTypes`.
 * Replace module-level hex/rgba with `useApp().colors.<key>` or `getStyles(colors, isDark)`.
 */
const COMMON_COLORS = {
  white: "#FFFFFF",
  placeHolderTextColor: "#707070",
  black: "#000000",
  darkGrey: "#595959",
  cardBoarder: "#D0D0D0",
  lightGrey: "#D9D9D9",
  blackOP85: "rgba(95, 93, 93, 0.84)",
  primary: "#103362",
  error: "#FF0000",
  systemInactive: "#EEEEEE",
  appTransparent: "#00000000",
  skyBlue: "#00BDFF",
  primaryText: "#041B39",
  offWhite: "#F1F1F1",
  tabIconcolor: "#C8C8C8",
  blackTextColor: "#1A1714",
  creamBackground: "#FBF7F1",
  borderCream: "#E5E5E5",
  googleBlackText: "#6D6D6D",
  blueText: "#004BD9",
  cream: "#F0E4D1",
  neutral900: "#1A1714",
  blackOP1: "rgba(255, 255, 255, 0.1)",
  neutral200Cream: "#FAF4E8",
  transparent: "transparent",
  successToastColor: "#F6FFF9",
  errorToastColor: "#FFF5F3",
  errorBorder: "#F4B0A1",
  addressappDarkBgback: "rgba(255, 255, 255, 0.04)",
  androidappDarkBgback: "rgba(255, 255, 255, 0.06)",
  iosappDarkBgback: "rgba(255, 255, 255, 0.09)",
  skeletonColor: "#E0E0E0",
  searchIconColor: "#A2A2A2",
  modelborder: "#D2D2D2",
  dropdownborder: "#37465E",
  modalBgcolor: "#252C57",
  dropDownBgcolor: "#1f2750f8",
  backIconBgcolor: "rgba(255,255,255,0.1)",
  cardBgColor: "#2F2D5C",
  transparentBlack: "rgba(0, 0, 0, 0.08)",
  darkLoginInput: "#1D2132",
  darkLogininputborder: "#38344C",
  taupe: "#69655F",
  backButtonColor: "#E3E3E3",
  chatBgblue: "#00BDFF1F",
  iconColor: "#828282",
  profitShadowColor: "#D8D8D8",
  discriptionColor: "#80807F",
  otpContainerBorder: "#E1E8F0",
  inputbgThemeColor: "#F0FBFF",
  fillInputbgThemeColor: "#F0FBFF",
  themeBoredrColor: "#D2E7FF",
  appthemeColor: "#070C13",
  backButtonBorderColor: "#1C2737",
  darkThemeText: "#87A6BF",
  darkInputborder: "#1D2632",
  darkInputcolor: "#0F151D",
  darkOtpContainer: "#26364b74",
  redeemVocherBorder: "#A9E9FF",
  cardBordercolor: "#DEDEDE",
  clubBadgeBackground: "#1D91E5B2",
  buttonShadow: "#0F172A08",
  darkButtonShadow: "#0F172A05",
  green: "#16A274",
  lightGreen: "#21D393",
  fontGreen: "#637B00",
  red: "#FF3337",
  counterBorder: "#DFE9FF",
  counterShadow: "#739FFF",
  activeTab: "#263143",
  oprationButtonBg: "#1F2C3C",
  darkBlurColor: "#202832",
  silverlightTheme: "#EBEBEB",
  darkFontColor: "#A7B1BE",
  clubBorderColor: "#00BDFF4A",
  revenewCardBorder: "#313B48",
  counterBgcolor: "#1C2531",
  counterTimeBorder: "#2C3035",
  lightSkyBlue: "#DBF6FF",
  lightSkyBlueSecondary: "#DBF6FF",
  balanceTextColor: "#98B6DB",
  patternColor: "#D5D9EB",
  contestCardBg: "#E2E2E2",
  timmerText: "#637B00",
  rewardBorder: "#D7D7D7",
  dividerBorder: "#EDEDED",
  avatarBorder: "#D4D4D4",
  skyBGcolor: "#F9FDFF",
  skyBordercolor: "#CFF2FF",
  iconHighlighterColor: "#EDFAFF",
  contestWinngColor: "#858494",
  bodyColor: "#64748B",
  mt5ElementBGColor: "#F3FBFF",
  mt5ElementborderColor: "#BFEAFF",
  buyTagBgcolor: "#00BDFF40",
  
  shadowColor: "#0F172A",
  backGroundSkylight: "#00BDFF1A",
  dodgerBlueOp12: "#D1F5F0",
  subjectBgPill: "#E8F6FF",
  lightPurple: "#96A4D0",
  darkBG: "#0F152A",
  darkBorderColor: "#192245",
  inputDarkBgColor: "#0A1022",
  inputDarkBorderColor: "#242E4C",
  darkHighlightsArea: "#1D274B",
  contestCard:"#151E3F",
  contestIconBG:"#171E37",
  darkTabColor: "#00BDFF26",
  darkJoinBtn:"#2A3045",
  darkBGBlue:"#00bbff1f",
  activeTabColor:"#00bbff3d",
  darkBgColor:"#0E263F",
  networkTabBGColor:"#0E223B",
  networkTabBorderColor:"#0C4263",
  networkTabActiveBGColor:"#0A486C",
  blurBlurBG:"#0A5478",
  darkLightSkyBlue:"#00BDFF33",
  avatarBg: "#E6F9FF",
  breakLineColor:"#334071"
};

export const lightTheme = {
  colors: {
    blackOP60: "rgba(0, 0, 0, 0.60)",
    blurBg: "#FBFBFB",
    appBackground: "#FFFFFF",
    appThemeColor: "#FFFFFF",
    textTitleColor: "#1C3C60",
    subTextTitleColor: "#1C3C60",
    textbodyColor: "#6B7280",
    buttomText: "#FFFFFF",
    borderColor: "#CDD5DF",
    fontcolor: "#4F4F4F",
    text: "#3E424B",
    forgotPassword: "#00BDFF",
    authBackGround: "#F6F5FA",
    textBlack: "#2F3F53",
    activeTabIconcolor: "#15234F",
    tabBgcolor: "#F6F6F6",
    homeNameColor: "#333333",
    textColor: "#1C3C60",
    addressTheneColor: "#FFFFFF",
    addressBlur: "rgba(175, 171, 171, 0.14)",
    loginORcontainer: "#E6E6E6",
    tabBackGround: "#EFEFEF",
    usdfontColor: "#CEE4FF",
    bottomTabColor: "#FFFFFF",
    rankBadgeBg: "rgba(255,255,255,0.25)",
    voucherBGamount: "#36CBFF",
    depositButton: "#00BDFF4D",
    cardBG: "#F3F3F3",
    liveContestBorder: "#DADADA",
    ...COMMON_COLORS,
    drawerBackground: "#F2F3F5",
    drawerBorder: "#CCCCCC",
    drawerWarning: "#D4942B",
    drawerTextPrimary: "#1A1A2E",
    drawerPlaceholder: "#DDE0E6",
    drawerLogoutText: "#D4942B",
    drawerLogoutBorder: "#F0E4CC",
    kycPrimary: "#A86200",
    kycBackground: "rgba(168, 98, 0, 0.08)",
    kycBorder: "rgba(168, 98, 0, 0.25)",
    drawerTextSecondary: "#6B7280",
    drawerSurface: "#FFFFFF",
    ibBGcolor: "#E8F5FF",
    voucherColor: "#EBF4FF",
    homeBackground: "#F2F2F2",
  },
};

export const darkTheme = {
  colors: {
    homeBackground: "#040815",
    blackOP60: "rgba(0, 0, 0, 0.60)",
    blurBg: "#231F42",
    appBackground: "#00001F",
    appThemeColor: "#070C13",
    textTitleColor: "#FFFFFF",
    subTextTitleColor: "#768EB5",
    textbodyColor: "#7E93B3",
    buttomText: "#15234F",
    borderColor: "#7E93B3",
    fontcolor: "#9F9F9F",
    text: "#CDD5DF",
    rankBadgeBg: "#05B1EEB2",
    forgotPassword: "#FFFFFF",
    authBackGround: "#0D092E",
    textBlack: "#2F3F53",
    activeTabIconcolor: "#FFFFFF",
    homeNameColor: "#FFFFFF",
    textColor: "#7E93B3",
    addressTheneColor: "#0D092E",
    addressBlur: "rgba(255, 255, 255, 0.09)",
    addressItem: "rgba(255, 255, 255, 0.03)",
    tabBackGround: "#111822",
    tradIconBackGround: "#1E2F46",
    usdfontColor: "#CEE4FF",
    bottomTabColor: "#0F151D",
    depositButton: "#00BDFF4D",
    cardBG: "#F3F3F3",
    liveContestBorder: "#2A324E",
    ...COMMON_COLORS,
    drawerBackground: "#141E2B",
    drawerBorder: "#2C3035",
    drawerWarning: "#F4B213",
    drawerTextPrimary: "#FFFFFF",
    drawerPlaceholder: "#313B48",
    drawerLogoutText: "#F4B213",
    drawerLogoutBorder: "#313B48",
    kycPrimary: "#D89A3C",
    kycBackground: "rgba(216, 154, 60, 0.12)",
    kycBorder: "rgba(216, 154, 60, 0.35)",
    drawerTextSecondary: "#9CA3AF",
    drawerSurface: "#0F151D",
    ibBGcolor: "#1D2B3D",
    voucherColor: "#192638",
    voucherBGamount: "#16202D",
  },
};

export const getBgColor = (status: string | null): string => {
  switch (status) {
    case "Pending":
      return "#FFF4E5"; // amber background

    case "Completed":
      return "#E6F9F0"; // green background

    case "Cancelled":
      return "#E8F1FF"; // blue background

    case "Rejected":
      return "#FDECEC"; // red background

    case "Failed":
      return "#FDECEC"; // red background

    default:
      return "#FFFFFF";
  }
};

export const getTextColor = (status: string | null): string => {
  switch (status) {
    case "Pending":
      return "#F59E0B";

    case "Completed":
      return "#10B981";

    case "Cancelled":
      return "#2563EB";

    case "Failed":
      return "#EF4444";

    case "Rejected":
      return "#EF4444";

    default:
      return "#000000";
  }
};

export const getAuthorThemeColor = (
  key: string | undefined | null,
): AuthorThemeColor => {
  let stylesObj: AuthorThemeColor = {
    backgroundColor: "#aecacd",
    textLight: false,
  };

  switch (key) {
    case "bg-blue-2":
      stylesObj = {
        backgroundColor: "#aecacd",
        textLight: false,
      };
      break;
    case "bg-red-2":
      stylesObj = {
        backgroundColor: "#fe4819",
        textLight: true,
      };
      break;
    case "bg-yellow-2":
      stylesObj = {
        backgroundColor: "#f4b213",
        textLight: false,
      };
      break;
    case "bg-moss-2":
      stylesObj = {
        backgroundColor: "#a49562",
        textLight: false,
      };
      break;

    default:
      break;
  }
  return stylesObj;
};

// ? This function is used for CTA Block, Banner & Information Module
const baseTheme: Omit<ThemeColors, "bgColor" | "textColor"> = {
  primaryBtnBgColor: "#1A1714",
  primaryBtnTextColor: "#FBF7F1",
  secondaryBtnBgColor: "rgba(0,0,0,0)",
  secondaryBtnTextColor: "#1A1714",
  primaryActiveBtnBgColor: "#FBF7F1",
  primaryActiveBtnTextColor: "#1A1714",
  secondaryActiveBtnBgColor: "#FBF7F1",
  secondaryActiveBtnTextColor: "#1A1714",
};

const colorThemes: Record<string, Partial<ThemeColors>> = {
  NEUTRAL_300: { bgColor: "#F9EEDE", textColor: "#1A1714" },
  NEUTRAL_400: { bgColor: "#F0E4D1", textColor: "#1A1714" },
  NEUTRAL_900: {
    bgColor: "#1A1714",
    textColor: "#FFFFFF",
    primaryBtnBgColor: "#FBF7F1",
    primaryBtnTextColor: "#1A1714",
    secondaryBtnTextColor: "#FBF7F1",
    primaryActiveBtnBgColor: "#1A1714",
    primaryActiveBtnTextColor: "#FBF7F1",
    secondaryActiveBtnBgColor: "#FBF7F1",
    secondaryActiveBtnTextColor: "#1A1714",
  },
  BLUE: { bgColor: "#AECACD", textColor: "#1A1714" },
  BLUE_SHADE: {
    bgColor: "#465A66",
    textColor: "#FFFFFF",
  },
  BLUE_TINT: { bgColor: "#D2D9D8", textColor: "#1A1714" },
  MOSS: { bgColor: "#A49562", textColor: "#1A1714" },
  MOSS_TINT: { bgColor: "#C9BF95", textColor: "#1A1714" },
  YELLOW: { bgColor: "#F4B213", textColor: "#1A1714" },
  YELLOW_SHADE: {
    bgColor: "#806025",
    textColor: "#FBF7F1",
    primaryBtnBgColor: "#FBF7F1",
    primaryBtnTextColor: "#1A1714",
    secondaryBtnTextColor: "#FBF7F1",
    primaryActiveBtnBgColor: "#1A1714",
    primaryActiveBtnTextColor: "#FBF7F1",
    secondaryActiveBtnBgColor: "#1A1714",
    secondaryActiveBtnTextColor: "#FBF7F1",
  },
  "bg-blue-2": {
    bgColor: "#aecacd",
    textColor: "#1A1714",
    primaryBtnBgColor: "#FBF7F1",
    primaryBtnTextColor: "#1A1714",
    secondaryBtnTextColor: "#FBF7F1",
    primaryActiveBtnBgColor: "#1A1714",
    primaryActiveBtnTextColor: "#FBF7F1",
    secondaryActiveBtnBgColor: "#1A1714",
    secondaryActiveBtnTextColor: "#FBF7F1",
  },
};

const defaultTheme: ThemeColors = {
  bgColor: "#000000",
  textColor: "#FFFFFF",
  primaryBtnBgColor: "#FBF7F1",
  primaryBtnTextColor: "#1A1714",
  secondaryBtnBgColor: "rgba(0,0,0,0)",
  secondaryBtnTextColor: "#FBF7F1",
  primaryActiveBtnBgColor: "#1A1714",
  primaryActiveBtnTextColor: "#FBF7F1",
  secondaryActiveBtnBgColor: "#FBF7F1",
  secondaryActiveBtnTextColor: "#1A1714",
};

export const darkBottomTabGradiant = [
  "rgba(214, 214, 214, 0.1)",
  "rgba(214, 214, 214, 0.05)",
  "rgba(214, 214, 214, 0)",
];

export const buttonGradient = ["#66D7FF", "#00BDFF"];

export const darkfunctionalGradiant = ["#00BAFB", "#1DAAFF", "#149DFF"];

export const cardGradiant = ["#3286F0", "#00BDFF"];
export const darkCardGradiant = ["#051830", "#003559"];

export const statBoxDepositsGradient = ["#56C28A", "#33A7C7"];
export const statBoxWithdrawalsGradient = ["#FD647A", "#C76E9F"];
export const statBoxIBBalanceGradient = ["#00AFF3", "#009AD7"];

export const FALLBACK_DARK = {
  bg: ["#0F172A", "#1E293B"],
  borderColors: ["#1E293B", "#0F172A"],
  borderLocations: [0, 1],
};

export const FALLBACK_LIGHT = {
  bg: ["#FFFFFF", "#F1F5F9"],
  borderColors: ["#F1F5F9", "#FFFFFF"],
  borderLocations: [0, 1],
};

export function getThemeColors(key: string | undefined | null): ThemeColors {
  const theme = colorThemes[key ?? ""] ?? {};
  if (!isEmpty(theme)) {
    return { ...baseTheme, ...theme } as ThemeColors;
  }
  return { ...baseTheme, ...defaultTheme };
}

export const VARIANT_COLORS = {
  teal: {
    bg: statBoxDepositsGradient, // your existing gradient array
    borderColors: [
      "#53FFD7",
      "#49F3CB00",
      "#49F3CB00",
      "#FFFFFF99",
    ] as string[],
    borderLocations: [0, 0.23, 0.7056, 1] as number[],
  },
  pink: {
    bg: statBoxWithdrawalsGradient,
    borderColors: ["#FFFFFF", "#FFFFFF00", "#FFFFFF00", "#FFFFFF"] as string[],
    borderLocations: [0, 0.229, 0.7834, 1] as number[],
  },
  purple: {
    bg: statBoxIBBalanceGradient,
    borderColors: ["#7DDCFF", "#7DDCFFB2", "#7DDCFFB2", "#7DDCFF"] as string[],
    borderLocations: [0, 0.2629, 0.7628, 1] as number[],
  },
};

export const DARK_VARIANT_COLORS = {
  teal: {
    bg: ["#56C28A", "#33A7C7"], // your existing gradient array
    borderColors: [
      "#53FFD7",
      "#49F3CB00",
      "#49F3CB00",
      "#FFFFFF99",
    ] as string[],
    borderLocations: [0, 0.23, 0.7056, 1] as number[],
  },

  pink: {
    bg: ["#FD647A", "#C76E9F"],
    borderColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"] as string[],
    borderLocations: [0, 0.229, 0.7834, 1] as number[],
  },
  purple: {
    bg: ["#00AFF3", "#009AD7"],
    borderColors: ["#7DDCFF", "#7DDCFF", "#7DDCFF", "#7DDCFF"] as string[],
    borderLocations: [0, 0.2629, 0.7628, 1] as number[],
  },
};
