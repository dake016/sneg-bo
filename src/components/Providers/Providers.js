import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AuthService from "../Auth/AuthService";
import withAuth from "../Auth/withAuth";
import ProvidersTable from "./ProvidersTable";

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
      id: row.serviceProvider.id,
      name: row.serviceProvider.name,
      active: row.serviceProvider.active,
      orders: row.count
    });
  });
  return newData;
}

class Providers extends React.Component {
  state = {
    rows: []
  };

  Auth = new AuthService();

  componentDidMount() {
    this.Auth.fetch(`${this.Auth.domain}/sp/orders`, { method: "GET" })
      .then(response => {
        console.log(response.content);
        this.setState({ rows: response.content });
      })
      .catch(error => alert("SP " + error));
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.mainContent}>
          <ProvidersTable
            allRows={this.state.rows}
            visibleRows={visibleData(this.state.rows)}
          />
        </main>
      </React.Fragment>
    );
  }
}

Providers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Providers));
