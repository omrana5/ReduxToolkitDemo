// ─── Event data model ──────────────────────────────────────────────────────────

export interface EventItem {
  id:          string;
  title:       string;
  /** e.g. "24.02.2022 – 26.02.2022" or "27.02.2022 @8pm" */
  dateDisplay: string;
  /** e.g. "€30 – €100" or "€12" */
  price:       string;
  location:    string;
  tags:        string[];
  isFavourited: boolean;
  /** URI string — local require() or remote https:// */
  imageUri:    string | number;
}
