import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";

import OrdersList from "../Orders/OrdersList";
import Settings from "../Settings";

const routes = [
  {
    path: "/orders",
    sidebarName: "Заказы",
    navbarName: "Заказы",
    icon: PeopleIcon,
    component: OrdersList
  },
  {
    path: "/sp",
    sidebarName: "Прачечные",
    navbarName: "Прачечные",
    icon: PeopleIcon,
    component: OrdersList
  },
  {
    path: "/users",
    sidebarName: "Пользователи",
    navbarName: "Пользователи",
    icon: PeopleIcon,
    component: OrdersList
  },
  {
    path: "/finance",
    sidebarName: "Прачечные",
    navbarName: "Прачечные",
    icon: PeopleIcon,
    component: OrdersList
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
