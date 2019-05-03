import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import NoMatch from "./pages/no-match";
import Loadings from "./pages/ui/loadings";
import Modals from "./pages/ui/modals";
import Notifications from './pages/ui/notification';
import Messages from './pages/ui/messages';
import XTabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import XCarousel from "./pages/ui/carousel";
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
                <Route path="/admin/ui/modals" component={Modals} />
                <Route path="/admin/ui/loading" component={Loadings} />
                <Route
                  path="/admin/ui/notification"
                  component={Notifications}
                />
                <Route path="/admin/ui/messages" component={Messages} />
                <Route path="/admin/ui/tabs" component={XTabs} />
                <Route path="/admin/ui/gallery" component={Gallery} />
                <Route path="/admin/ui/carousel" component={XCarousel} />

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
