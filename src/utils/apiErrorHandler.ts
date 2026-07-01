import { AxiosError } from 'axios';
import {
  ShowErrorToast,
  ShowInfoToast,
} from 'AppComponents/ToastMessage/Toast';
import { AppAnyType } from 'AppTypes';

/**
 * Parsed error information
 */
export interface ParsedError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
  code?: string;
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  error?: string;
}

/**
 * Extract and parse error information from Axios error
 */
export const parseApiError = (error: unknown): ParsedError => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    return {
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'An unexpected error occurred',
      statusCode: axiosError.response?.status,
      errors: axiosError.response?.data?.errors,
      code: axiosError.code,
    };
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return {
      message: error.message || 'An unexpected error occurred',
    };
  }

  return {
    message: 'An unexpected error occurred',
  };
};

/**
 * Get user-friendly error message based on status code
 */
export const getErrorMessage = (
  statusCode?: number,
  defaultMessage?: string,
): string => {
  switch (statusCode) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'This resource already exists.';
    case 422:
      return 'Please check your input and try again.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    case 503:
      return 'Service unavailable. Please try again later.';
    default:
      return defaultMessage || 'Something went wrong. Please try again.';
  }
};

/**
 * Show error toast with appropriate message
 */
export const showApiErrorToast = (
  error: unknown,
  customMessage?: string,
): void => {
  const parsedError = parseApiError(error);

  let errorMessage = customMessage || parsedError.message;

  // Use user-friendly message for common status codes if no custom message
  if (!customMessage && parsedError.statusCode) {
    errorMessage = getErrorMessage(parsedError.statusCode, parsedError.message);
  }

  // Get first validation error if available
  if (parsedError.errors) {
    const firstErrorKey = Object.keys(parsedError?.errors)[0];
    const firstErrorMessage = parsedError.errors[firstErrorKey]?.[0];

    if (firstErrorMessage) {
      errorMessage = firstErrorMessage;
    }
  }
  ShowErrorToast(errorMessage);
};

/**
 * Handle specific login errors
 */
export const handleLoginError = (error: string | undefined): void => {
  const parsedError = parseApiError(error);

  switch (parsedError.statusCode) {
    case 401:
      ShowErrorToast(error);
      break;
    case 403:
      ShowInfoToast(error || 'Something went wrong');
      break;
    case 404:
      showApiErrorToast(error);
      break;
    case 429:
      ShowInfoToast(error || 'Something went wrong');
      break;
    default:
      showApiErrorToast(error);
  }
};


export const errorHandler = (error: AppAnyType | undefined): void => {
  if (error?.message) {
    const errorMessage = error?.message;
    ShowErrorToast(errorMessage);
  }
};
