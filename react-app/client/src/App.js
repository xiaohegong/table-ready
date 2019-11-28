import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import Navbar from "./Components/Navbar";
import './App.scss';
import SignIn from './Components/SignIn&Up/signIn';
import SignUp from './Components/SignIn&Up/signup';
import RestaurateurPage from './Components/Restaurateur/RestaurateurPage';
import RestaurateurPage2 from './Components/Restaurateur/RestaurateurPage2';
import Dashboard from './Components/Restaurateur/Dashboard';
import Admin from './Components/Admin/Admin';
import Employee from './Components/Employee/employee';
import './App.scss';
import { withCookies, useCookies } from 'react-cookie';
// import NotFound from "./Components/page_not_found/page_not_found";
import NotFound from './Components/page_not_found/404';
import NewRestaurant from './Components/Restaurateur/NewRestaurant';
import AddNewMenuItem from './Components/Restaurateur/AddNewMenuItem';
import { Provider } from 'react-redux';
import {store} from './store';
import { loadUser } from './actions/authActions';
import EditMenuItem from './Components/Restaurateur/EditMenuItem';
class App extends React.Component {
  state = {};
  componentDidMount() {
    console.log('component did mount, APP.js, loading user');
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <SignIn />} />
            <Route exact path="/SignIn" render={() => <SignIn />} />
            <Route exact path="/SignUp" render={() => <SignUp />} />
            <Route path="/error" component={NotFound} />
            <Route
              exact
              path="/restaurateur/:id"
              component={() => <RestaurateurPage />}
            />
            <Route
              exact
              path="/restaurateur2/:id"
              component={() => <RestaurateurPage2 />}
            />
            <Route exact path="/dashboard" render={() => <Dashboard />} />
            <Route exact path="/admin/:id" render={() => <Admin />} />
            <Route exact path="/employee/:id" render={() => <Employee />} />

            <Route
              exact
              path="/addNewMenuItem"
              render={() => <AddNewMenuItem />}
            />
            <Route exact path="/editMenuItem" render={() => <EditMenuItem />} />
            <Route
              exact
              path="/addNewRestaurant"
              render={() => <NewRestaurant />}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
