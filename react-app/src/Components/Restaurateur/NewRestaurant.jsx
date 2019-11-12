import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

class NewRestaurant extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {  };
    handleSubmit(event) {
        event.preventDefault();

        const header = {
            headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.post('/restaurant/newRestaurant', {
            owner: "Heddy",
            name: event.target.name.value,
            phoneNumber: event.target.phoneNumber.value,
            cuisine: event.target.cuisine.value,
            location:event.target.location.value
        },header)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });

        // fetch('http://localhost:3000/restaurant/newRestaurant', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         owner: "Heddy",
        //         name: event.target.name.value,
        //         phoneNumber: event.target.phoneNumber.value,
        //         cuisine: event.target.cuisine.value,
        //         location:event.target.location.value
        //     })
        // }).then(restaurant => {
        //     console.log("restaurant " + restaurant.name + " saved to database");
        // })
        //     .catch(err => {
        //         console.log(400);
        //     });

    }
    render() {
        if (this.is_authenticated()){
            return <><form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter restaurant name*</label>
            <input id="name" name="name" type="text" />

            <label htmlFor="phoneNumber">Enter restaurant phoneNumber*</label>
            <input id="phoneNumber" name="phoneNumber" type="text" />

            <label htmlFor="location">Enter restaurant location</label>
            <input id="location" name="location" type="text" />

            <label htmlFor="cuisine">Enter restaurant cuisine</label>
            <input id="cuisine" name="cuisine" type="text" />



            <button>Create Restaurant</button>
        </form></>
        }
        else{
            return(<Redirect to = "/error"></Redirect>)
        }
    
    }
}

export default NewRestaurant;
