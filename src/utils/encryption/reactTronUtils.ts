import { IS_DEBUG_MODE } from 'AppUtils/constants';
import Reactotron from 'reactotron-react-native';
import config from './Config';

// import Config from 'AppConfig/Config';
// import { IS_DEBUG_MODE } from './appConstants';

export const initDebug = (): void => {
  try {
    if (IS_DEBUG_MODE) {
      Reactotron.configure({
        name: config.DISPLAY_NAME,
      }) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    /** */
  }
};
