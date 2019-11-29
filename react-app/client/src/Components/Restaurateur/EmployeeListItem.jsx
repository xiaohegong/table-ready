import React, { Component } from "react";
class EmployeeListItem extends Component {
  state = {};
  render() {
    const { deleteEmployee, id } = this.props;
    return (
      <button
        type="button"
        className="employee-list-item-component list-group-item list-group-item-action employee-list-item"
      >
        <div className="row">
          <div className="col col-md-4">
            <img className="" src={this.props.image} alt="" />
          </div>
          <div className="col col-md-6">
            <div className="employee-info">
              <p>
                <strong>Name: </strong>
                {this.props.name}
              </p>
              <p>
                <strong>Email: </strong> {this.props.email}
              </p>
              <p>
                <strong>Telephone: </strong>
                {this.props.telephone}
              </p>
            </div>
          </div>
          <div className="col col-md-2">
            <span
              className="btn btn-sm btn-outline-danger"
              onClick={deleteEmployee.bind(this, id)}
            >
              Delete
            </span>
          </div>
        </div>
      </button>
    );
  }
}

export default EmployeeListItem;
