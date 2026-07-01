import React, { memo, useCallback, useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import CustomText from 'AppComponents/CustomText';
import { SvgIcon } from 'AppComponents/SvgIcon';
import {
  arrowIcon,
  FavouritesIcon,
  uploadIcon,
} from 'AppAssets/svg';
import { useApp } from 'AppContex/hooks/useApp';
import { moderateScaling } from 'AppUtils/styleHelper';

import getStyles from './EventCard.styles';
import type { EventItem } from './eventTypes';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EventCardProps {
  item:           EventItem;
  onPress?:       (item: EventItem) => void;
  onShare?:       (item: EventItem) => void;
  onFavourite?:   (item: EventItem) => void;
}

// ─── Tag pill ─────────────────────────────────────────────────────────────────

const TagPill: React.FC<{ label: string; styles: ReturnType<typeof getStyles> }> = memo(
  ({ label, styles }) => (
    <View style={styles.tag}>
      <CustomText style={styles.tagText}>{label}</CustomText>
    </View>
  ),
);

// ─── EventCard ────────────────────────────────────────────────────────────────

const EventCard: React.FC<EventCardProps> = memo(
  ({ item, onPress, onShare, onFavourite, isLast = false }) => {
    const { colors, appTheme } = useApp();
    const isDark = appTheme === 'dark';
    const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

    const handlePress      = useCallback(() => onPress?.(item), [item, onPress]);
    const handleShare      = useCallback(() => onShare?.(item), [item, onShare]);
    const handleFavourite  = useCallback(() => onFavourite?.(item), [item, onFavourite]);

    const imageSource =
      typeof item.imageUri === 'string'
        ? { uri: item.imageUri }
        : item.imageUri;

    return (
      <>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={handlePress}
          activeOpacity={0.82}
          accessibilityRole="button"
          accessibilityLabel={item.title}
        >
          <View style={styles.cardRow}>
            {/* ── Thumbnail ── */}
            <Image
              source={imageSource}
              style={styles.thumbnail}
              resizeMode="cover"
            />

            {/* ── Content block ── */}
            <View style={styles.contentBlock}>
              {/* Row 1: title + arrow */}
              <View style={styles.titleRow}>
                <CustomText style={styles.title} numberOfLines={2}>
                  {item.title}
                </CustomText>
                <View style={styles.arrowIcon}>
                  <SvgIcon
                    Icon={arrowIcon}
                    width={moderateScaling(16)}
                    height={moderateScaling(16)}
                  />
                </View>
              </View>

              {/* Row 2: date + location */}
              <View style={styles.metaRow}>
                <CustomText style={styles.date} numberOfLines={1}>
                  {item.dateDisplay}
                </CustomText>
                <CustomText style={styles.location} numberOfLines={1}>
                  {item.location}
                </CustomText>
              </View>

              {/* Row 3: price */}
              <CustomText style={styles.price}>{item.price}</CustomText>

              {/* Row 4: tags + action icons */}
              <View style={styles.bottomRow}>
                <View style={styles.tagsWrap}>
                  {item.tags.map(tag => (
                    <TagPill key={tag} label={tag} styles={styles} />
                  ))}
                </View>

                <View style={styles.actionsRow}>
                  {/* Share / upload */}
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={handleShare}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={`Share ${item.title}`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <SvgIcon
                      Icon={uploadIcon}
                      width={moderateScaling(20)}
                      height={moderateScaling(20)}
                    />
                  </TouchableOpacity>

                  {/* Favourite heart */}
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={handleFavourite}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={
                      item.isFavourited
                        ? `Remove ${item.title} from favourites`
                        : `Add ${item.title} to favourites`
                    }
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <SvgIcon
                      Icon={FavouritesIcon}
                      width={moderateScaling(20)}
                      height={moderateScaling(20)}
                      fill={item.isFavourited ? colors.green : 'none'}
                      color={
                        item.isFavourited
                          ? colors.green
                          : isDark
                            ? colors.white
                            : colors.blackTextColor
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

      </>
    );
  },
);

EventCard.displayName = 'EventCard';
export default EventCard;
