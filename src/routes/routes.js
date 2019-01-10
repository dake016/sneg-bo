import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
// core components/views

import Authentication from "../components/Content";
import Database from "../components/Content2";

const routes = [
  {
    path: "/authentication",
    sidebarName: "Authentication",
    navbarName: "Authentication",
    icon: PeopleIcon,
    component: Authentication
  },
  {
    path: "/database",
    sidebarName: "Database",
    navbarName: "Database",
    icon: DnsRoundedIcon,
    component: Database
  },
  { redirect: true, path: "/", to: "/authentication", navbarName: "Redirect" }
];

export default routes;
