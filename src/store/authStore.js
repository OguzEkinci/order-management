import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "AuthStore",
      properties: [
        "access_token",
        "user",
        "isLogged",
        "userGet",
        "userGetLoading",
      ],
      storage: localStorage,
      expireIn: 86400000,
      removeOnExpiration: true,
      stringify: true,
    });
  }

  access_token = "";
  user = {};
  userGet = {};
  isLogged = false;
  userGetLoading = true;

  login = (access_token, user) => {
    this.access_token = access_token;
    this.user = user;
    this.isLogged = true;
  };

  setUserGet = (data) => {
    this.userGet = data;
  };
  setUserGetLoading = (loading) => {
    this.userGetLoading = loading;
  };

  logout = () => {
    this.access_token = "";
    this.user = {};
    this.userGet = {};
    this.isLogged = false;
  };

  setAccessToken = (token) => {
    this.access_token = token;
  };
}

const authStore = new AuthStore();

export default authStore;
