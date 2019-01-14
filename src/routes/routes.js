import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";

import OrderList from "../components/OrderList";
import Database from "../components/Content2";

const routes = [
  {
    path: "/orders",
    sidebarName: "Orders List",
    navbarName: "Orders List",
    icon: PeopleIcon,
    component: OrderList
  },
  {
    path: "/database",
    sidebarName: "Database",
    navbarName: "Database",
    icon: DnsRoundedIcon,
    component: Database
  },
  { redirect: true, path: "/", to: "/orders", navbarName: "Redirect" }
];

export default routes;
