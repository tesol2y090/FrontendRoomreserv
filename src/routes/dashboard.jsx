// import Dashboard from "views/Dashboard/Dashboard";
import Dashboard from "../views/Dashboard/Dashboard";
// import Typography from "views/Typography/Typography";
import Typography from "../views/Typography/Typography";
// import Icons from "views/Icons/Icons";/
import Icons from "../views/Icons/Icons";

import Maps from "../views/Maps/Maps"
import TableList from "../views/TableList/TableList";

const dashboardRoutes = [
  {
    path: "/roomreserv",
    name: "Room Reserv",
    icon: "pe-7s-server",
    component: Dashboard
  },
  { 
    path: "/cancel", 
    name: "Cancel", 
    icon: "pe-7s-close",
    component: Maps },
  { 
    path: "/statistic", 
    name: "Statistic", 
    icon: "pe-7s-graph3",
    component: TableList 
  },
  {
    path: "/admin",
    name: "Admin",
    icon: "pe-7s-user",
    component: Typography
  },
  { 
    path: "/approved", 
    name: "Approved", 
    icon: "pe-7s-check", 
    component: Icons },
  
  { redirect: true, path: "/", to: "/roomreserv", name: "Room reserv" }
];

export default dashboardRoutes;
