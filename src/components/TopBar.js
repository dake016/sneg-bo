import React from "react";
import { hot } from "react-hot-loader";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Bookmarks from '@material-ui/icons/Bookmarks';

const TopBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            <Bookmarks></Bookmarks> Sneg Back Office
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default hot(module)(TopBar);
