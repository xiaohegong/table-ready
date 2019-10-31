import React, { Component } from "react";
import "../../Stylesheets/restaurateur_page.scss";
import RestaurantListItem from "./RestaurantListItem";

class RestaurateurPage extends Component {
  state = {};
  render() {
    return (
      <div className="restaurateur-page">
        <div className="container">
          <div className="row">
            <div className="col-md-3 info">
              <h2 className="">Your Name</h2>
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                  alt=""
                  className="avatar"
                />
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Email: </strong>name@email.com
                </li>
                <li className="list-group-item">
                  <strong>Telephone: </strong>123-456-7890
                </li>
                <li className="list-group-item">
                  <strong>Address: </strong>788 Creek Lane Simpsonville, SC
                  29680
                </li>
              </ul>
            </div>

            <div className="col-md-9">
              <h2>Your Restaurants</h2>
              <div className="restaurants-display">
                <div className="list-group">
                  <RestaurantListItem
                    name="Restaurant Name"
                    address="788 Creek Lane Simpsonville, SC 29680"
                    telephone="123-456-7890"
                    image={
                      process.env.PUBLIC_URL +
                      "/images/restaurant_images/restaurant1.jpeg"
                    }
                  />
                  <RestaurantListItem
                    name="Restaurant Name"
                    address="788 Creek Lane Simpsonville, SC 29680"
                    telephone="123-456-7890"
                    image={
                      process.env.PUBLIC_URL +
                      "/images/restaurant_images/restaurant2.jpeg"
                    }
                  />
                  <RestaurantListItem
                    name="Restaurant Name"
                    address="788 Creek Lane Simpsonville, SC 29680"
                    telephone="123-456-7890"
                    image={
                      process.env.PUBLIC_URL +
                      "/images/restaurant_images/restaurant3.jpeg"
                    }
                  />
                  <RestaurantListItem
                    name="Restaurant Name"
                    address="788 Creek Lane Simpsonville, SC 29680"
                    telephone="123-456-7890"
                    image={
                      process.env.PUBLIC_URL +
                      "/images/restaurant_images/restaurant1.jpeg"
                    }
                  />
                  <RestaurantListItem
                    name="Restaurant Name"
                    address="788 Creek Lane Simpsonville, SC 29680"
                    telephone="123-456-7890"
                    image={
                      process.env.PUBLIC_URL +
                      "/images/restaurant_images/restaurant2.jpeg"
                    }
                  />
                  <RestaurantListItem
                    name="Restaurant Name"
                    address="788 Creek Lane Simpsonville, SC 29680"
                    telephone="123-456-7890"
                    image={
                      process.env.PUBLIC_URL +
                      "/images/restaurant_images/restaurant3.jpeg"
                    }
                  />
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
