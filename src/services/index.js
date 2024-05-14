import i18n from "../i18n/i18n";
import axios from "axios";
import { config } from "../config";
import authStore from "../store/authStore";
import { orderServices } from "./orderService";

export const axiosInstance = axios.create({
  baseURL: config.API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const store = JSON.parse(localStorage.getItem("AuthStore"));
  const lang = i18n.language;

  if (store.access_token) {
    config.headers["Authorization"] = `${store["access_token"]}`;
    config.headers["Accept-Language"] = lang;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized error, redirect to login
      authStore.logout();
      window.location.href = "/auth";
      console.log("UNAUTH", error.response);
    }
    return Promise.reject(error);
  },
);
export default {
  async orders() {
    return await orderServices().orderList();
  },
  async baskets() {
    return await orderServices().basketList();
  },
  async couriers() {
    return await orderServices().courierList();
  },
};
