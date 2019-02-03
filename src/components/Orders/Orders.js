import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import TableChart from "@material-ui/icons/TableChart";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

function toDateTime(millisecs) {
  var t = new Date(1970, 0, 1);
  t.setMilliseconds(millisecs);
  return t.toLocaleString();
}

class Orders extends React.Component {
  state = {
    modalVisible: false,
    isSelected: false
  };
  handleClick = (event, value) => {
    console.log();
  };
  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <AppBar
          className={this.props.classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <TableChart
                  className={this.props.classes.block}
                  color="inherit"
                />
              </Grid>
              <Grid item xs>
                <Typography>{this.props.title}</Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon
                      className={this.props.classes.block}
                      color="inherit"
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.contentWrapper}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Order ID </TableCell>
                <TableCell>Registered </TableCell>
                <TableCell align="center">Baskets</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>User note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.props.rows).map(key => {
                const row = this.props.rows[key];
                if (this.props.tabIds.includes(+row.status.id)) {
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      onClick={event => this.handleClick(event, row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{toDateTime(row.registered)}</TableCell>
                      <TableCell>
                        <ul>
                          {row.basketList.map(basket => (
                            <li key={basket.type.name}>
                              {basket.type.description}: {basket.count}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>{row.paymentType.description}</TableCell>
                      <TableCell>{row.status.description}</TableCell>
                      <TableCell>{row.note}</TableCell>
                      <TableCell>
                        <Checkbox checked={row.checked} />
                      </TableCell>
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
  }
}

export default Orders;
