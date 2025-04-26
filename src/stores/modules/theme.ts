import { makeAutoObservable } from "mobx";

class ThemeStore {
  primaryColor = "red";
  themeMode: UnionKey.ThemeMode = "light";

  constructor() {
    makeAutoObservable(this);
  }
}

const themeStore = new ThemeStore();

export { themeStore };
