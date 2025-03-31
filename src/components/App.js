// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import MedChainApp from "./MedChainApp";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/app" component={MedChainApp} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
