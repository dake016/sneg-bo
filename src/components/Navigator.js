import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    textDecoration: "none",
    paddingTop: 4,
    paddingBottom: 4,
    color: "rgba(255, 255, 255, 0.7)"
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: 16,
    paddingBottom: 16
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white
  },
  itemActionable: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemPrimary: {
    color: "inherit",
    fontSize: theme.typography.fontSize,
    "&$textDense": {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  }
});

const Navigator = ({ ...props }) => {
  const { classes, routes, staticContext, ...other } = props;
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        return (
          <NavLink to={prop.path} key={key}>
            <ListItem
              button
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                activeRoute(prop.path) && classes.itemActiveItem
              )}
            >
              <ListItemIcon>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense
                }}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={classNames(
            classes.firebase,
            classes.item,
            classes.itemCategory
          )}
        >
          Backoffice
        </ListItem>
        <Divider className={classes.divider} />
        <React.Fragment>{links}</React.Fragment>
      </List>
    </Drawer>
  );
};

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);
