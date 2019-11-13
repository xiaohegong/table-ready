import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// import Navbar from "./Components/Navbar";
import "./App.scss";
import SignIn from "./Components/SignIn&Up/signIn";
import SignUp from "./Components/SignIn&Up/signup";
import RestaurateurPage from "./Components/Restaurateur/RestaurateurPage";
import RestaurateurPage2 from "./Components/Restaurateur/RestaurateurPage2";
import Dashboard from "./Components/Restaurateur/Dashboard";
import Admin from "./Components/Admin/Admin";
import Employee from "./Components/Employee/employee";
import "./App.scss";
import { withCookies, useCookies } from "react-cookie";
// import Customers from "./Components/Customers";
import NewRestaurant from "./Components/Restaurateur/NewRestaurant";
import AddNewMenuItem from "./Components/Restaurateur/AddNewMenuItem";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["cur_user"]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <RestaurateurPage
                cookies={{ cookies, setCookie, removeCookie }}
              />
            )}
          />
          <Route
            exact
            path="/SignIn"
            render={() => (
              <SignIn cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />
          <Route
            exact
            path="/SignUp"
            render={() => (
              <SignUp cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />
          <Route
            exact
            path="/restaurateur"
            render={() => (
              <RestaurateurPage
                cookies={{ cookies, setCookie, removeCookie }}
              />
            )}
          />
          <Route
            exact
            path="/restaurateur2/:id"
            render={() => (
              <RestaurateurPage2
                cookies={{ cookies, setCookie, removeCookie }}
              />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />
          <Route
            exact
            path="/admin"
            render={() => (
              <Admin cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />
          <Route
            exact
            path="/employee"
            render={() => (
              <Employee cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />

          <Route
            exact
            path="/addNewMenuItem"
            render={() => (
              <AddNewMenuItem cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />
          <Route
            exact
            path="/addNewRestaurant"
            render={() => (
              <NewRestaurant cookies={{ cookies, setCookie, removeCookie }} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withCookies(App);
