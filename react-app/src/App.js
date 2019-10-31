import React from "react";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import RestaurateurPage from "./Components/Restaurateur/RestaurateurPage";
import RestaurateurPage2 from "./Components/Restaurateur/RestaurateurPage2";
import Dashboard from "./Components/Restaurateur/Dashboard";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/restaurateur" component={RestaurateurPage} />
          <Route exact path="/restaurateur2" component={RestaurateurPage2} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
