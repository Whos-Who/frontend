import "./App.css";

import React, { ReactElement } from "react";

import Button from "./components/Button";
import logo from "./logo.svg";

const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={() => console.log("clicked")}>Click me</Button>
      </header>
    </div>
  );
};

export default App;
