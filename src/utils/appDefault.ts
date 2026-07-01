// import Orientation from 'react-native-orientation-locker';
// import { getCurrentCountry } from './helpers';

import { initDebug } from "./encryption/reactTronUtils";


export function appDefault(): void {
  initDebug();

  // getCurrentCountry();

  // Orientation.lockToPortrait();
}
