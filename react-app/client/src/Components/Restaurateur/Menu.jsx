import React, { Component } from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import EmployeeListItem from "./EmployeeListItem";
import uid from "uid";
import axios from "axios";

class Menu extends Component {
  state = { menuItem: [] };
  constructor(props) {
    super(props);
    this.fetchMenu = this.fetchMenu.bind(this);
    // this.test1 = this.test1.bind(this);
  }
  componentDidMount() {
    this.fetchMenu();
  }

  fetchMenu = () => {
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "/restaurant/findMenuByRestaurant",
        {
          restaurant_id: this.props.res_id
        },
        header
      )
      .then(menuItem =>
        this.setState({ menuItem: menuItem.data }, () =>
          console.log("Customers fetched...", menuItem)
        )
      )
      .catch(err => {
        console.log(400);
      });
  };
  deleteItem = id => {
    console.log(id);
    const menuItem = this.state.menuItem;
    for (let i = 0; i < menuItem.length; i++) {
      if (menuItem[i]._id === id) {
        menuItem.splice(i, 1);
        axios
          .post("/restaurant/deleteMenuItem", {
            restaurant_id: this.props.res_id,
            menu_id: id
          })
          .then(msg => {
            console.log(msg);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    this.setState({ menuItem: menuItem });
  };

  render() {
    return (
      <>
        <h2 style={{ display: "inline" }}>Your Restaurants</h2>
        <Link to={{
          pathname: "/addNewMenuItem",
          state: {id: this.props.res_id}
        }}>
          <button className="addNewButton btn btn-outline-success btn-sm">
            {" "}
            Add New{" "}
          </button>
        </Link>

        <div className="list-group employee-list">
          {this.state.menuItem.map(menuItem => {
            return (
              <MenuItem
                key={uid()}
                image={menuItem.image}
                name={menuItem.name}
                price={menuItem.price}
                id = {menuItem._id}
                ingredients={menuItem.ingredients}
                deleteItem={this.deleteItem}
              />
            );
          })}
        </div>

      </>
    );
  }
}

export default Menu;
