// font.ts

export enum Fonts {
  GothicA1Thin = "GothicA1-Thin",
  GothicA1ExtraLight = "GothicA1-ExtraLight",
  GothicA1Light = "GothicA1-Light",
  GothicA1Regular = "GothicA1-Regular",
  GothicA1Medium = "GothicA1-Medium",
  GothicA1SemiBold = "GothicA1-SemiBold",
  GothicA1Bold = "GothicA1-Bold",
  GothicA1ExtraBold = "GothicA1-ExtraBold",
  GothicA1Black = "GothicA1-Black",
}

export const PRIMARY_FONT_OBJECT = {
  100: Fonts.GothicA1Thin,
  200: Fonts.GothicA1ExtraLight,
  300: Fonts.GothicA1Light,
  400: Fonts.GothicA1Regular,
  500: Fonts.GothicA1Medium,
  600: Fonts.GothicA1SemiBold,
  700: Fonts.GothicA1Bold,
  800: Fonts.GothicA1ExtraBold,
  900: Fonts.GothicA1Black,
} as const;