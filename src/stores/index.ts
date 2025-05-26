import { appStore } from './modules/app';
import { designStore } from './modules/design';
import { themeStore } from './modules/theme';
import { userStore } from './modules/user';

const rootStore = {
  appStore,
  themeStore,
  userStore,
  designStore
};

export { rootStore, appStore, themeStore, userStore, designStore };