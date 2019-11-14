import React, {Component} from 'react';
import axios from "axios";
import "../../Stylesheets/restaurateur_page_2.scss";

class DressCode extends Component {
    state = { info :[],
            codeBlock:''};
    componentDidMount() {
        const header = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        axios
            .post(
                "/restaurant/findRestaurant",
                {
                    _id: this.props.id
                },
                header
            )

            .then(restaurant =>
                this.setState({ info: restaurant.data[0],codeBlock:<p>{restaurant.data[0].DressCode}</p> }, () =>
                    console.log("Customers fetched...", this.state.info)
                )
            )
            .catch(err => {
                console.log(400);
            });
    }
    editCode = () => {
        this.setState({codeBlock:<><textarea id = "codeBlock" row ='5'>{this.state.info.dressCode}</textarea>
                <button className="addNewButton btn btn-outline-success btn-sm" onClick={this.submit}>Done</button></>})
    };

    submit = () => {
        const header = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        axios
            .post(
                "/restaurant/updateDressCode",
                {
                    _id: this.props.id,
                    dressCode:document.getElementById("codeBlock").value
                },
                header
            )

            .then(restaurant =>{
                const block = document.getElementById("codeBlock").value;
                this.setState({codeBlock:<><p>{block}</p></>})

            })

            .catch(err => {
                console.log(400);
            });
    };

    render() {
        return ( <><h1>Dress Code</h1>
            <button className="addNewButton btn btn-outline-success btn-sm" onClick={this.editCode}>
                {" "}
                Edit{" "}
            </button>
        <div><h3>For Employees</h3>
            {this.state.codeBlock}</div></> );
    }
}

export default DressCode;
