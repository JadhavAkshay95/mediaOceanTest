import "./App.css";
import LandingPage from "./LandingPage";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DetailsPage from "./DetailsPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/details/:key">
            <DetailsPage />
          </Route>
        </Switch>
      </Router>
      <div className="App"></div>
    </>
  );
}

export default App;
