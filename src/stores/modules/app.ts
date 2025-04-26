import { localeMap, LocaleMapType } from "@/i18n";
import { makeAutoObservable } from "mobx";

class AppStore {
  localeCode: LocaleMapType = "zh_CN";
  locale = localeMap[this.localeCode];
  collapse = false;
  isMobile = false;

  constructor() {
    makeAutoObservable(this);
  }

  changeLocale(localeCode: LocaleMapType) {
    this.localeCode = localeCode;
    this.locale = localeMap[this.localeCode];
  }

  toggleSider() {
    console.log("123", this.collapse);
    this.collapse = !this.collapse;
  }
}

const appStore = new AppStore();

export { appStore };
