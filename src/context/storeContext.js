import { createContext } from "react";
import authStore from "../store/authStore";

const storeContext = createContext({
  auth: authStore,
});

export default storeContext;
