import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./components/Main";
import Login from "./components/Auth/Login";

import "./App.css";

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
