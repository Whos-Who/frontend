import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { initializeGoogleAnalytics } from "./hooks/GoogleAnalytics";
import Home from "./pages/Home";
import Room from "./pages/Room";

const App: React.FC = function () {
  initializeGoogleAnalytics();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room/:id">
          <Room />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
