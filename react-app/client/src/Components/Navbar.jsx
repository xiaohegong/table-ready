import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/navbar.scss';
import { Redirect, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
  state = {};
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  componentDidMount() {
    $(document).ready(function () {
      // Get click event, assign button to var, and get values from that var
      $('#theme-btn-group button').on('click', function () {
        const btn_clicked = $(this);
        btn_clicked
          .addClass('active')
          .siblings()
          .removeClass('active');
        var btnValue = btn_clicked.val();
        console.log('Color theme - ', btnValue);

        if (btnValue === 'light') {
          trans();
          document.documentElement.setAttribute('theme', 'light');
          $('.btn-light')
            .removeClass('btn-light')
            .addClass('btn-primary');
        } else if (btnValue === 'dark') {
          trans();
          document.documentElement.setAttribute('theme', 'dark');
          $('.btn-primary')
            .removeClass('btn-primary')
            .addClass('btn-light');
        }
      });
      let trans = () => {
        document.documentElement.classList.add('transition');
        // $("*").addClass("transition");
        window.setTimeout(() => {
          document.documentElement.classList.remove('transition');
          // $("*").removeClass("transition");
        }, 760);
      };
      // You can use this to set default value
      // It will fire above click event which will do the updates for you
      // $('#theme-btn-group button[value="light"]').click();
    });
  }

  render() {
    return (
      <nav className="navbar-page navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="nav-link btn home-btn"
          onClick={() => {
            console.log('hi');
            window.location.href = '/';
          }}
        >
          <strong>Home</strong>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {/*<form className="form-inline my-2 my-lg-0">*/}
              {/*<input*/}
              {/*className="form-control mr-sm-2"*/}
              {/*type="search"*/}
              {/*placeholder="Search"*/}
              {/*aria-label="Search"*/}
              {/*/>*/}
              {/*<button*/}
              {/*className="btn btn-outline-success my-2 my-sm-0"*/}
              {/*type="submit"*/}
              {/*>*/}
              {/*Search*/}
              {/*</button>*/}
              {/*</form>*/}
            </li>
            <li className="nav-item">
              {/*<a className="nav-link" href="/">*/}
              {/*Link*/}
              {/*</a>*/}
            </li>
            {/*<li className="nav-item dropdown">*/}
            {/*<a*/}
            {/*className="nav-link dropdown-toggle"*/}
            {/*href="/"*/}
            {/*id="navbarDropdown"*/}
            {/*role="button"*/}
            {/*data-toggle="dropdown"*/}
            {/*aria-haspopup="true"*/}
            {/*aria-expanded="false"*/}
            {/*>*/}
            {/*Dropdown*/}
            {/*</a>*/}
            {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
            {/*<a className="dropdown-item" href="/">*/}
            {/*Action*/}
            {/*</a>*/}
            {/*<a className="dropdown-item" href="/">*/}
            {/*Another action*/}
            {/*</a>*/}
            {/*<div className="dropdown-divider"></div>*/}
            {/*<a className="dropdown-item" href="/">*/}
            {/*Something else here*/}
            {/*</a>*/}
            {/*</div>*/}
            {/*</li>*/}
          </ul>
          {/* {this.getButton()} */}
          {this.props.isAuthenticated ? (
            <div>
              <button
                className="btn btn-outline-danger btn-sm logout-btn"
                onClick={this.props.logout}
              >
                Logout
              </button>
            </div>
          ) : (
              <div className="btn-group">
                <Link to="/SignIn">
                  <button className="btn btn-primary btn-sm">Sign In</button>
                </Link>
                <Link to="/SignUp">
                  <button className="btn btn-success btn-sm">Sign Up</button>
                </Link>
              </div>
            )}
        </div>
      </nav>
    );
  }
}

// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  current_user: state.auth.user
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
