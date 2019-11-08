import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import 'bootstrap/dist/css/bootstrap.css';

import Users from "./Users.jsx";
import Restaurants from "./Restaurants.jsx";

const log = console.log;


class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'user',
            query: ''
        };
    }

    manageUsers = (e) => {
        this.setState({page: 'user'});
        const searchInput = document.getElementById("searchInput");
        searchInput.value = "";
        this.setActive(e);
    };

    manageRestaurant = (e) => {
        this.setState({page: 'rest'});
        const searchInput = document.getElementById("searchInput");
        searchInput.value = "";
        this.setActive(e);
    };

    showManaging = () => {
        if (this.state.page === 'user') {
            return (
                <Users query={this.state.query}/>
            );
        } else if (this.state.page === 'rest') {
            return (
                <Restaurants query={this.state.query}/>
            );
        }
    };

    setActive = (e) => {
        for (let i = 0; i < e.target.parentNode.childNodes.length; i++) {
            let btn = e.target.parentNode.childNodes[i];
            btn.classList.remove("active");
        }
        e.target.classList.add("active");
    };

    search = () => {
        let val = document.getElementById("searchInput").value;
        val = val.trim().toLowerCase();
        this.setState(() => ({query: val}));
    };

    render() {
        return (

            <div className='manage'>
                <div className='manage-container'>
                    <div className='row manage-content'>
                        <div className='col-sm-8 left-content'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" id="searchInput"
                                       placeholder="Search username..."
                                       aria-label="username" aria-describedby="button-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button"
                                            id="button-addon2" onClick={this.search}>Search
                                    </button>
                                </div>
                            </div>
                            <div id="showManaging" className="input-group ">
                                {this.showManaging()}
                            </div>
                        </div>

                        <div className='col-sm-4'>
                            <ul className="list-group list-all">
                                <li className="list-group-item list-content active"
                                    onClick={this.manageUsers}>Users</li>
                                <li className="list-group-item list-content"
                                    onClick={this.manageRestaurant}>Restaurants
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Manage;