import React, {Component} from 'react';
import DetailedInfo from "./DetailedInfo";
import Menu from "./Menu";
import Pay from "./Pay";


class GeneralInfo extends Component {
    state = {  };

    getInfoStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '5px',
            margin: '5px',
            minWidth: '25%',
            borderBottom: '1px #ccc dotted',
            float:'left'
        }
    };

    getMenuStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '5px',
            margin: '5px',
            minWidth: '50%',
            float:'left'
        }
    };
    getPayStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '5px',
            margin: '5px',
            minWidth: '20%',
            float:'left'
        }
    };

    info = {
        "name":"first",
        'Cuisines':'Canadian',
        'Rating':'4',
        'Dress_Code': "Suit?",
        'Payment_Options': "washing dishes"
    }
    render() {
        return ( <><div style={this.getInfoStyle()}>
            <DetailedInfo info = {this.info}/>
        </div>
        <div style = {this.getMenuStyle()}>
            <Menu />
        </div>
            <div style = {this.getPayStyle()}>
                <Pay />
            </div></>);
    }
}

export default GeneralInfo;
