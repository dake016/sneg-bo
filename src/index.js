import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Redirect, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./components/Main";
import Signin from "./components/Signin";

import "./Reset.css";
import "./App.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route path="/" component={Main} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
