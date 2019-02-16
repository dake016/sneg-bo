import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function toDateTime(date) {
  var m = new Date(date);
  var dateString =
    ("0" + m.getDate()).slice(-2) +
    "." +
    ("0" + (m.getMonth() + 1)).slice(-2) +
    "." +
    m.getFullYear() +
    " " +
    ("0" + m.getHours()).slice(-2) +
    ":" +
    ("0" + m.getMinutes()).slice(-2) +
    ":" +
    ("0" + m.getSeconds()).slice(-2);

  return dateString;
}

const rows = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Номер заказа",
    sortable: true
  },
  {
    id: "registered",
    numeric: true,
    disablePadding: false,
    label: "Дата регистрации",
    sortable: true
  },
  {
    id: "baskets",
    numeric: true,
    disablePadding: false,
    label: "Корзины",
    sortable: false
  },
  {
    id: "payment",
    numeric: true,
    disablePadding: false,
    label: "Оплата",
    sortable: true
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Статус",
    sortable: true
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "Комментарий пользователя",
    sortable: true
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property, sortable) => event => {
    this.props.onRequestSort(event, property, sortable);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Сортировать"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id, row.sortable)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          borderRadius: 8
        }
      : {
          color: theme.palette.text.primary
        },
  spacer: {
    flex: "1 1 auto"
  },
  title: {
    flex: "0 0 auto"
  },
  doneOrderButton: {
    fontSize: 14,
    fontWeight: "700",
    color: "#388e3c",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#388e3c",
    margin: "10px 20px 0"
  },
  cancelOrderButton: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f44336",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#f44336",
    margin: "10px 20px 0"
  }
});

let EnhancedTableToolbar = props => {
  const {
    selected,
    numSelected,
    classes,
    handleOrderStatusChange,
    activeTab
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            Выбрано {numSelected}
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Заказы
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          // activeTab == 0 ?
          <React.Fragment>
            <Button
              onClick={event =>
                handleOrderStatusChange(event, selected, "ACCEPTED")
              }
              variant="outlined"
            >
              Принят в обработку
            </Button>
            <Button
              onClick={event =>
                handleOrderStatusChange(event, selected, "COMPLETED")
              }
              className={classes.doneOrderButton}
              variant="outlined"
            >
              Выполнить заказ(ы)
            </Button>
            <Button
              onClick={event =>
                handleOrderStatusChange(event, selected, "CANCELED")
              }
              className={classes.cancelOrderButton}
              variant="outlined"
            >
              Отменить заказ(ы)
            </Button>
          </React.Fragment>
        )
        // : null
        }
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const orderDetailsStyle = theme => ({
  spacer: {
    flex: "1 1 auto"
  },
  orderID: {
    flex: "0 0 auto",
    padding: "2px 6px"
  },
  status: {
    color: "#ffffff",
    fontWeight: "bold",
    border: "2px solid #ff963b",
    backgroundColor: "#ff963b",
    borderRadius: 16,
    padding: "2px 16px"
  },
  statusCompleted: {
    color: "#ffffff",
    fontWeight: "bold",
    border: "2px solid #388e3c",
    backgroundColor: "#388e3c",
    borderRadius: 16,
    padding: "2px 16px"
  },
  statusCanceled: {
    color: "#ffffff",
    fontWeight: "bold",
    border: "2px solid #f44336",
    backgroundColor: "#f44336",
    borderRadius: 16,
    padding: "2px 16px"
  },
  header: {
    display: "flex",
    overflow: "auto"
  },
  paper: {
    margin: "0 20px 20px",
    padding: "20px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  groupLabel: {
    fontSize: "120%",
    marginBottom: "8px",
    color: "#00608e"
  },
  row: {
    display: "flex",
    marginBottom: "32px"
  },
  column: {
    width: "25%"
  },

  label: {
    color: "#848484",
    fontSize: "80%",
    marginBottom: "4px",
    fontWeight: "bold"
  },
  textField: {
    width: "40%",
    marginRight: "5px"
  }
});

class OrderDetails extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const { onClose, selectedRow, classes, ...other } = this.props;
    return selectedRow.id ? (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        {console.log(selectedRow)}
        <DialogTitle id="simple-dialog-title">
          <div className={classes.header}>
            <div className={classes.orderID}>
              Заказ номер №{selectedRow.id} от{" "}
              {toDateTime(selectedRow.registered)}
            </div>
            <div className={classes.spacer} />
            {selectedRow.status.name == "COMPLETED" && (
              <div className={classes.statusCompleted}>
                {selectedRow.status.description}
              </div>
            )}
            {selectedRow.status.name == "CANCELED" && (
              <div className={classes.statusCanceled}>
                {selectedRow.status.description}
              </div>
            )}
            {(selectedRow.status.name == "ACCEPTED" ||
              selectedRow.status.name == "PICKUP" ||
              selectedRow.status.name == "PROCESSING" ||
              selectedRow.status.name == "RETURN" ||
              selectedRow.status.name == "DISPUTE") && (
              <div className={classes.status}>
                {selectedRow.status.description}
              </div>
            )}
          </div>
        </DialogTitle>
        <Paper className={classes.paper}>
          <div className={classes.groupLabel}>Информация пользователя</div>
          <div className={classes.row}>
            <div className={classes.column}>
              <div className={classes.label}>Имя пользователя</div>
              <div className={classes.value}>
                {selectedRow.appUser.fullName
                  ? selectedRow.appUser.fullName
                  : "-"}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Номер телефона</div>
              <div className={classes.value}>
                {selectedRow.appUser.phoneNumber}
              </div>
            </div>
          </div>

          <div className={classes.groupLabel}>Заказ</div>
          <div className={classes.row}>
            {selectedRow.basketList.map(basket => (
              <div key={basket.id} className={classes.column}>
                <div className={classes.label}>{basket.type.description}</div>
                <div className={classes.value}>Кол-во: {basket.count}</div>
              </div>
            ))}
            <div className={classes.column}>
              <div className={classes.label}>Комментарий пользователя</div>
              <div className={classes.value}>
                {selectedRow.note ? selectedRow.note : "-"}
              </div>
            </div>
          </div>

          <div className={classes.groupLabel}>Адрес заказа</div>
          <div className={classes.row}>
            <div className={classes.column}>
              <div className={classes.label}>Улица</div>
              <div className={classes.value}>
                {selectedRow.address.value ? selectedRow.address.value : "-"}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Квартира</div>
              <div className={classes.value}>
                {selectedRow.address.flat ? selectedRow.address.flat : "-"}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Подъезд</div>
              <div className={classes.value}>
                {selectedRow.address.entrance
                  ? selectedRow.address.entrance
                  : "-"}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Этаж</div>
              <div className={classes.value}>
                {selectedRow.address.floor ? selectedRow.address.floor : "-"}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Коментарий</div>
              <div className={classes.value}>
                {selectedRow.address.note ? selectedRow.address.note : "-"}
              </div>
            </div>
          </div>

          <div className={classes.groupLabel}>Дата забора и доставки</div>
          <div className={classes.row}>
            <div className={classes.column}>
              <div className={classes.label}>Время забора</div>
              <div className={classes.value}>
                {toDateTime(selectedRow.pickupDate)}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Время доставки</div>
              <div className={classes.value}>
                {toDateTime(selectedRow.returnDate)}
              </div>
            </div>
          </div>

          <div className={classes.groupLabel}>Информация об оплате</div>
          <div className={classes.row}>
            <div className={classes.column}>
              <div className={classes.label}>Тип оплаты</div>
              <div className={classes.value}>
                {selectedRow.paymentType.description}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Оплачено</div>
              <div className={classes.value}>
                {selectedRow.paid ? "Да" : "Нет"}
              </div>
            </div>
          </div>

          <div className={classes.groupLabel}>Поставщик услуги</div>
          <div className={classes.row}>
            <div className={classes.column}>
              <div className={classes.label}>Название фирмы</div>
              <div className={classes.value}>
                {selectedRow.serviceProvider.name}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.label}>Дата регистрации</div>
              <div className={classes.value}>
                {toDateTime(selectedRow.serviceProvider.registered)}
              </div>
            </div>
          </div>

          <div className={classes.groupLabel}>Ваш комментарий к заказу</div>
          <div className={classes.row}>
            <div className={classes.textField}>
              <TextField
                id="spNote"
                fullWidth
                defaultValue={selectedRow.spNote}
                padding="5px"
              />
            </div>
            <div className={classes.column}>
              <Button variant="contained" color="primary">
                Отправить
              </Button>
            </div>
          </div>
        </Paper>
      </Dialog>
    ) : null;
  }
}

OrderDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedRow: PropTypes.object.isRequired
};

OrderDetails = withStyles(orderDetailsStyle)(OrderDetails);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class OrdersTable extends React.Component {
  state = {
    order: "desc",
    orderBy: "registered",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    modalOpen: false,
    selectedRow: {}
  };

  handleRequestSort = (event, property, sortable) => {
    if (!sortable) return;
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: this.props.visibleRows.map(n => n.id)
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRowClick = (event, id) => {
    this.props.allRows.map(row =>
      row.id == id ? this.setState({ selectedRow: row }) : null
    );
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const data = this.props.visibleRows;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <OrderDetails
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          selectedRow={this.state.selectedRow}
        />
        <EnhancedTableToolbar
          selected={selected}
          numSelected={selected.length}
          activeTab={this.props.activeTab}
          handleOrderStatusChange={this.props.handleOrderStatusChange}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isSelected = this.isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleRowClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onClick={event =>
                            this.handleCheckboxClick(event, row.id)
                          }
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">
                        {toDateTime(row.registered)}
                      </TableCell>
                      <TableCell align="right">
                        {row.basket.map(basket => (
                          <div key={basket.id}>
                            {basket.type.description}: {basket.count}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="right">{row.payment}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        {row.note ? row.note : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} из ${count}`
          }
          backIconButtonProps={{
            "aria-label": "Предыдущая страница"
          }}
          nextIconButtonProps={{
            "aria-label": "Следующая страница"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

OrdersTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersTable);
