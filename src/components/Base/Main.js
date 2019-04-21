import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Header from "./Header";
import Navigator from "./Navigator";
import { routesMain, routesLogisticOperator } from "../routes";
import withAuth from "../Auth/withAuth";
import { red, green } from "@material-ui/core/colors";

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    },
    error: red,
    success: green
  },
  shape: {
    borderRadius: 8
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c"
      }
    },
    MuiButton: {
      label: {
        textTransform: "initial"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        margin: "0 16px",
        minWidth: 0,
        [theme.breakpoints.up("md")]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
        margin: theme.spacing.unit * 2
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

const drawerWidth = 256;

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  }
};

const switchRoutes = (
  <Switch>
    {routesMain.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

const switchLogisticOperatorRoutes = (
  <Switch>
    {routesLogisticOperator.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      routes: null
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentWillMount() {
    this.setState({
      routes:
        this.props.user.scopes === "ROLE_AP_ADMIN"
          ? routesMain
          : this.props.user.scopes === "ROLE_AP_OPERATOR"
          ? routesLogisticOperator
          : routesLogisticOperator
    });
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                routes={this.state.routes}
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                {...rest}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator
                routes={this.state.routes}
                PaperProps={{ style: { width: drawerWidth } }}
                {...rest}
              />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header
              routes={this.state.routes}
              onDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            {this.props.user.scopes === "ROLE_AP_ADMIN" && switchRoutes}
            {this.props.user.scopes === "ROLE_AP_OPERATOR" &&
              switchLogisticOperatorRoutes}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Main));
