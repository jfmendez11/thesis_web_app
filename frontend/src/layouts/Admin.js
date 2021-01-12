import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Home from "@material-ui/icons/Home";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import HomePage from "../views/Home/Home.js";
import ModelDashboardPage from "../views/ModelDashboard/ModelDashboard.js";
import DashboardPage from "../views/Dashboard/Dashboard.js";
import UserProfile from "../views/UserProfile/UserProfile.js";
import TableList from "../views/TableList/TableList.js";
import Typography from "../views/Typography/Typography.js";
import Icons from "../views/Icons/Icons.js";
import Maps from "../views/Maps/Maps.js";
import NotificationsPage from "../views/Notifications/Notifications.js";
import UpgradeToPro from "../views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "../views/RTLPage/RTLPage.js";
//import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [color, setColor] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isDashboardDisabled, setIsDashboardDisabled] = React.useState(true);
  const [parameters, setParameters] = React.useState({});

  const executeModel = (modelParameters) => {
    console.log(modelParameters);
    setIsDashboardDisabled(false);
    modelParameters.accounts = Object.keys(modelParameters.accounts).join(" ");
    setParameters(modelParameters);
  }

  const routes = [
    {
      path: "/home",
      name: "Home",
      rtlName: "millos",
      icon: Home,
      component: () => <HomePage executeModel={executeModel}/>,
      layout: "/admin"
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "millos",
      icon: Dashboard,
      component: () => <ModelDashboardPage parameters={parameters}/>,
      layout: "/admin",
      disabled: isDashboardDisabled,
    },
    {
      path: "/dashboard2",
      name: "Dashboard2",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    {
      path: "/user",
      name: "User Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "/admin"
    },
    {
      path: "/table",
      name: "Table List",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: TableList,
      layout: "/admin"
    },
    {
      path: "/typography",
      name: "Typography",
      rtlName: "طباعة",
      icon: LibraryBooks,
      component: Typography,
      layout: "/admin"
    },
    {
      path: "/icons",
      name: "Icons",
      rtlName: "الرموز",
      icon: BubbleChart,
      component: Icons,
      layout: "/admin"
    },
    {
      path: "/notifications",
      name: "Notifications",
      rtlName: "إخطارات",
      icon: Notifications,
      component: NotificationsPage,
      layout: "/admin"
    },
  ];

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Modelado de Tópicos\nTwits Uniandes"}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
