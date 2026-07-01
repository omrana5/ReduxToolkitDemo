import {
  LoginRequest,
  LoginResponse,
} from "AppApi/types/auth.types";
import { EventsListResponse } from "AppApi/types/events.types";
import { API_ENDPOINTS } from "AppApi/endpoints/auth.api";
import { apiService } from "AppApi/axiosClient/apiService";

export const networkService = {


  /**
   * Login user
   * @param data - Login credentials
   * @returns Promise with login response
   */
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return apiService.post<LoginResponse, LoginRequest>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  },

  /**
   * Fetch events listing (requires auth token)
   * @returns Promise with events listing response
   */
  eventList: (): Promise<EventsListResponse> => {
    const formData = new FormData();

    return apiService.postForm<EventsListResponse>(
      API_ENDPOINTS.EVENT_LIST.EVENTS,
      formData,
    );
  },

};
