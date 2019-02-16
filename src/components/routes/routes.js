import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import OrderIcon from "@material-ui/icons/Assignment";
import SpIcon from "@material-ui/icons/LocalLaundryService";
import FinanceIcon from "@material-ui/icons/MonetizationOn";

import Orders from "../Orders/Orders";
import Users from "../Users/Users";
import Providers from "../Providers/Providers";
import Settings from "../Settings";

const routes = [
  {
    path: "/orders",
    sidebarName: "Заказы",
    navbarName: "Заказы",
    icon: OrderIcon,
    component: Orders
  },
  {
    path: "/sp",
    sidebarName: "Прачечные",
    navbarName: "Прачечные",
    icon: SpIcon,
    component: Providers
  },
  {
    path: "/users",
    sidebarName: "Пользователи",
    navbarName: "Пользователи",
    icon: PeopleIcon,
    component: Users
  },
  {
    path: "/finance",
    sidebarName: "Финансы",
    navbarName: "Финансы",
    icon: FinanceIcon,
    component: Settings
  },
  {
    path: "/settings",
    sidebarName: "Настройки",
    navbarName: "Настройки",
    icon: SettingsIcon,
    component: Settings
  },
  { redirect: true, path: "/", to: "/orders", navbarName: "Redirect" }
];

export default routes;
