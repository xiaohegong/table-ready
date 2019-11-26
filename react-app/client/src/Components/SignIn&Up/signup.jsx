import React, { Component } from 'react';
import '../../Stylesheets/signIn&Up.scss';
import { Redirect, withRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { REGISTER_FAIL } from '../../actions/actionTypes';
import Animation from './animation.jsx';

const log = console.log;

class SignUp extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     accountType: 'SuperAdmin',
  //     username: '',
  //     password: '',
  //     email: '',
  //     tel: '',
  //     confirm: '',
  //     Super: true
  //   };
  //   this.signUp = this.signUp.bind(this);
  //   this.handleTypeChange = this.handleTypeChange.bind(this);
  //   this.handleEmailChange = this.handleEmailChange.bind(this);
  //   this.handleTelChange = this.handleTelChange.bind(this);
  //   this.handleUsernameChange = this.handleUsernameChange.bind(this);
  //   this.handlePasswordChange = this.handlePasswordChange.bind(this);
  //   this.handleConfirmChange = this.handleConfirmChange.bind(this);
  // }

  state = {
    accountType: 'Admin',
    username: '',
    password: '',
    email: '',
    tel: '',
    confirm: '',
    Super: true
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === REGISTER_FAIL) {
        // if new error type is not the same as the previous state's error type
        // update the error message
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.clearErrors();
  };

  handleTypeChange = event => {
    if (event.target.value === 'SuperAdmin') {
      this.setState({
        accountType: event.target.value,
        Super: true
      });
    } else {
      this.setState({
        accountType: event.target.value,
        Super: false
      });
    }
  };

  // handleEmailChange(event) {
  //   this.setState({ email: event.target.value });
  // }

  // handleTelChange(event) {
  //   this.setState({ tel: event.target.value });
  // }

  // handleUsernameChange(event) {
  //   this.setState({ username: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  // handleConfirmChange(event) {
  //   this.setState({ confirm: event.target.value });
  // }

  componentWillMount() {
    axios
      .get('/user/info')
      .then(res => {
        log(res.data);
        this.setState({
          users: res.data
        });
      })
      .catch(error => {
        log(error);
      });
  }

  signUp = event => {
    event.preventDefault();
    // const username = this.state.username;
    // const email = this.state.email;
    // const tel = this.state.tel;
    // const password = this.state.password;
    // const confirm = this.state.confirm;

    // if (
    //   username === '' ||
    //   password === '' ||
    //   tel === '' ||
    //   email === '' ||
    //   confirm === ''
    // ) {
    //   alert('All inputs must be filled in');
    // } else if (password !== confirm) {
    //   alert("Your password doesn't match confirm");
    // } else if (!email.includes('@') && !email.includes('.')) {
    //   alert('enter proper email');
    // } else if (password.length < 4) {
    //   alert('Password too short, need to be at least 4 character.');
    // } else {
    //   const users = this.state.users;
    //   if (users.filter(user => user.username === username).length !== 0) {
    //     log('Username already exists');
    //     alert('Username already exists, change another one');
    //   } else {
    this.props.clearErrors();
    const { accountType, username, password, email, tel } = this.state;

    // Create user object
    const new_user = {
      accountType,
      username,
      password,
      email,
      tel
    };

    // Attempt to register
    this.props.register(new_user);
    // }
    // }
  };

  signup = e => {
    e.preventDefault();
    this.props.clearErrors();
    const { username, email, password } = this.state;

    // Create user object
    const new_user = {
      username,
      email,
      password
    };

    // Attempt to register
    this.props.register(new_user);
  };

  componentDidMount() {
    // If alreadly loged in, go to home page.
    // if (this.props.isAuthenticated) {
    //   alert('You already loged in!');
    //   this.props.history.push('/');
    // }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div id="signIn-Up">
        <Navbar />
        {this.state.message ? (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        ) : null}

        <Navbar cookies={this.props.cookies} />
        <Animation />

        <div id="divPage">
          <header className="center header-style">SIGN UP HERE: </header>
          <form action="" onSubmit={this.signUp}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Type
                </span>
              </div>
              <select
                className="form-control"
                value={this.state.accountType}
                onChange={this.handleTypeChange}
              >
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Email
                </span>
              </div>
              <input
                name="email"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={this.onChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Telephone
                </span>
              </div>
              <input
                name="tel"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={this.onChange}
              />
            </div>
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
                name="username"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={this.onChange}
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
                onChange={this.onChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Confirm
                </span>
              </div>
              <input
                name="confirm"
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-danger">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  current_user: state.auth.user
});

export default connect(mapStateToProps, { register, clearErrors })(
  withRouter(SignUp)
);
