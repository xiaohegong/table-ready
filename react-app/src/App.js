import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar"
import RestaurateurPage from "./Components/Restaurateur/RestaurateurPage"
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={RestaurateurPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
