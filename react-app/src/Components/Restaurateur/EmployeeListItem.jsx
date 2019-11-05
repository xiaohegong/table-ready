import React, { Component } from "react";
class EmployeeListItem extends Component {
  state = {};
  render() {
    return (
      <button
        type="button"
        className="list-group-item list-group-item-action employee-list-item"
      >
        <img className="float-left" src={this.props.image} alt="" />
        <div className="employee-info float-right">
          <p>
            <strong>Name: </strong>
            {this.props.name}
          </p>
          <p>
            <strong>ID: </strong> {this.props.id}
          </p>
          <p>
            <strong>Telephone: </strong>
            {this.props.telephone}
          </p>
        </div>
      </button>
    );
  }
}

export default EmployeeListItem;
