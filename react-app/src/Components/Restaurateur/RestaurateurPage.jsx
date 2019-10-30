import React, { Component } from "react";
import "../../Stylesheets/restaurateur_page.scss";

class RestaurateurPage extends Component {
  state = {};
  render() {
    return (
      <div className="restaurateur-page">
        <div className="container">
          <div className="row">
            <div className="col-md-3 info">
              <h2>Info</h2>
              <img
                src={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                alt=""
                className="avatar"
              />
            </div>

            <div className="col-md-9">
              <h2>Your Restaurants</h2>
              <div className="restaurants-display">
                <div className="list-group">
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant1.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant2.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant3.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant1.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant2.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant2.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="row">
                      <div className="restaurant-info col-md-8">
                        <h4>Restaurant Name</h4>
                        <p>address: </p>
                        <p>788 Creek Lane Simpsonville, SC 29680</p>
                      </div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/restaurant_images/restaurant2.jpeg"
                        }
                        alt=""
                        className="img-thumbnail rounded float-right col-md-4"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurateurPage;
