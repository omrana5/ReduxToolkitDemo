import { EventIcon, FavouritesIcon, ProfileIcon, SearchIcon } from "AppAssets/svg";
import { TAB_ROUTES } from "AppRoutes/routes";
import type { MainTabParamList } from "AppRoutes/types";
import { SvgProps } from "react-native-svg";

export interface TabConfig {
  routeName: keyof MainTabParamList;
  lightIconMode: React.FC<SvgProps>;
  label: string;
  accessibilityLabel: string;
}

export const TAB_CONFIG: TabConfig[] = [
  {
    routeName: TAB_ROUTES.SearchScreen,
    lightIconMode: SearchIcon,
    label: "Search",
    accessibilityLabel: "Search Tab",
  },
  {
    routeName: TAB_ROUTES.EventsScreen,
    lightIconMode: EventIcon,
    label: "Events",
    accessibilityLabel: "Events Tab",
  },
  {
    routeName: TAB_ROUTES.FavouritesScreen,
    lightIconMode: FavouritesIcon,
    label: "Favourites",
    accessibilityLabel: "Favourites Tab",
  },
  {
    routeName: TAB_ROUTES.ProfileScreen,
    lightIconMode: ProfileIcon,
    label: "Profile",
    accessibilityLabel: "Profile Tab",
  },
];

/** O(1) lookup by route name */
const TAB_MAP = new Map<string, TabConfig>(
  TAB_CONFIG?.map((t) => [t?.routeName, t]),
);

export const getTabConfig = (routeName: string): TabConfig | undefined =>
  TAB_MAP?.get(routeName);
