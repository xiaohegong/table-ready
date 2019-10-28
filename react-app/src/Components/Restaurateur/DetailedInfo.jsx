import React, {Component} from 'react';

class DetailedInfo extends Component {
    state = {};

    getListStyle = () => {
        return {
            listStyleType:'none',
            textAlign:"right",
            width:'100%',
            padding: '10px',

        }
    };

    render() {
        return ( <><h2>Restaurant Info </h2>
            <table style={this.getListStyle()}>
                <tr><td>Name :</td><td> {this.props.info.name}</td></tr>
                <tr><td>Cuisines:</td><td> {this.props.info.Cuisines}</td></tr>
                <tr><td>Rating :</td><td> {this.props.info.Rating}</td></tr>
                <tr><td>Dress Code :</td><td> {this.props.info.name}</td></tr>
                <tr><td>Payment Options:</td><td> {this.props.info.Payment_Options}</td></tr>

            </table></>);
    }
}

export default DetailedInfo;
