import { makeAutoObservable } from "mobx";

class UserStore {
  token = "";
  userInfo = {
    name: "",
    avatar: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  login() {}

  logout() {}
}

const userStore = new UserStore();

export { userStore };
