import React from "react";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar"
import './App.scss';
import SignIn from "./Components/SignIn&Up/signIn"
import SignUp from "./Components/SignIn&Up/signup"
import RestaurateurPage from "./Components/Restaurateur/RestaurateurPage";
import RestaurateurPage2 from "./Components/Restaurateur/RestaurateurPage2";
import Dashboard from "./Components/Restaurateur/Dashboard";
import "./App.scss";
import Customers from "./Components/Customers";
import NewRestaurant from "./Components/Restaurateur/NewRestaurant";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={RestaurateurPage} />
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/restaurateur" component={RestaurateurPage} />
          <Route exact path="/restaurateur2" component={RestaurateurPage2} />
            <Route exact path="/addNewRestaurant" component={NewRestaurant} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
      <Customers />
    </div>
  );
}

export default App;
