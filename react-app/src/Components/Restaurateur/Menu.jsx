import React, {Component} from 'react';
import MenuItem from "./MenuItem";
import RestaurantListItem from "./RestaurantListItem";

class Menu extends Component {
    state = {  };
    addRow(){
        return <tr><th>
            <MenuItem name="Burger"
                     image={
                         process.env.PUBLIC_URL +
                         "/images/menu/burger.jpg"
                     }/>
        </th><th>
            <MenuItem name="Burger"
                      image={
                          process.env.PUBLIC_URL +
                          "/images/menu/burger.jpg"
                      }/>
        </th><th>
            <MenuItem name="Burger"
                      image={
                          process.env.PUBLIC_URL +
                          "/images/menu/burger.jpg"
                      }/>
        </th></tr>
    }
    render() {
        return ( <><h2 style={{display:'inline'}}>Your Restaurants</h2>
            <button className={"addNewButton"}>Edit</button>
            <button className={"addNewButton"}>Add New Item</button>
        <table className={'menuTable'}>{this.addRow()}{this.addRow()}{this.addRow()}</table></>);
    }
}

export default Menu;
