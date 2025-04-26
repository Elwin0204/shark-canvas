import { appStore } from "./modules/app";
import { themeStore } from "./modules/theme";
import { userStore } from "./modules/user";

const rootStore = {
  appStore,
  themeStore,
  userStore,
};

export { rootStore, appStore, themeStore, userStore };
