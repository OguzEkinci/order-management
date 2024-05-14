import App from "../App";
import { Login } from "../pages/Auth";
import Auth from "../pages/Auth/Auth";
import { HomeIcon } from "@heroicons/react/24/outline";
import { IconMenuOrder } from "@tabler/icons-react";
import NotFound from "../pages/Error/404";
import OrderList from "../pages/Orders/OrderList";
import Orders from "../pages/Orders";

const routes = [
  {
    name: "auth",
    path: "/auth",
    element: Auth,
    isPrivate: false,
    isVisible: false,
    role: "public",
    subRoutes: [
      {
        name: "Login",
        path: "login",
        element: Login,
        role: "public",
      },
      {
        name: "",
        path: "",
        to: "/auth/login",
        isVisible: false,
        isNavigate: true,
        role: "public",
      },
    ],
  },
  {
    name: "Dashboard",
    path: "/",
    icon: HomeIcon,
    isPrivate: true,
    role: "public",
    element: App,
  },
  {
    name: "order-management",
    path: "/order-management",
    isPrivate: true,
    icon: IconMenuOrder,
    element: Orders,
    subRoutes: [
      {
        name: "List",
        path: "list",
        element: OrderList,
        isVisible: false,
      },
      {
        name: "",
        path: "",
        to: "/order-management/list",
        isVisible: false,
        isNavigate: true,
      },
    ],
  },
  {
    path: "*",
    element: NotFound,
    name: "404",
    isVisible: false,
  },
];

export default routes;
