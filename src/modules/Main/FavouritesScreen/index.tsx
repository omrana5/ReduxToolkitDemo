import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StatusBar, View } from 'react-native';

import AppScreen from 'AppComponents/AppScreen';
import CustomText from 'AppComponents/CustomText';
import { useApp } from 'AppContex/hooks/useApp';
import {
  selectFavoriteItems,
  selectUserGreeting,
  useAppDispatch,
  useAppSelector,
} from 'AppStores/hooks';
import { toggleFavorite } from 'AppStores/slices/favoritesSlice';
import EventCard from 'AppModules/Main/SearchScreen/EventCard';
import type { EventItem } from 'AppModules/Main/SearchScreen/eventTypes';

import getStyles from './styles';

const FavouritesScreen: React.FC = () => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === 'dark';
  const dispatch = useAppDispatch();

  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const backgroundColor = isDark ? colors.appThemeColor : colors.homeBackground;
  const headerBg = colors.homeBackground;

  const favoriteEvents = useAppSelector(selectFavoriteItems);
  const greeting = useAppSelector(selectUserGreeting);

  const handlePress = useCallback((_item: EventItem) => {
    // navigate(STACK_ROUTES.EventDetailScreen, { eventId: _item.id });
  }, []);

  const handleShare = useCallback((_item: EventItem) => {
    // Share.share({ title: _item.title, message: _item.title });
  }, []);

  const handleFavourite = useCallback(
    (item: EventItem) => {
      dispatch(toggleFavorite(item));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<EventItem>) => (
      <EventCard
        item={{ ...item, isFavourited: true }}
        onPress={handlePress}
        onShare={handleShare}
        onFavourite={handleFavourite}
      />
    ),
    [handleFavourite, handlePress, handleShare],
  );

  const keyExtractor = useCallback((item: EventItem): string => item.id, []);


  const ListEmpty = useCallback(
    () => (
      <View style={styles.placeholderContainer}>
        <CustomText style={styles.placeholderText}>
          No favourites yet
        </CustomText>
        <CustomText style={styles.welcomeText}>
          Tap the heart on an event to save it here
        </CustomText>
      </View>
    ),
    [styles],
  );

  return (
    <AppScreen style={[styles.safeArea, { backgroundColor: headerBg }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <View style={styles.header}>
        <CustomText style={styles.greeting}>{greeting}</CustomText>
        <CustomText style={styles.subtitle}>Are you ready to dance?</CustomText>
      </View>

      <FlatList
        data={favoriteEvents}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={[styles.scrollContent, { backgroundColor }]}
        style={[styles.scrollView, { backgroundColor }]}
      />
    </AppScreen>
  );
};

export default FavouritesScreen;
