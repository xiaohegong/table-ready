import React, { Component } from "react";
import EmployeeListItem from "./EmployeeListItem";
import uid from "uid";
import axios from "axios";

class Employees extends Component {
  state = { employees: [] };
  constructor(props) {
    super(props);
    this.addEmployee = this.addEmployee.bind(this);
    this.fetchEmployee = this.fetchEmployee.bind(this);
    // this.test1 = this.test1.bind(this);
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  fetchEmployee = () => {
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "/restaurant/findEmployeesByRestaurant",
        {
          restaurant_id: this.props.res_id
        },
        header
      )
      .then(employees =>
        this.setState({ employees: employees.data }, () =>
          console.log("Customers fetched...", employees)
        )
      )
      .catch(err => {
        console.log(400);
      });
  };

  deleteEmployee = id => {
    console.log(id);
    const employees = this.state.employees;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i]._id === id) {
        employees.splice(i, 1);
        axios
          .post("/restaurant/delete_employee", {
            restaurant_id: this.props.res_id,
            user_id: id
          })
          .then(msg => {
            console.log(msg);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    this.setState({ employees: employees });
  };

  addEmployee = () => {
    const employee_username = document.getElementById("add-employee-input")
      .value;
    console.log(`employee to be added: ${employee_username}`);
    axios
      .post("/restaurant/add_employee", {
        restaurant_id: this.props.res_id,
        username: employee_username
      })
      .then(function(response) {
        console.log(response);
        console.log("added");
        // window.location.href = "/restaurateur2/" + this.props.match.params.id;
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <h2>Employees</h2>
        {/* <h2>{this.props.res_id}</h2> */}
        <div className="input-group mb-3">
          <input
            type="text"
            id="add-employee-input"
            className="form-control"
            placeholder="Employee Username"
            aria-label="Employee Username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              id="basic-addon2"
              onClick={this.addEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
        <div className="list-group employee-list">
          {this.state.employees.map(employee => {
            return (
              <EmployeeListItem
                key={uid()}
                image={employee.image}
                name={employee.username}
                id={employee._id}
                telephone={employee.tel}
                deleteEmployee={this.deleteEmployee}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default Employees;
