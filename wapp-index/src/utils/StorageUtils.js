import localForage from 'localforage';
import shortid from 'shortid';

export const ACCOUNT_KEY = '__account__';
export const CONFIG_KEY = '__config__';
export const MENU_KEY = '__menu__';
export const FLASH_KEY = '__flash__';
export const __PREVIEW_ZUTAI_DATA__ = '__PREVIEW_ZUTAI_DATA__';

export const localSet = async (key, value) => {
  await localForage.setItem(key, value);
};

export const localGet = async (key) => {
  const content = await localForage.getItem(key);
  return content;
};

export const localRemove = async (key) => {
  return localForage.removeItem(key);
};


export const localGetAccount = async () => {
  return localGet(ACCOUNT_KEY);
};

export const localSetAccount = async (value) => {
  return localSet(ACCOUNT_KEY, value);
};

export const localRemoveAccount = async () => {
  return localForage.removeItem(ACCOUNT_KEY);
};

export const localSetAndGetFlash = async () => {
  const flashToken = shortid.generate();
  await localSet(FLASH_KEY, flashToken);
  return flashToken;
};

export const localGetFlash = async () => {
  return localGet(FLASH_KEY);
};


export const localGetPreViewData = async () => {
  return localGet(__PREVIEW_ZUTAI_DATA__);
};

export const localSetPreViewData = async (value) => {
  return localSet(__PREVIEW_ZUTAI_DATA__, value);
};
