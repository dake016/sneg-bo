import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";

import OrdersList from "../Orders/OrdersList";
import Settings from "../Settings";

const routes = [
  {
    path: "/orders",
    sidebarName: "Orders List",
    navbarName: "Orders List",
    icon: PeopleIcon,
    component: OrdersList
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: SettingsIcon,
    component: Settings
  },
  { redirect: true, path: "/", to: "/orders", navbarName: "Redirect" }
];

export default routes;
