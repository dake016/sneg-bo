import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";

import Orders from "../Orders/Orders";
import Users from "../Users/Users";
import Providers from "../Providers/Providers";
import Settings from "../Settings";

const routes = [
  {
    path: "/orders",
    sidebarName: "Заказы",
    navbarName: "Заказы",
    icon: PeopleIcon,
    component: Orders
  },
  {
    path: "/sp",
    sidebarName: "Прачечные",
    navbarName: "Прачечные",
    icon: PeopleIcon,
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
    icon: PeopleIcon,
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
