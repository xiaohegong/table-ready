import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class RestaurantListItem extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }
  state = { redirect: false, location: "/restaurateur2/" + this.props._id };

  redirect(event) {
    event.preventDefault();

    this.setState({ redirect: true });
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={this.state.location} />;
    }
    return (
      <div className="restaurant-list-item">
        <button
          onClick={this.redirect}
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
