import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AuthService from "../Auth/AuthService";
import withAuth from "../Auth/withAuth";
import Orders from "./Orders";
import Tmp from "./Tmp";

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

function dataUpToStatus(data, status) {
  var newData = [];
  data.map(row => {
    if (status.includes(+row.status.id)) {
      newData.push(row);
    }
  });
  return newData;
}

function dataUpToStatusVisible(data, status) {
  var newData = [];
  data.map(row => {
    if (status.includes(+row.status.id)) {
      newData.push({
        id: row.id,
        registered: row.registered,
        basket: 1,
        payment: row.paymentType.description,
        status: row.status.description,
        note: row.note
      });
    }
  });
  return newData;
}

class OrdersList extends React.Component {
  state = {
    activeTab: 0,
    rows: []
  };

  Auth = new AuthService();

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  componentDidMount() {
    this.Auth.fetch(`${this.Auth.domain}/orders`, { method: "GET" })
      .then(response => this.setState({ rows: response }))
      .catch(error => alert("Orders " + error));
  }

  render() {
    const { classes } = this.props;
    const { activeTab } = this.state;

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
          {activeTab === 0 && (
            <Tmp
              allRows={dataUpToStatus(this.state.rows, [1, 2, 3, 4, 5])}
              visibleRows={dataUpToStatusVisible(this.state.rows, [
                1,
                2,
                3,
                4,
                5
              ])}
            />
          )}
          {activeTab === 1 && (
            <TabContainer>
              <Orders
                rows={this.state.rows}
                classes={classes}
                title="Completed Orders"
                tabIds={[3]}
              />
            </TabContainer>
          )}
          {activeTab === 2 && (
            <TabContainer>
              <Orders
                rows={this.state.rows}
                classes={classes}
                title="Canceled Orders"
                tabIds={[4]}
              />
            </TabContainer>
          )}
          {activeTab === 3 && (
            <TabContainer>
              <Orders
                rows={this.state.rows}
                classes={classes}
                title="All Orders"
                tabIds={[0, 1, 3, 2, 4]}
              />
            </TabContainer>
          )}
        </main>
      </React.Fragment>
    );
  }
}

OrdersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(OrdersList));
