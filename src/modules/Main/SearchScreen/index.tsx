import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  View,
} from 'react-native';

import AppScreen from 'AppComponents/AppScreen';
import CustomText from 'AppComponents/CustomText';
import { useEventList } from 'AppApi/networkHook/useEventList';
import { useApp } from 'AppContex/hooks/useApp';
import {
  useAppDispatch,
  useAppSelector,
  selectUserGreeting,
} from 'AppStores/hooks';
import { toggleFavorite } from 'AppStores/slices/favoritesSlice';

import EventCard from './EventCard';
import { mapApiEventsToEventItems } from './eventMapper';
import getStyles from './styles';
import type { EventItem } from './eventTypes';

const SearchScreen: React.FC = () => {
  const { colors, appTheme } = useApp();
  const isDark = appTheme === 'dark';
  const dispatch = useAppDispatch();

  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const backgroundColor = isDark ? colors.appThemeColor : colors.white;
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const favoriteItems = useAppSelector(state => state.favorites.items);
  const unfavoritedIds = useAppSelector(
    state => state.favorites.unfavoritedIds,
  );
  const greeting = useAppSelector(selectUserGreeting);

  const { data, isLoading, isError, refetch, isFetching } = useEventList({
    enabled: isAuthenticated,
  });

  const eventsWithFavorites = useMemo(() => {
    const apiEvents = mapApiEventsToEventItems(data?.data?.events ?? []);

    return apiEvents.map(event => ({
      ...event,
      isFavourited: unfavoritedIds[event.id]
        ? false
        : Boolean(favoriteItems[event.id]) || event.isFavourited,
    }));
  }, [data, favoriteItems, unfavoritedIds]);

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
        item={item}
        onPress={handlePress}
        onShare={handleShare}
        onFavourite={handleFavourite}
      />
    ),
    [handleFavourite, handlePress, handleShare],
  );

  const keyExtractor = useCallback((item: EventItem): string => item.id, []);

  const ListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <CustomText style={styles.greeting}>{greeting}</CustomText>
        <CustomText style={styles.subtitle}>Are you ready to dance?</CustomText>
      </View>
    ),
    [greeting, styles],
  );

  const ListEmpty = useCallback(() => {
    if (isLoading || isFetching) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator
            size="large"
            color={isDark ? colors.white : colors.homeNameColor}
          />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.emptyContainer}>
          <CustomText style={styles.emptyText}>
            Unable to load events. Pull to refresh.
          </CustomText>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <CustomText style={styles.emptyText}>No events found</CustomText>
      </View>
    );
  }, [colors, isDark, isError, isFetching, isLoading, styles]);

  return (
    <AppScreen style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      {ListHeader()}

      <FlatList
        data={eventsWithFavorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.listContent}
        style={{ backgroundColor }}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
      />
    </AppScreen>
  );
};

export default SearchScreen;
