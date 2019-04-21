import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./components/Base/Main";
import Login from "./components/pages/Login";

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
