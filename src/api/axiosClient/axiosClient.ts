
import { Platform } from "react-native";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import config from "AppUtils/encryption/Config";


import {
  ACCESS_TOKEN_VALUE,
  USER_AUTH_SESSION,
  REFRESH_TOKEN_VALUE,
  mmkvStorage,
} from "AppUtils/storageUtils";

import { AppAnyType } from "AppTypes";
import { clearCredentials } from 'AppStores/slices/authSlice';
import { clearAuthSession } from 'AppStores/authPersistence';
import { store } from 'AppStores/store';
import { resetToAuth } from "AppRoutes/actions";
import { ShowErrorToast } from "AppComponents/ToastMessage/Toast";

// ============================================================================
// Base URL
// ============================================================================

let apiEndpoint = `${config.HTTPS_PROTOCOL}://${config.REST_ENDPOINT}`;

if (__DEV__) {
  if (
    apiEndpoint.includes("localhost") ||
    apiEndpoint.includes("127.0.0.1")
  ) {
    console.warn("⚠ Using localhost — mobile cannot connect directly.");

    if (Platform.OS === "android") {
      apiEndpoint = apiEndpoint.replace(
        /localhost|127\.0\.0\.1/,
        "10.0.2.2",
      );

      console.log("🤖 Android Emulator detected — using 10.0.2.2");
    }
  }
}

// Prevent accidental HTTP in production
if (!__DEV__ && !apiEndpoint.startsWith("https://")) {
  throw new Error(`Insecure API endpoint detected: ${apiEndpoint}`);
}

// ============================================================================
// Axios Instance
// ============================================================================

const axiosClient = axios.create({
  baseURL: apiEndpoint,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Platform-Type": Platform.OS,
  },
});

// ============================================================================
// Logout Helper
// ============================================================================

const forceLogout = async () => {
  store.dispatch(clearCredentials());

  await Promise.all([
    clearAuthSession(),
    mmkvStorage.removeItem(REFRESH_TOKEN_VALUE),
    mmkvStorage.removeItem(USER_AUTH_SESSION),
  ]);

  ShowErrorToast("Your session has expired. Please log in again.");

  resetToAuth();
};

// ============================================================================
// Request Interceptor
// ============================================================================

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await mmkvStorage.getItem(ACCESS_TOKEN_VALUE);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log("Request Interceptor Error:", error);
      return config;
    }
  },
  (error) => Promise.reject(error),
);

// ============================================================================
// Response Interceptor
// ============================================================================

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * Handle business errors returned with HTTP 200
     * Example:
     * {
     *   statusCode: 400,
     *   message: "...",
     *   data: {}
     * }
     */
    if (
      response.data?.statusCode &&
      response.data.statusCode >= 400
    ) {
      const error = new Error(
        response.data.message || "Request failed",
      ) as AppAnyType;

      error.response = {
        ...response,
        status: response.data.statusCode,
      };

      return Promise.reject(error);
    }

    return response;
  },

  async (error: AxiosError) => {
    const statusCode =
      error.response?.status ||
      (error.response?.data as AppAnyType)?.statusCode;

    switch (statusCode) {
      case 401:
      case 403:
        await forceLogout();
        break;

      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosClient;