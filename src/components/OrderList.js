import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import TableChart from "@material-ui/icons/TableChart";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AuthService from "./auth/AuthService";
import withAuth from "./auth/withAuth";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  paper: {
    margin: "auto",
    overflow: "hidden"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing.unit
  },
  contentWrapper: {
    margin: "40px 16px"
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px 0",
    background: "#eaeff1"
  }
});

class OrderList extends React.Component {
  state = {
    activeTab: 0,
    fetchedData: []
  };

  Auth = new AuthService();

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  componentWillMount() {
    this.Auth.fetch(`${this.Auth.domain}/orders`, { method: "GET" })
      .then(response => this.setState({ fetchedData: response }))
      .catch(error => alert("Orders " + error));
  }

  render() {
    const { classes } = this.props;
    const { activeTab } = this.state;
    const { fetchedData } = this.state.fetchedData;

    const tab1 = (
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <TableChart className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <Typography>Completed Orders</Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> User name </TableCell>
                <TableCell align="right">Phone number</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Buckets</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">User note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fetchedData.map(row => {
                if (row.status.id == "1") {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.appUser.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.appUser.phoneNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.address.street}, кв {row.address.apartment},
                        подъезд {row.address.entrance}, этаж {row.address.floor}
                      </TableCell>
                      <TableCell align="right">
                        {row.bucketList[0].type.name}, кол-во:{" "}
                        {row.bucketList[0].count}
                      </TableCell>
                      <TableCell align="right">
                        {row.paymentType.name}
                      </TableCell>
                      <TableCell align="right">{row.status.name}</TableCell>
                      <TableCell align="right">{row.userNote}</TableCell>
                    </TableRow>
                  );
                } else {
                  return;
                }
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
    const tab2 = (
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <TableChart className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <Typography>Completed Orders</Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> User name </TableCell>
                <TableCell align="right">Phone number</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Buckets</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">User note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fetchedData.map(row => {
                if (row.status.id == "3") {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.appUser.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.appUser.phoneNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.address.street}, кв {row.address.apartment},
                        подъезд {row.address.entrance}, этаж {row.address.floor}
                      </TableCell>
                      <TableCell align="right">
                        {row.bucketList[0].type.name}, кол-во:{" "}
                        {row.bucketList[0].count}
                      </TableCell>
                      <TableCell align="right">
                        {row.paymentType.name}
                      </TableCell>
                      <TableCell align="right">{row.status.name}</TableCell>
                      <TableCell align="right">{row.userNote}</TableCell>
                    </TableRow>
                  );
                } else {
                  return;
                }
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
    const tab3 = (
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <TableChart className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <Typography>Completed Orders</Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> User name </TableCell>
                <TableCell align="right">Phone number</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Buckets</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">User note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fetchedData.map(row => {
                if (row.status.id == "4") {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.appUser.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.appUser.phoneNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.address.street}, кв {row.address.apartment},
                        подъезд {row.address.entrance}, этаж {row.address.floor}
                      </TableCell>
                      <TableCell align="right">
                        {row.bucketList[0].type.name}, кол-во:{" "}
                        {row.bucketList[0].count}
                      </TableCell>
                      <TableCell align="right">
                        {row.paymentType.name}
                      </TableCell>
                      <TableCell align="right">{row.status.name}</TableCell>
                      <TableCell align="right">{row.userNote}</TableCell>
                    </TableRow>
                  );
                } else {
                  return;
                }
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
    const tab4 = (
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <TableChart className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <Typography>Completed Orders</Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> User name </TableCell>
                <TableCell align="right">Phone number</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Buckets</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">User note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fetchedData.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.appUser.name}
                    </TableCell>
                    <TableCell align="right">
                      {row.appUser.phoneNumber}
                    </TableCell>
                    <TableCell align="right">
                      {row.address.street}, кв {row.address.apartment}, подъезд{" "}
                      {row.address.entrance}, этаж {row.address.floor}
                    </TableCell>
                    <TableCell align="right">
                      {row.bucketList[0].type.name}, кол-во:{" "}
                      {row.bucketList[0].count}
                    </TableCell>
                    <TableCell align="right">{row.paymentType.name}</TableCell>
                    <TableCell align="right">{row.status.name}</TableCell>
                    <TableCell align="right">{row.userNote}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );

    return (
      <React.Fragment>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs
            textColor="inherit"
            value={activeTab}
            onChange={this.handleChange}
          >
            <Tab textColor="inherit" label="Active orders" />
            <Tab textColor="inherit" label="Done orders" />
            <Tab textColor="inherit" label="Canceled orders" />
            <Tab textColor="inherit" label="All orders  " />
          </Tabs>
        </AppBar>
        <main className={classes.mainContent}>
          {activeTab === 0 && <TabContainer>{tab1}</TabContainer>}
          {activeTab === 1 && <TabContainer>{tab2}</TabContainer>}
          {activeTab === 2 && <TabContainer>{tab3}</TabContainer>}
          {activeTab === 3 && <TabContainer>{tab4}</TabContainer>}
        </main>
      </React.Fragment>
    );
  }
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(OrderList));
