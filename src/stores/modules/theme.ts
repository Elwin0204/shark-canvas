import { makeAutoObservable } from "mobx";

class ThemeStore {
  primaryColor = 'red';
  themeMode: UnionKey.ThemeMode = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  setThemeMode(mode: UnionKey.ThemeMode) {
    this.themeMode = mode;  
  }
}

const themeStore = new ThemeStore();

export { themeStore };