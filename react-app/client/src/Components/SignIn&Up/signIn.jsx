import React, { Component } from 'react';
import '../../Stylesheets/signIn&Up.scss';
import Avatar from './icon.jpg';
import Animation from './animation.jsx';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const log = console.log;
class SignIn extends Component {
  state = {
    username: '',
    password: '',
    message: null
  };

  // handleChange(event) {
  //   this.setState({ accountType: event.target.value });
  // }
  componentDidUpdate(prevProps) {
    // update error message
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }
  }

  handleSignIn = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const user = {
      username,
      password
    };
    // Attempt to login
    this.props.clearErrors();
    this.props.login(user);

    // const users = this.state.users;
    // console.log(users);
    // const user = users.filter(user => user.username === this.state.username);
    // if (user.length === 0) {
    //   alert('this user does not exist!');
    // } else if (this.state.password !== user[0].password) {
    //   alert('incorrect password!');
    // } else {
    //   const userType = user[0].accountType;
    //   const userId = user[0]._id;
    //   if (userType === 'SuperAdmin') {
    // this.props.cookies.setCookie('cur_user', user[0], {
    //   path: '/',
    //   expires: 0
    // });
    // log('sign in successfully!');
    // console.log(this.props.cookies.cookies);
    // window.location.href = '/admin/' + userId;
    // } else if (userType === 'Admin') {
    // this.props.cookies.setCookie('cur_user', user[0], {
    //   path: '/',
    //   expires: 0
    // });
    // window.location.href = '/restaurateur/' + userId;
    // } else if (userType === 'Employee') {
    // this.props.cookies.setCookie('cur_user', user[0], {
    //   path: '/',
    //   expires: 0
    // });
    // window.location.href = '/employee/' + userId;
    // }
    // }
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  componentWillMount() {
    // axios
    //   .get('/user/info')
    //   .then(res => {
    //     this.setState({
    //       users: res.data
    //     });
    //   })
    //   .catch(error => {
    //     log(error);
    //   });
  }

  getRedirected = () => {
    const { accountType } = this.props.current_user;
    const user_id = this.props.current_user._id;
    if (accountType === 'SuperAdmin') {
      window.location.href = '/admin/' + user_id;
    } else if (accountType === 'Admin') {
      window.location.href = '/restaurateur/' + user_id;
    } else if (accountType === 'Employee') {
      window.location.href = '/employee/' + user_id;
    }
  };

  render() {
    // if (this.props.cookies.cookies.cur_user) {
    //   if (this.props.cookies.cookies.cur_user.accountType === 'Admin') {
    //     return (
    //       <Redirect
    //         to={'/restaurateur/' + this.props.cookies.cookies.cur_user._id}
    //       />
    //     );
    //   }
    // }
    if (this.props.isAuthenticated) {
      return this.getRedirected();
    }
    return (
      <div id="signIn-Up">
        <Navbar />
        {this.state.message ? (
          <div
            id="signin-alert-danger"
            className="alert alert-danger"
            role="alert"
          >
            {this.state.message}
          </div>
        ) : null}
        <Animation />
        <div id="divPage">
          <div className="container">
            <img id="avatar" src={Avatar} alt="Avatar" />
            <button className="btn"> + </button>
          </div>
          <br />
          <br />
          {/*<div className="input-group mb-3">*/}
          {/*  <div className="input-group-prepend">*/}
          {/*    <span className="input-group-text" id="inputGroup-sizing-default">*/}
          {/*      Type*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*  <select*/}
          {/*    className="form-control"*/}
          {/*    value={this.state.accountType}*/}
          {/*    onChange={this.handleChange}*/}
          {/*  >*/}
          {/*    <option value="SuperAdmin">SuperAdmin</option>*/}
          {/*    <option value="Admin">Admin</option>*/}
          {/*    <option value="Employee">Employee</option>*/}
          {/*  </select>*/}
          {/*</div>*/}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Username
              </span>
            </div>
            <input
              name="uername"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={this.handleUsername}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input
              name="password"
              type="password"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={this.handlePassword}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleSignIn}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
}

// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  current_user: state.auth.user
});

export default connect(mapStateToProps, { login, clearErrors })(SignIn);
