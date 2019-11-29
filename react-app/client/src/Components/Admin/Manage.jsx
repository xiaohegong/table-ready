import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import 'bootstrap/dist/css/bootstrap.css';

import Users from "./Users.jsx";
import Restaurants from "./Restaurants.jsx";
import AddAdmin from "./newAdmin";


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
        this.setActive(e);
    };

    manageRestaurant = (e) => {
        this.setState({page: 'rest'});
        this.setActive(e);
    };

    addSysAdmin = (e) => {
        this.setState({page: 'addAdmin'});
        this.setActive(e);
    };

    showManaging = () => {
        if (this.state.page === 'user') {
            return (
                <Users/>
            );
        } else if (this.state.page === 'rest') {
            return (
                <Restaurants/>
            );
        } else if (this.state.page === 'addAdmin') {
            return (
                <AddAdmin/>
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


    render() {
        return (
            <div className='manage'>
                <div className='manage-container'>
                    <div className='row manage-content'>
                        <div className='col-sm-8 left-content'>
                            <div id="showManaging" className="input-group ">
                                {this.showManaging()}
                            </div>
                        </div>

                        <div className='col-sm-4 menu'>
                            <ul className="list-group list-all">
                                <li className="list-group-item list-content active"
                                    onClick={this.manageUsers}>Users
                                </li>
                                <li className="list-group-item list-content"
                                    onClick={this.manageRestaurant}>Restaurants
                                </li>
                                <li className="list-group-item list-content"
                                    onClick={this.addSysAdmin}>Add New Super Admin
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