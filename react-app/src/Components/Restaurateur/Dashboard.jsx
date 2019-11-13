import React, { Component } from "react";
import "../../Stylesheets/navbar.scss";
import Employees from "./Employees";
import GeneralInfo from "./GeneralInfo";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  state = {
    curState: <GeneralInfo />,
    functions: [
      {
        id: 1,
        title: "dress code"
      },
      {
        id: 2,
        title: "Manage Employees"
      },
      {
        id: 3,
        title: "menu"
      },
      {
        id: 4,
        title: "General Infos"
      }
    ]
  };
  components = {
    "1": "dressCode",
    "2": <Employees />,
    "3": "menu",
    "4": <GeneralInfo />
  };

  curState = "4";

  showComponent = componentName => {
    console.log(componentName);
    this.curState = this.components[componentName];
    this.setState({
      curState: this.curState
    });
  };
  is_authenticated = () => {
    const cur_user = this.props.cookies.cookies.cur_user;
    if (cur_user.accountType === "Employee") {
      return false;
    }
    return true;
  };
  // this.state.functions.map((fun)=>(
  // <button className="nav-item" onClick={this.switchBoard}>{fun.title}</button>
  // ))
  render() {
    if (this.is_authenticated()) {
      return (
        <div>
          <div>
            {this.state.functions.map(fun => (
              <button
                className="nav-item"
                onClick={this.showComponent.bind(this, fun.id)}
              >
                {fun.title}
              </button>
            ))}
          </div>
          <div>{this.state.curState}</div>
        </div>
      );
    } else {
      return <Redirect to="/error"></Redirect>;
    }
  }
}

export default Dashboard;
