import { AppAnyType } from 'AppTypes';
import { MMKV } from 'react-native-mmkv';

const STORAGE_ID: string = 'mobile-storage-oron';
const ENC_KEY: string = 'box-1695464615-1364365465463654';

//! NEVER CHANGE THIS. IT WILL LOGOUT ALL USERS IN NEXT RELEASE
const RNStorage: MMKV = new MMKV({
  id: STORAGE_ID,
  encryptionKey: ENC_KEY,
});

export const ACCESS_TOKEN_VALUE: string = 'a1699418767127'; //! NEVER CHANGE THIS. IT WILL LOGOUT ALL USERS IN NEXT RELEASE
export const REFRESH_TOKEN_VALUE: string = 'a169941ewee8767127'; //! NEVER CHANGE THIS. IT WILL LOGOUT ALL USERS IN NEXT RELEASE
export const USER_AUTH_SESSION: string = 'b1699418767127'; //! NEVER CHANGE THIS. IT WILL LOGOUT ALL USERS IN NEXT RELEASE
export const REMEMBER_ME_VALUE: string = 'c1699418767127';
export const USER_DATA_KEY: string = 'c169545568767127';


export interface MMKVStorageInterface {
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  setItem: (key: string, value: unknown) => Promise<boolean>;
  getItem: (key: string) => Promise<unknown>;
}

export const mmkvStorage: MMKVStorageInterface = {
  removeItem: (key: string) => {
    RNStorage.delete(key);
    return Promise.resolve();
  },
  clear: () => {
    RNStorage.clearAll();
    return Promise.resolve();
  },
  setItem: (key: string, value: AppAnyType) => {
    RNStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = RNStorage.getString(key);
    return Promise.resolve(value);
  },
};

export const mmkvStorageForMobx: MMKVStorageInterface = {
  removeItem: mmkvStorage.removeItem,
  clear: mmkvStorage.clear,
  setItem: (key: string, value: AppAnyType) => {
    RNStorage.set(key, JSON.stringify(value));
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    let value = RNStorage.getString(key);
    if (value && !!value) {
      value = JSON.parse(value);
    }
    return Promise.resolve(value);
  },
};

export default RNStorage;
