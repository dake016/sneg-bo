import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AuthService from "../Auth/AuthService";
import withAuth from "../Auth/withAuth";
import OrdersTable from "./OrdersTable";

var statusList = [];

function getStatusIdByName(name) {
  var id = 0;
  statusList.map(row => {
    if (row.name == name) {
      id = row.id;
    }
  });
  return id;
}

function getStatusByName(name) {
  var status = {};
  statusList.map(row => {
    if (row.name == name) {
      status = row;
    }
  });
  return status;
}

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
    padding: "14px 36px 0",
    background: "#eaeff1"
  }
});

function dataUpToStatus(data, status) {
  var newData = [];
  data.map(row => {
    if (status.includes(row.status.name) || status[0] == "ALL") {
      newData.push(row);
    }
  });
  return newData;
}

function dataUpToStatusVisible(data, status) {
  var newData = [];
  data.map(row => {
    if (status.includes(row.status.name) || status[0] == "ALL") {
      newData.push({
        id: row.id,
        registered: row.registered,
        basket: row.basketList,
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
    this.getOrdersList();
    this.getStatuses();
    this.getAllusers();
    this.getAllsp();
  }

  getAllusers() {
    this.Auth.fetch(`${this.Auth.domain}/app-user/all`, { method: "GET" })
      .then(response => console.log(response.content))
      .catch(error => alert(error));
  }

  getAllsp() {
    this.Auth.fetch(`${this.Auth.domain}/sp/all`, { method: "GET" })
      .then(response => console.log(response.content))
      .catch(error => alert(error));
  }

  getOrdersList() {
    this.Auth.fetch(`${this.Auth.domain}/order/all`, { method: "GET" })
      .then(response => this.setState({ rows: response.content }))
      .catch(error => alert("Orders " + error));
  }

  getStatuses() {
    this.Auth.fetch(`${this.Auth.domain}/order/statuses`, { method: "GET" })
      .then(response => (statusList = response.content))
      .catch(error => alert("Statuses " + error));
  }

  updateOrderStatus(newJson, id) {
    console.log(id);
    this.Auth.fetch(`${this.Auth.domain}/order/update/status/${id}`, {
      method: "POST",
      body: JSON.stringify(newJson)
    })
      .then(() => this.getOrdersList())
      .catch(error => alert("Orders Update " + error));
  }

  handleOrderStatusChange = (event, ids, type) => {
    event.preventDefault();
    var rows = [];
    this.state.rows.map(row => {
      if (ids.includes(+row.id)) {
        rows.push(row);
      }
    });
    this.updateOrderStatus(rows, getStatusIdByName(type));
  };

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
            <Tab textColor="inherit" label="Активные" />
            <Tab textColor="inherit" label="Выполненые" />
            <Tab textColor="inherit" label="Отмененные" />
            <Tab textColor="inherit" label="Все заказы" />
          </Tabs>
        </AppBar>
        <main className={classes.mainContent}>
          {activeTab === 0 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["ACCEPTED"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["ACCEPTED"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
            />
          )}
          {activeTab === 1 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["COMPLETED"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, [
                "COMPLETED"
              ])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
            />
          )}
          {activeTab === 2 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["CANCELED"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["CANCELED"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
            />
          )}
          {activeTab === 3 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["ALL"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["ALL"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
            />
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
