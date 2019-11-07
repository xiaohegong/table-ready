import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import './employee.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import { slide as Menu } from 'react-burger-menu'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: '8 px',
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display:'flex',
  padding: grid,
  overflow:"auto"
});

class employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: reservations_manager.reservations,
      checkedG:false,
      current_date:null,
      menu_open:false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleChange = () => {
    this.setState({checkedG:!this.state.checkedG})
  };
  change_menu_state = () => {
    this.setState({menu_open:!this.state.menu_open})
  }
  info = (e) => {
    console.log("hi")
  }
  removefocus = (e) => {
    e.preventDefault()
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
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div id = "outer-container" className = "card-container">
        <Menu pageWrapId={ "page-wrap" } width = {'500px'} outerContainerId={ "outer-container" } right disableAutoFocus customBurgerIcon={false} isOpen={this.state.menu_open}
         onStateChange={(state) => this.handleStateChange(state)}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.state.items.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    {item.content}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}>
                      {this.state.selected.map((item, index) => (
                          <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}>
                              {(provided, snapshot) => (
                                  <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                      )}>
                                      {item.content}
                                  </div>
                              )}
                          </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                )}
            </Droppable>
          </DragDropContext>
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
                          <button class="accept-button" onClick = {this.change_menu_state} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/done-tick.png"></img></button>
                          <button class="reject-button" onClick = {this.change_menu_state} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
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