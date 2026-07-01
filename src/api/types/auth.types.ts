/**
 * User object returned by the login API
 */
export interface AuthUser {
  usr_id: number;
  usr_fname: string;
  usr_lname: string;
  usr_username: string;
  usr_email: string;
  usr_profile: string;
  usr_profile_img: string;
  usr_email_ver_token?: string;
  usr_reset_pass_token?: string;
  usr_email_verified_at: string | null;
  usr_provider_id?: string | null;
  usr_login_type?: string | null;
  usr_status: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  role: string;
}

/**
 * Login Request Payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login Response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
    refreshToken?: string;
  };
}

/**
 * Registration Request Payload
 */
export interface RegisterRequest {
  firstName: string,
  lastName: string,
  referralCode: string,
  countryId: Number,
  phoneNo: string,
  email: string,
  password: string
}


/**
 * Registration Response
 */
export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    refreshToken?: string;
  };
}


/**
 * API Error Response
 */
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  error?: string;
}


export interface SaveApplyUserResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface SaveApplyUserRequest {
  firstName:string,
  lastName:string,
  countryCode:string,
  email:string,
  phoneNumber:string,
  depositAmount:string,
  status: number
}
