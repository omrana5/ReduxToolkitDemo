export interface TermTextPart {
  text: string;
  bold?: boolean;
}

export interface AuthTermItem {
  id: string;
  number: number;
  title: string;
  parts: TermTextPart[];
}

export interface CreateProfileFormData {
  username: string;
  referralCode?: string;
  avatarId: string;
  termsAccepted: boolean;
}

export interface CreateProfileRouteParams {
  termsAccepted?: boolean;
}

export interface AuthTermsRouteParams {
  returnToCreateProfile?: boolean;
}
