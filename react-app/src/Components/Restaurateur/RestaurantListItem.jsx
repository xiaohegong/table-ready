import React, { Component } from "react";

class RestaurantListItem extends Component {
  state = {};
  // constructor(prop) {
  //   super(prop);
  // }
  render() {
    return (
      <div className="restaurant-list-item">
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          <div className="row">
            <div className="restaurant-info col-md-8">
              <h4>{this.props.name}</h4>
              <p>Address: {this.props.address}</p>
              <p>Telephone: {this.props.telephone}</p>
            </div>
            <img
              src={this.props.image}
              alt=""
              className="img-thumbnail rounded float-right col-md-4"
            />
          </div>
        </button>
      </div>
    );
  }
}

export default RestaurantListItem;
