import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Room from "./pages/Room";

const App: React.FC = function () {
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
