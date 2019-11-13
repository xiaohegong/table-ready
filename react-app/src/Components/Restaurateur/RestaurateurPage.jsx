import React, { Component } from "react";
import "../../Stylesheets/restaurateur_page.scss";
import RestaurantListItem from "./RestaurantListItem";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";

class RestaurateurPage extends Component {
  state = { restaurants: [] };

  componentDidMount() {
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "/restaurant/findRestaurantByOwner",
        {
          owner: this.props.match.params.id
        },
        header
      )

      .then(restaurants =>
        this.setState({ restaurants: restaurants.data }, () =>
          console.log("Customers fetched...", this.state.restaurants)
        )
      )
      .catch(err => {
        console.log(400);
      });
  }

  is_authenticated = () => {
    const cur_user = this.props.cookies.cookies.cur_user;
    if (cur_user.accountType !== "Employee") {
      return true;
    }
    return false;
  };

  render() {
    if (!this.is_authenticated()) {
      return <Redirect to="/error" />;
    }
    return (
      <div>
        <Navbar cookies={{ cookies, setCookie, removeCookie }}/>
        <div className="restaurateur-page">
          <div className="container">
            <div className="row">
              <div className="col-md-3 info">
                <h2 className="">
                  {this.props.cookies.cookies.cur_user.username}
                </h2>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    alt=""
                    className="avatar"
                  />
                </div>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Telephone: </strong>
                    {this.props.cookies.cookies.cur_user.tel}
                  </li>
                  <li className="list-group-item">
                    <strong>Email: </strong>
                    {this.props.cookies.cookies.cur_user.email}
                  </li>
                </ul>
              </div>

              <div className="col-md-9">
                <h2 style={{ display: "inline" }}>Your Restaurants</h2>
                <Link to="/addNewRestaurant">
                  <button className="addNewButton btn btn-outline-success btn-sm">
                    {" "}
                    Add New{" "}
                  </button>
                </Link>
                <div className="restaurants-display">
                  <div className="list-group">
                    {this.state.restaurants.map(restaurant => (
                      <Link
                        key={restaurant._id}
                        to={{
                          pathname: "/restaurateur2",
                          state: {
                            restaurant_id: restaurant._id
                          }
                        }}
                      >
                        <RestaurantListItem
                          name={restaurant.name}
                          address={restaurant.location}
                          telephone={restaurant.phoneNumber}
                          image={
                            process.env.PUBLIC_URL +
                            "/images/restaurant_images/restaurant1.jpeg"
                          }
                          _id={restaurant._id}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RestaurateurPage);
