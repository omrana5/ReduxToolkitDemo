import type { ApiEvent } from 'AppApi/types/events.types';

import type { EventItem } from './eventTypes';

const formatPrice = (from: number, to: number): string => {
  if (from === 0 && to === 0) {
    return 'Free';
  }

  if (to === 0 || from === to) {
    return `€${from}`;
  }

  return `€${from} – €${to}`;
};

const formatDateDisplay = (fromDate: string, toDate: string): string => {
  if (fromDate && toDate) {
    return `${fromDate} – ${toDate}`;
  }

  return fromDate || toDate || '';
};

const buildTags = (keywords: string[], danceStyles: ApiEvent['danceStyles']): string[] => {
  const styleNames = danceStyles.map(style => style.ds_name);
  return [...new Set([...keywords, ...styleNames])];
};

export const mapApiEventToEventItem = (event: ApiEvent): EventItem => ({
  id: `${event.event_id}-${event.event_date_id}`,
  title: event.event_name,
  dateDisplay: formatDateDisplay(event.readable_from_date, event.readable_to_date),
  price: formatPrice(event.event_price_from, event.event_price_to),
  location: [event.city, event.country].filter(Boolean).join(', '),
  tags: buildTags(event.keywords ?? [], event.danceStyles ?? []),
  isFavourited: event.isFavorite === 1,
  imageUri: event.event_profile_img,
});

export const mapApiEventsToEventItems = (events: ApiEvent[]): EventItem[] =>
  events.map(mapApiEventToEventItem);
