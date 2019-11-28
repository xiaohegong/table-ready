import React, { Component } from 'react';
import '../../Stylesheets/signIn&Up.scss';
import Avatar from './icon.jpg';
import Animation from './animation.jsx';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    message: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
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
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.redirectUser();
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
  };

  redirectUser = () => {
    if (this.props.isAuthenticated) {
      const accountType = this.props.current_user.accountType;
      const user_id = this.props.current_user._id;
      if (accountType === 'SuperAdmin') {
        this.props.history.push('/admin/' + user_id);
      } else if (accountType === 'Admin') {
        this.props.history.push('/restaurateur/' + user_id);
      } else if (accountType === 'Employee') {
        this.props.history.push('/employee/' + user_id);
      }
    }
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    if (this.props.isAuthenticated) {
      console.log('redirecting in signin page');
      this.redirectUser();
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
        {/*<Animation />*/}
        <div id="divPage">
          <div className="container">
            <img id="avatar" src={Avatar} alt="Avatar" />
            <button className="btn"> + </button>
          </div>
          <br />
          <br />
          <form action="" onSubmit={this.handleSignIn}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
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
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
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
            <div className="input-group mb-3">
              <button type="submit" className="btn btn-danger btn-block">
                Log In
              </button>
            </div>
          </form>
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

export default connect(mapStateToProps, { login, clearErrors })(
  withRouter(SignIn)
);
