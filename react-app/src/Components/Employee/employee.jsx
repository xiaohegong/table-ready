import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import './employee.css'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import reservations_manager from './dummy_data_for_drag.jsx'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from 'react-bootstrap/Button'
import CheckIcon from '@material-ui/icons/Check';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { DatePicker } from '@y0c/react-datepicker';
import { scaleRotate	 as Menu } from 'react-burger-menu'
import all_table from './dummy_table_data'
import Draggable, {DraggableCore} from 'react-draggable';
// fake data generator

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#e6e6e6",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));


const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  });


class employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: reservations_manager.reservations,
      to_be_reserved:[],
      checkedG:false,
      current_date:null,
      menu_open:false,
      current_table:null,
      all_table:all_table.tables,
      user_obj: null
    };
  }


  getList = (id) => this.state[this.idtoList[id]];

  handleChange = () => {
    this.setState({checkedG:!this.state.checkedG})
  };
  handleDrag = (index) => {
    const tmp = this.state.to_be_reserved[index]
    this.setState({user_obj:tmp})
  }
  handleStop = () => {
    this.setState({dragged:false})
    
  }
  change_menu_state = (index) => {
    this.setState({menu_open:!this.state.menu_open})
    this.state.to_be_reserved.push(this.state.items[index])
    this.setState({to_be_reserved:this.state.to_be_reserved})
   }
  info = (e) => {
    // console.log("hi")
  }
  removefocus = (e) => {
    e.preventDefault()
  }
  ondragstart = (index) => {

  }
  /* change color of card */ 
  checkcapacity = (index) => {
    const cur_table = document.getElementById(`Table-${index}`)
    this.setState({current_table:cur_table})
    const cur_table_obj = this.state.all_table[index]
    console.log(this.state.user_obj)
    if (cur_table_obj.table_capacity >= this.state.user_obj.people){
      cur_table.style.backgroundColor = "green"
    }
    else{
      cur_table.style.backgroudColor = "red"
    }
  }
  resumecard = () => {
    // console.log("left")
  }
  showdate = (value) => {
    const year = value.$y
    const month = (value.$M) + 1
    const day = (value.$D)
    const date = `${year}-${month}-${day}`
    this.setState({current_date:date})
  }
  handleStateChange = (state) => {
    this.setState({menu_open:state.isOpen})
  }
 
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div id = "outer-container" className = "card-container">
        <Menu pageWrapId={ "page-wrap" } width = {'1000px'} outerContainerId={ "outer-container" } right disableAutoFocus customBurgerIcon={false} isOpen={this.state.menu_open}
         onStateChange={(state) => this.handleStateChange(state)}>
          <span id = "reservation_container" onMouseDown = {this.removefocus}>
            {
              this.state.to_be_reserved.map((item,index) => (
                <Draggable onStart = {() => this.ondragstart(index)} onDrag={() => this.handleDrag(index)}  onStop={this.handleStop}>
                  <Card id = {`usercard-${index}`} draggable = "true" style={{backgroundColor:"#f8f9fa", width: '18rem' }}>
                    <Card.Header className = "header-of-card">
                      <div className = "pic-container">
                        <strong>
                          {item.Name}
                        </strong>
                        <img className = "user-pic"src = "./images/restaurant_images/boy.png"></img>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div>
                        <span><img className = "info-png" src = "./images/restaurant_images/calendar.png"></img><span className = 
                        "reservation_time">{item.estimated_time}</span><span className = "reservation_date">/{item.date_of_arrival}</span></span>
                      </div>
                      <div className = "num_people">
                        <span><img className = "info-png" src = "./images/restaurant_images/avatar.png"></img><span className = "attendence">{item.people}</span></span>
                      </div>
                      <div className = "user_profile_holder">
                        <div className = "check-container">  
                            <button class="accept-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/done-tick.png"></img></button>
                            <button class="reject-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Draggable>
              ))
            }
          </span>
          <span id = "avaliable_seats_container" onMouseDown = {this.removefocus}>
            {
              this.state.all_table.map((item,index) => (
                <Card id = {`Table-${index}`} className = "tablecard" style={{backgroundColor:"#f8f9fa",  width: '18rem' }}  onMouseEnter = {(e) => this.checkcapacity(index)} onMouseLeave = {this.resumecard}>
                  <Card.Header className = "header-of-card">
                    <div className = "pic-container">
                      <strong>
                        {`Table-${index+1}`}
                      </strong>
                      <img className = "user-pic"src = "./images/restaurant_images/table.png"></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <span>Capacity: {item.table_capacity}</span>
                    </div>
                    <div className = "user_profile_holder">
                      <div className = "check-container">  
                          <button class="accept-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/done-tick.png"></img></button>
                          <button class="reject-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))
              }
            </span>
      </Menu>
      <div id = "page-wrap">
        <div id = "cal" style={{height: '80px'}}>
          <DatePicker onChange={(value)=>this.showdate(value)} showDefaultIcon clear></DatePicker>
          <button id = "date-confirm">Confirm</button>
        </div>
        <CardColumns id = "content-wrapper">
          {
            this.state.items.map((item,index) => (
              <Card className = "usercard" bg="light" style={{ width: '18rem' }}>
                <Card.Header className = "header-of-card">
                  <div className = "pic-container">
                    <strong>
                      {item.Name}
                    </strong>
                    <img className = "user-pic"src = "./images/restaurant_images/boy.png"></img>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div>
                    <span><img className = "info-png" src = "./images/restaurant_images/calendar.png"></img><span className = 
                    "reservation_time">{item.estimated_time}</span><span className = "reservation_date">/{item.date_of_arrival}</span></span>
                  </div>
                  <div className = "num_people">
                    <span><img className = "info-png" src = "./images/restaurant_images/avatar.png"></img><span className = "attendence">{item.people}</span></span>
                  </div>
                  <div className = "user_profile_holder">
                    <div className = "check-container">  
                        <button class="accept-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/done-tick.png"></img></button>
                        <button class="reject-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          }
          </CardColumns>
        </div>
      </div>
    );
  }
}

export default employee