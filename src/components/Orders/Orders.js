import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import IconButton from "@material-ui/core/IconButton";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
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

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  paper: {
    margin: "auto",
    overflow: "hidden",

    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
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
  },
  newOrders: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "50px"
  },
  numCircle: {
    borderRadius: "0.8em",
    backgroundColor: "#fff",
    color: "#009be5",
    display: "inline-block",
    lineHeight: "1.6em",
    marginLeft: "3px",
    textAlign: "center",
    width: "1.6em"
  },
  numCircleRed: {
    borderRadius: "0.8em",
    backgroundColor: "#f50057",
    color: "#fff",
    display: "inline-block",
    lineHeight: "1.6em",
    marginLeft: "3px",
    textAlign: "center",
    width: "1.6em"
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
        pickup: row.pickupDate,
        returnDate: row.returnDate,
        phone: row.appUser.phoneNumber,
        basket: row.basketList,
        status: row.status.description,
        note: row.note
      });
    }
  });
  return newData;
}

function countOrders(data, status) {
  var count = 0;
  data.map(row => {
    if (status.includes(row.status.name) || status[0] == "ALL") {
      count = count + 1;
    }
  });
  return count;
}

class OrdersList extends React.Component {
  state = {
    activeTab: 0,
    rows: [],
    newOrdersCount: 0
  };

  Auth = new AuthService();

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  componentDidMount() {
    this.getOrdersList();
    this.getStatuses();
    this.interval = setInterval(() => {
      this.Auth.fetch(`${this.Auth.domain}/order/all`, { method: "GET" })
        .then(response => {
          this.setState({ newOrdersCount: response.content.length });
        })
        .catch(error => alert("Auto orders" + error));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getOrdersList() {
    this.Auth.fetch(`${this.Auth.domain}/order/all`, { method: "GET" })
      .then(response =>
        this.setState({
          rows: response.content,
          newOrdersCount: response.content.length
        })
      )
      .catch(error => alert("Orders " + error));
  }

  getStatuses() {
    this.Auth.fetch(`${this.Auth.domain}/order/statuses`, { method: "GET" })
      .then(response => (statusList = response.content))
      .catch(error => alert("Statuses " + error));
  }

  updateOrderStatus(newJson, id) {
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
            <Tab
              textColor="inherit"
              label={
                <React.Fragment>
                  Активные
                  {countOrders(this.state.rows, ["ACCEPTED"]) > 0 ? (
                    <div className={classes.numCircleRed}>
                      {countOrders(this.state.rows, ["ACCEPTED"])}
                    </div>
                  ) : (
                    <div className={classes.numCircle}>
                      {countOrders(this.state.rows, ["ACCEPTED"])}
                    </div>
                  )}
                </React.Fragment>
              }
            />
            <Tab
              textColor="inherit"
              label={
                <React.Fragment>
                  Забор
                  {countOrders(this.state.rows, ["PICKUP"]) > 0 ? (
                    <div className={classes.numCircleRed}>
                      {countOrders(this.state.rows, ["PICKUP"])}
                    </div>
                  ) : (
                    <div className={classes.numCircle}>
                      {countOrders(this.state.rows, ["PICKUP"])}
                    </div>
                  )}
                </React.Fragment>
              }
            />
            <Tab
              textColor="inherit"
              label={
                <React.Fragment>
                  Стирка
                  {countOrders(this.state.rows, ["PROCESSING"]) > 0 ? (
                    <div className={classes.numCircleRed}>
                      {countOrders(this.state.rows, ["PROCESSING"])}
                    </div>
                  ) : (
                    <div className={classes.numCircle}>
                      {countOrders(this.state.rows, ["PROCESSING"])}
                    </div>
                  )}
                </React.Fragment>
              }
            />
            <Tab
              textColor="inherit"
              label={
                <React.Fragment>
                  Доставка
                  {countOrders(this.state.rows, ["RETURN"]) > 0 ? (
                    <div className={classes.numCircleRed}>
                      {countOrders(this.state.rows, ["RETURN"])}
                    </div>
                  ) : (
                    <div className={classes.numCircle}>
                      {countOrders(this.state.rows, ["RETURN"])}
                    </div>
                  )}
                </React.Fragment>
              }
            />
            <Tab textColor="inherit" label="Выполненые" />
            <Tab textColor="inherit" label="Отмененные" />
            <Tab textColor="inherit" label="Диспут" />
            <Tab
              textColor="inherit"
              label={
                <React.Fragment>
                  Все заказы
                  <div className={classes.numCircle}>
                    {countOrders(this.state.rows, ["ALL"])}
                  </div>
                </React.Fragment>
              }
            />
            <div className={classes.newOrders}>
              {" "}
              {this.state.newOrdersCount - this.state.rows.length > 0 ? (
                this.state.newOrdersCount - this.state.rows.length > 1 ? (
                  <React.Fragment>
                    <IconButton
                      color="inherit"
                      onClick={() => this.getOrdersList()}
                    >
                      <RefreshOutlinedIcon />
                    </IconButton>{" "}
                    Новых заказов{" "}
                    <div className={classes.numCircleRed}>
                      {this.state.newOrdersCount - this.state.rows.length}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <IconButton
                      color="inherit"
                      onClick={() => this.getOrdersList()}
                    >
                      <RefreshOutlinedIcon />
                    </IconButton>{" "}
                    Новый заказ
                  </React.Fragment>
                )
              ) : (
                ``
              )}
            </div>
          </Tabs>
        </AppBar>
        <main className={classes.mainContent}>
          {activeTab === 0 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["ACCEPTED"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["ACCEPTED"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"asc"}
              orderBy={"pickup"}
            />
          )}
          {activeTab === 1 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["PICKUP"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["PICKUP"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"asc"}
              orderBy={"pickup"}
            />
          )}
          {activeTab === 2 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["PROCESSING"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, [
                "PROCESSING"
              ])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"asc"}
              orderBy={"returnDate"}
            />
          )}
          {activeTab === 3 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["RETURN"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["RETURN"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"asc"}
              orderBy={"returnDate"}
            />
          )}
          {activeTab === 4 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["COMPLETED"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, [
                "COMPLETED"
              ])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"desc"}
              orderBy={"registered"}
            />
          )}
          {activeTab === 5 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["CANCELED"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["CANCELED"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"desc"}
              orderBy={"registered"}
            />
          )}
          {activeTab === 6 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["DISPUTE"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["DISPUTE"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"desc"}
              orderBy={"registered"}
            />
          )}
          {activeTab === 7 && (
            <OrdersTable
              allRows={dataUpToStatus(this.state.rows, ["ALL"])}
              visibleRows={dataUpToStatusVisible(this.state.rows, ["ALL"])}
              activeTab={activeTab}
              handleOrderStatusChange={this.handleOrderStatusChange}
              order={"desc"}
              orderBy={"registered"}
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
