import React, {Component} from 'react';

class MenuItem extends Component {
    state = {  };
    render() {
        return ( <div className="restaurant-menu-item">
            <img
                src={this.props.image}
                alt=""
            />
            <span>{this.props.name}</span>

        </div>);
    }
}

export default MenuItem;
