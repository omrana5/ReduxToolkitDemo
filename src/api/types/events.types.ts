/**
 * Dance style attached to an event from the API
 */
export interface DanceStyle {
  ds_id: number;
  ds_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Raw event object returned by the events-listing API
 */
export interface ApiEvent {
  event_id: number;
  event_name: string;
  description: string;
  event_profile_pic: string;
  event_profile_img: string;
  event_url: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  isFavorite: number;
  city: string;
  country: string;
  keywords: string[];
  danceStyles: DanceStyle[];
  event_date_id: number;
}

/**
 * Events listing API response
 */
export interface EventsListResponse {
  success: boolean;
  message: string;
  data?: {
    events: ApiEvent[];
  };
}
