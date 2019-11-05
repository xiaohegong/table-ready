import React, {Component} from 'react';
import "../../Stylesheets/signIn&Up.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: "SuperAdmin",
      username: "",
      password: "",
      email: "",
      tel: "",
      manager: "",
      confirm: "",
      Super: true
    };
    this.signUp = this.signUp.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTelChange = this.handleTelChange.bind(this);
    this.handleManagerChange = this.handleManagerChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
  }

  handleTypeChange(event) {
    if (event.target.value === "SuperAdmin") {
      this.setState({
        accountType: event.target.value,
        Super: true
      });
    }else {
      this.setState({
        accountType: event.target.value,
        Super: false
      });
    }
  }

  handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  handleTelChange (event) {
    this.setState({tel: event.target.value});
  }

  handleManagerChange (event) {
    this.setState({manager: event.target.value});
  }

  handleUsernameChange (event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

  handleConfirmChange (event) {
    this.setState({confirm: event.target.value});
  }

  signUp(event) {
    event.preventDefault();
    const accountType = this.state.accountType;
    const username = this.state.name;
    const email = this.state.email;
    const tel = this.state.tel;
    const password = this.state.password;
    const confirm = this.state.confirm;
    const manager = this.state.manager;

    if (username === "" || password === "" || tel === "" ||
      email === "" || confirm === "" || (accountType !== "SuperAdmin" && manager === "")) {
      alert("All inputs must be filled in");
    } else if (password !== confirm) {
      alert("Your password doesn't match confirm");
    } else if (tel.length !== 10) {
      alert("telephone should be length of 10");
    } else if (!email.includes("@") && !email.includes(".")) {
      alert("enter proper email");
    }else {
      // The following code should be replaced with code connecting to server and create an account in database
      // Check if user exists from server
      // code below requires server call
      const users = []; //TODO: from server
      if (users.filter(user => user.username === username).length !== 0) {
        console.log("Username already exists");
        alert("Username already exists, change another one");
      } else {
        const user = {};
        user["email"] = email;
        user["password"] = password;
        user["tel"] = tel;
        user["username"] = username;
        user["avatar"] = "";
        user["banner"] = "";
        user["nickname"] = username;
        users.push(user);
        // this.props.history.push("/");
      }
    }
  }

  render () {
    return (
      <div id="signIn-Up">
        <div id="divPage">
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
                <option value="SuperAdmin">SuperAdmin</option>
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
                onChange = {this.handleEmailChange}
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
                name="telephone"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange = {this.handleTelChange}
              />
            </div>
            {!this.state.Super ?
              (<div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default"
                        >
                          Manager
                        </span>
                  </div>
                  <input
                    name="manager"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange = {this.handleManagerChange}
                  />
                </div>
              </div>): null}
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
                onChange = {this.handleUsernameChange}
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
                onChange = {this.handlePasswordChange}
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
                onChange = {this.handleConfirmChange}
              />
            </div>
            <button type="submit" className="btn btn-danger">Register</button>
          </form>
        </div>
      </div>
    )
  }

}

export default SignUp;