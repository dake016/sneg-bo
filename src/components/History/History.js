import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AuthService from "../Auth/AuthService";
import withAuth from "../Auth/withAuth";
import HistoryTable from "./HistoryTable";

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  mainContent: {
    flex: 1,
    padding: "14px 36px 0",
    background: "#eaeff1"
  }
});

function visibleData(data) {
  var newData = [];
  data.map(row => {
    newData.push({
      id: row.id,
      user_name: row.user.username,
      action_value: row.value,
      action_type: row.type.description,
      date: row.eventDate
    });
  });
  return newData;
}

class History extends React.Component {
  state = {
    activeTab: 0,
    history: []
  };

  Auth = new AuthService();

  componentDidMount() {
    this.getHistory();
  }

  getHistory() {
    this.Auth.fetch(`${this.Auth.domain}/bo/logs`, { method: "GET" })
      .then(response => {
        this.setState({
          history: response.content
        });
      })
      .catch(error => alert("Orders " + error));
  }

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
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
            <Tab textColor="inherit" label={"История действий Бэк-Офиса"} />
            <Tab textColor="inherit" label={"История действий пользователей"} />
          </Tabs>
        </AppBar>
        <main className={classes.mainContent}>
          {activeTab === 0 && (
            <HistoryTable visibleRows={visibleData(this.state.history)} />
          )}
          {activeTab === 1 && <React.Fragment />}
        </main>
      </React.Fragment>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(History));
