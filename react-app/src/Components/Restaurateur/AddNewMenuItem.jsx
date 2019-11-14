import React, { Component } from "react";
import axios from "axios";
import "../../Stylesheets/restaurateur_page.scss";
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom';

class AddNewMenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {redirect: false};
  handleSubmit(event) {
    event.preventDefault();

    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    axios
      .post(
        "/restaurant/newMenuItem",
        {
          restaurant: this.props.location.state.id,
          name: event.target.name.value,
          price: event.target.price.value,
          ingredients: event.target.ingredients.value,
          calories: event.target.calories.value
        },
        header
      )
      .then(
        response => {
          this.setState({ redirect: true });
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );


  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`/restaurateur2/${this.props.location.state.id}`}/>;
    }
    return (
      <div className="new-restaurant-page">
        <div className="container">
          <div className="form-container mx-auto">
            <h2>Add A Menu Item</h2>
            <form onSubmit={this.handleSubmit} className="">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Item Name*
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Item Name"
                  id="name"
                  name="name"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Price*
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="price"
                  id="price"
                  name="price"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Ingredients
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ingredients"
                  id="ingredients"
                  name="ingredients"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Calories
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="calories"
                  id="calories"
                  name="calories"
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-primary float-right"
              >
                Create Item
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddNewMenuItem);
