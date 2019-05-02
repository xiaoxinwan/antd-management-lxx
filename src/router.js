import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Home from './pages/home'
import Buttons from "./pages/ui/buttons";
import NoMatch from "./pages/no-match";

export default class XRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/ui/buttons" component={Buttons} />
                {/* <Route component={NoMatch} /> */}
              </Admin>
            )}
          />
          <Route path="/order/detail" component={Admin} />
        </App>
      </HashRouter>
    );
  }
}
