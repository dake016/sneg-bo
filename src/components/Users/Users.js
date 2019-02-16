import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AuthService from "../Auth/AuthService";
import withAuth from "../Auth/withAuth";
import UsersTable from "./UsersTable";

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

function visibleData(data) {
  var newData = [];
  data.map(row => {
    newData.push({
      id: row.appUser.id,
      phone: row.appUser.phoneNumber,
      name: row.appUser.fullName,
      registered: row.appUser.registered,
      lastvisit: row.appUser.lastVisit,
      orders: row.count
    });
  });
  return newData;
}

class Users extends React.Component {
  state = {
    rows: []
  };

  Auth = new AuthService();

  componentDidMount() {
    this.Auth.fetch(`${this.Auth.domain}/user/orders`, { method: "GET" })
      .then(response => this.setState({ rows: response.content }))
      .catch(error => alert("user all " + error));
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.mainContent}>
          <UsersTable
            allRows={this.state.rows}
            visibleRows={visibleData(this.state.rows)}
          />
        </main>
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Users));
