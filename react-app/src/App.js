import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar"
import RestaurateurPage from "./Components/Restaurateur/RestaurateurPage"
import Dashboard from "./Components/Restaurateur/Dashboard"
import './App.scss';
import SignIn from "./Components/SignIn&Up/signIn"
import SignUp from "./Components/SignIn&Up/signup"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={RestaurateurPage} />
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/SignUp" component={SignUp}/>

        </Switch>

          <Route exact path="/" component={Dashboard} />


      </BrowserRouter>
    </div>

  );
}

export default App;
