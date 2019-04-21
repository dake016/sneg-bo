import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import OrderIcon from "@material-ui/icons/Assignment";
import SpIcon from "@material-ui/icons/LocalLaundryService";
import FinanceIcon from "@material-ui/icons/MonetizationOn";

import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Providers from "./pages/Providers";
import Settings from "./pages/Settings";
import History from "./pages/History";
import LogisticOperatorOrders from "./pages/LogisticOperatorOrders";

const routesMain = [
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
    path: "/actions",
    sidebarName: "Журнал действий",
    navbarName: "Журнал действий",
    icon: SettingsIcon,
    component: History
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

const routesLogisticOperator = [
  {
    path: "/orders",
    sidebarName: "Заказы",
    navbarName: "Заказы для оператора",
    icon: OrderIcon,
    component: LogisticOperatorOrders
  },
  { redirect: true, path: "/", to: "/orders", navbarName: "Redirect" }
];

export { routesMain, routesLogisticOperator };
