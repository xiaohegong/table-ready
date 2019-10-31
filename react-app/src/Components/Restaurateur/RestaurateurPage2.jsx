import React, { Component } from "react";
import EmployeeListItem from "./EmployeeListItem";
import "../../Stylesheets/restaurateur_page_2.scss";

class RestaurateurPage2 extends Component {
  state = {};
  render() {
    return (
      <div className="restaurateur-page-2">
        <div className="container">
          <div className="row">
            <div className="col-md-4 restaurant-info">
              <h2>Restaurant Info</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name: </strong> restaurant name
                </li>
                <li className="list-group-item">
                  <strong>ID: </strong> 9901848184
                </li>
                <li className="list-group-item">
                  <strong>Address: </strong> 960 East Whitemarsh Street Astoria,
                  NY 11102
                </li>
                <li className="list-group-item">
                  <strong>Telephone: </strong> 123-456-7890
                </li>
                <li className="list-group-item">
                  <strong>Rating: </strong> 4
                </li>
                <li className="list-group-item">
                  <strong>Cuisine: </strong> Canadian
                </li>
              </ul>
              <h2>Options</h2>
              <div className="list-group options">
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Employees
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Dress Code
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Payment
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Go To Employee Page
                </button>
              </div>
            </div>
            <div className="col-md-8 content-display">
              <h2>Employees</h2>
              <div className="list-group employee-list">
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
                <EmployeeListItem
                  image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  name="Employee Name"
                  id="employee881294"
                  telephone="123-456-7890"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurateurPage2;
