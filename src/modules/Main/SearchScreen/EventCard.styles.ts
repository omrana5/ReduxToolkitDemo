import { StyleSheet } from 'react-native';
import { ColorsType } from 'AppTypes';
import { moderateScaling } from 'AppUtils/styleHelper';
import { PRIMARY_FONT_OBJECT } from 'AppTheme/fonts';

// ─── Design tokens ────────────────────────────────────────────────────────────

export const DATE_COLOR      = '#4A9B6F';   // green date text (teal-green from screenshot)
export const LOCATION_COLOR  = '#9E9E9E';   // light grey location
export const PRICE_COLOR     = '#757575';   // slightly darker grey price
export const TAG_BG          = '#F5F5F5';   // tag pill background
export const TAG_BORDER      = '#F5F7FC';   // tag pill border
export const TAG_TEXT        = '#181A1F';   // tag text
export const DIVIDER_COLOR   = '#EEEEEE';   // card separator line
export const FAVOURITE_COLOR = '#4CAF50';   // filled green heart

export const THUMBNAIL_SIZE  = moderateScaling(70);
export const TAG_RADIUS      = moderateScaling(6);

const getStyles = (colors: ColorsType, isDark: boolean) =>
  StyleSheet.create({

    // ── Card container ─────────────────────────────────────────────────────
    cardContainer: {
      paddingHorizontal: moderateScaling(10),
      paddingVertical:   moderateScaling(10),
      borderRadius:moderateScaling(12),
      backgroundColor:   isDark ? colors.darkBG : colors.white,
      marginVertical:moderateScaling(6)
    },

    cardRow: {
      flexDirection: 'row',
      alignItems:    'flex-start',
      gap:           moderateScaling(12),
    },

    // ── Thumbnail ──────────────────────────────────────────────────────────
    thumbnail: {
      width:        THUMBNAIL_SIZE,
      height:       THUMBNAIL_SIZE,
      borderRadius: moderateScaling(8),
      backgroundColor: isDark ? colors.darkTabColor : TAG_BG,
    },

    // ── Right content block ────────────────────────────────────────────────
    contentBlock: {
      flex: 1,
      gap:  moderateScaling(3),
    },

    // ── Row 1: Title + arrow ───────────────────────────────────────────────
    titleRow: {
      flexDirection:  'row',
      alignItems:     'flex-start',
      justifyContent: 'space-between',
      gap:            moderateScaling(6),
    },

    title: {
      flex:        1,
      fontSize:    moderateScaling(15),
      fontFamily:  PRIMARY_FONT_OBJECT[600],
      color:       isDark ? colors.white : colors.homeNameColor,
      lineHeight:  moderateScaling(20),
    },

    arrowIcon: {
      marginTop: moderateScaling(2),
    },

    // ── Row 2: Date + location ─────────────────────────────────────────────
    metaRow: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
    },

    date: {
      fontSize:   moderateScaling(12),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      color:      DATE_COLOR,
      flexShrink: 1,
    },

    location: {
      fontSize:   moderateScaling(11),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      color:      LOCATION_COLOR,
      textAlign:  'right',
      marginLeft: moderateScaling(8),
    },

    // ── Row 3: Price ───────────────────────────────────────────────────────
    price: {
      fontSize:   moderateScaling(12),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      color:      isDark ? colors.lightPurple : PRICE_COLOR,
    },

    // ── Row 4: Tags + action icons ─────────────────────────────────────────
    bottomRow: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
      marginTop:      moderateScaling(4),
    },

    tagsWrap: {
      flexDirection: 'row',
      flexWrap:      'wrap',
      gap:           moderateScaling(4),
      flex:          1,
      marginRight:   moderateScaling(8),
    },

    tag: {
      borderWidth:   1,
      borderColor:   isDark ? colors.darkBGBlue : TAG_BORDER,
      borderRadius:  moderateScaling(15),
      paddingHorizontal: moderateScaling(8),
      paddingVertical:   moderateScaling(2),
      backgroundColor: isDark ? colors.darkTabColor : TAG_BG,
    },

    tagText: {
      fontSize:   moderateScaling(11),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      color:      isDark ? colors.lightPurple : TAG_TEXT,
      lineHeight: moderateScaling(16),
    },

    // ── Action icons ───────────────────────────────────────────────────────
    actionsRow: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           moderateScaling(10),
    },

    actionBtn: {
      padding: moderateScaling(2),
    },

    // ── Divider ────────────────────────────────────────────────────────────
    divider: {
      height:          1,
      backgroundColor: isDark ? colors.darkBGBlue : DIVIDER_COLOR,
      marginHorizontal: moderateScaling(16),
    },
  });

export type EventCardStyles = ReturnType<typeof getStyles>;
export default getStyles;
