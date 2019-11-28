import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RestaurantImageModal from "./RestaurantImageModal";
import MenuImageModal from "./MenuImageModal";

class MenuItem extends Component {
    state = {  };
    render() {
        const { deleteItem, id } = this.props;
        return (
          <div
            className="list-group-item list-group-item-action restaurant-menu-item"
          >
              <div className="row">
                  <div className="col col-md-4">
                    <MenuImageModal id = {this.props.id} image={this.props.image} />
                  </div>
                  <div className="col col-md-6">
                      <div className="employee-info">
                          <p>
                              <strong>Name: </strong>
                              {this.props.name}
                          </p>
                          <p>
                              <strong>Price: </strong> {this.props.price}
                          </p>
                          <p>
                              <strong>Ingredients: </strong>
                              {this.props.ingredients}
                          </p>
                        <p>
                          <strong>Calories: </strong>
                          {this.props.calories}
                        </p>
                      </div>
                  </div>
                  <div className="col col-md-2">

                    <Link
                      to={{
                        pathname: "/editMenuItem",
                        state: { id: this.props.id,
                          res_id: this.props.res_id,
                          name: this.props.name,
                          price: this.props.price,
                          ingredients: this.props.ingredients,
                          calories : this.props.calories
                      }
                      }}
                    >
                      <div
                        style={{marginBottom: "5px"}}
                        className="btn btn-sm btn-outline-success"
                      >
                        Edit
                      </div>
                    </Link>
                    <div
                      className="btn btn-sm btn-outline-danger"
                      onClick={deleteItem.bind(this, id)}
                    >
                      Delete
                    </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default MenuItem;
