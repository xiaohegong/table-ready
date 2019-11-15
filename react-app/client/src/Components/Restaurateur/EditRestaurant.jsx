import React, { Component } from "react";
import axios from "axios";
import "../../Stylesheets/restaurateur_page.scss";
import { Redirect } from 'react-router-dom'

class EditRestaurant extends Component {
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
                "/restaurant/updateRestaurant",
                {
                    _id: this.props.info._id,
                    name: event.target.name.value,
                    phoneNumber: event.target.phoneNumber.value,
                    cuisine: event.target.cuisine.value,
                    location: event.target.location.value,
                    hours: event.target.hours.value
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
            return <Redirect to={`/restaurateur2/${this.props.link}`}/>;
        }
        return (
            <div className="new-restaurant-page">
                <div className="container">
                    <div className="form-container mx-auto">
                        <h2>Edit Restaurant Info</h2>
                        <form onSubmit={this.handleSubmit} className="">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Name*
                  </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    defaultValue={this.props.info.name}
                                    id="name"
                                    name="name"
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Telephone*
                  </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    defaultValue={this.props.info.phoneNumber}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Location
                  </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    defaultValue={this.props.info.location}
                                    id="location"
                                    name="location"
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Restaurant Cuisine
                  </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    defaultValue={this.props.info.Cuisine}
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
                                    defaultValue={this.props.info.operationHour}
                                    id="hours"
                                    name="hours"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-outline-primary float-right"
                            >
                                Update Restaurant Info
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditRestaurant;
