import React, { Component } from 'react';
import axios from 'axios';
import '../../Stylesheets/restaurateur_page.scss';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = { redirect: false };
  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.name.value) {
      alert('restaurant name required');
    } else if (!event.target.phoneNumber.value) {
      alert('restaurant phone number required');
    } else {
      const header = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      axios
        .post(
          'api/restaurants/newRestaurant',
          {
            owner: this.props.location.state.owner_id,
            name: event.target.name.value,
            phoneNumber: event.target.phoneNumber.value,
            cuisine: event.target.cuisine.value,
            location: event.target.location.value,
            hours: event.target.hours.value,
            tables: event.target.tables.value
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
  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`/restaurateur/${this.props.location.state.id}`} />;
    }
    return (
      <div className="new-restaurant-page">
        <div className="container">
          <div className="form-container mx-auto">
            <h2>Add A Restaurant</h2>
            <form onSubmit={this.handleSubmit} className="">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Restaurant Name*
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Restaurant Name"
                  id="name"
                  name="name"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Restaurant Telephone*
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telephone"
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Restaurant Location
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  id="location"
                  name="location"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Restaurant Cuisine
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Restaurant Cuisine"
                  id="cuisine"
                  name="cuisine"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Operation Hours
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Operation Hours"
                  id="hours"
                  name="hours"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Number of Tables
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="number of tables"
                  id="tables"
                  name="tables"
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-primary float-right"
              >
                Create Restaurant
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewRestaurant);
