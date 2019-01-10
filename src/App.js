import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Router, Route, Redirect, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./components/Main";
import Signin from "./components/Signin";

import "./Reset.css";
import "./App.css";

// Authentication commented

// const fakeAuth = {
//   isAuthenticated: true,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };
// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         fakeAuth.isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/signin",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
