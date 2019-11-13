import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import './employee.css'
import Card from 'react-bootstrap/Card'
import Navbar from "../Navbar.jsx";
import CardColumns from 'react-bootstrap/CardColumns'
import Checkbox from '@material-ui/core/Checkbox';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { DatePicker } from '@y0c/react-datepicker';
import { slide	 as Menu } from 'react-burger-menu'
import all_table from './dummy_table_data'
import Draggable, {DraggableCore} from 'react-draggable';
import VerticalModal from './verticalModal';
import axios from 'axios';
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
// fake data generator

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

var edgeSize = 100;
var timer = null;
function handleMousemove( event ) {
  // NOTE: Much of the information here, with regard to document dimensions,
  // viewport dimensions, and window scrolling is derived from JavaScript.info.
  // I am consuming it here primarily as NOTE TO SELF.
  // --
  // Read More: https://javascript.info/size-and-scroll-window
  // --
  // CAUTION: The viewport and document dimensions can all be CACHED and then
  // recalculated on window-resize events (for the most part). I am keeping it
  // all here in the mousemove event handler to remove as many of the moving
  // parts as possible and keep the demo as simple as possible.
  // Get the viewport-relative coordinates of the mousemove event.
  var viewportX = event.clientX;
  var viewportY = event.clientY;
  // Get the viewport dimensions.
  var viewportWidth = document.documentElement.clientWidth;
  var viewportHeight = document.documentElement.clientHeight;
  // Next, we need to determine if the mouse is within the "edge" of the 
  // viewport, which may require scrolling the window. To do this, we need to
  // calculate the boundaries of the edge in the viewport (these coordinates
  // are relative to the viewport grid system).
  var edgeTop = edgeSize;
  var edgeLeft = edgeSize;
  var edgeBottom = ( viewportHeight - edgeSize );
  var edgeRight = ( viewportWidth - edgeSize );
  var isInLeftEdge = ( viewportX < edgeLeft );
  var isInRightEdge = ( viewportX > edgeRight );
  var isInTopEdge = ( viewportY < edgeTop );
  var isInBottomEdge = ( viewportY > edgeBottom );
  // If the mouse is not in the viewport edge, there's no need to calculate
  // anything else.
  if ( ! ( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge ) ) {
    clearTimeout( timer );
    return;
  }
  // If we made it this far, the user's mouse is located within the edge of the
  // viewport. As such, we need to check to see if scrolling needs to be done.
  // Get the document dimensions.
  // --
  // NOTE: The various property reads here are for cross-browser compatibility
  // as outlined in the JavaScript.info site (link provided above).
  var documentWidth = Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.body.clientWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
  var documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
  // Calculate the maximum scroll offset in each direction. Since you can only
  // scroll the overflow portion of the document, the maximum represents the
  // length of the document that is NOT in the viewport.
  var maxScrollX = ( documentWidth - viewportWidth );
  var maxScrollY = ( documentHeight - viewportHeight );
  // As we examine the mousemove event, we want to adjust the window scroll in
  // immediate response to the event; but, we also want to continue adjusting
  // the window scroll if the user rests their mouse in the edge boundary. To
  // do this, we'll invoke the adjustment logic immediately. Then, we'll setup
  // a timer that continues to invoke the adjustment logic while the window can
  // still be scrolled in a particular direction.
  // --
  // NOTE: There are probably better ways to handle the ongoing animation
  // check. But, the point of this demo is really about the math logic, not so
  // much about the interval logic.
  (function checkForWindowScroll() {
    clearTimeout( timer );
    if ( adjustWindowScroll() ) {
      timer = setTimeout( checkForWindowScroll, 30 );
    }
  })();
  // Adjust the window scroll based on the user's mouse position. Returns True
  // or False depending on whether or not the window scroll was changed.
  function adjustWindowScroll(insta) {
    // Get the current scroll position of the document.
    var currentScrollX = window.pageXOffset;
    var currentScrollY = window.pageYOffset;
    // Determine if the window can be scrolled in any particular direction.
    var canScrollUp = ( currentScrollY > 0 );
    var canScrollDown = ( currentScrollY < maxScrollY );
    var canScrollLeft = ( currentScrollX > 0 );
    var canScrollRight = ( currentScrollX < maxScrollX );
    // Since we can potentially scroll in two directions at the same time,
    // let's keep track of the next scroll, starting with the current scroll.
    // Each of these values can then be adjusted independently in the logic
    // below.
    var nextScrollX = currentScrollX;
    var nextScrollY = currentScrollY;
    // As we examine the mouse position within the edge, we want to make the
    // incremental scroll changes more "intense" the closer that the user
    // gets the viewport edge. As such, we'll calculate the percentage that
    // the user has made it "through the edge" when calculating the delta.
    // Then, that use that percentage to back-off from the "max" step value.
    var maxStep = 50;
    // Should we scroll left?
    if ( isInLeftEdge && canScrollLeft ) {
      var intensity = ( ( edgeLeft - viewportX ) / edgeSize );
      nextScrollX = ( nextScrollX - ( maxStep * intensity ) );
    // Should we scroll right?
    } else if ( isInRightEdge && canScrollRight ) {
      var intensity = ( ( viewportX - edgeRight ) / edgeSize );
      nextScrollX = ( nextScrollX + ( maxStep * intensity ) );
    }
    // Should we scroll up?
    if ( isInTopEdge && canScrollUp ) {
      var intensity = ( ( edgeTop - viewportY ) / edgeSize );
      nextScrollY = ( nextScrollY - ( maxStep * intensity ) );
    // Should we scroll down?
    } else if ( isInBottomEdge && canScrollDown ) {
      var intensity = ( ( viewportY - edgeBottom ) / edgeSize );
      nextScrollY = ( nextScrollY + ( maxStep * intensity ) );
    }
    // Sanitize invalid maximums. An invalid scroll offset won't break the
    // subsequent .scrollTo() call; however, it will make it harder to
    // determine if the .scrollTo() method should have been called in the
    // first place.
    nextScrollX = Math.max( 0, Math.min( maxScrollX, nextScrollX ) );
    nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );
    if (
      ( nextScrollX !== currentScrollX ) ||
      ( nextScrollY !== currentScrollY )
      ) {
      insta.scrollTo( nextScrollX, nextScrollY );
      return( true );
    } else {
      return( false );
    }
  }
}

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

const initial_color = (() => {
  let tmp = []
  for (let i = 0; i < all_table.tables.length;i++){
    tmp.push("#f8f9fa")
  }
  return tmp
})()

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_seats: [],
      items: [],
      to_be_reserved:[],
      checkedG:false,
      current_date:null,
      draggin:false,
      menu_open:false,
      current_table:null,
      all_table:all_table.tables,
      reservations_color:initial_color,
      user_obj: 0,
      changed: false,
      modal_show: false
    };
  }
  fetch_data = () => {
    const header = {
      headers: {'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }; 
    axios.post('/waitlist/getWaitlist')
      .then(res => this.setState({all_seats: res.data}))
      .catch(function (error) {
        console.log(error);
      });
  }
  delete_data = (data) => {
    const header = {
      headers: {'Accept': 'application/text',
          'Content-Type': 'application/text'
      }
    }; 
    axios.delete('/api/removeWaitlist/' + data._id)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  update_data = (data) => {
    const header = {
      headers: {'Accept': 'application/text',
          'Content-Type': 'application/text'
      }
    }; 
    console.log(data._id)
    axios.put('/updateWaitlist/' + data._id, {
      id: data.id,
      name: data.name,
      people: data.people,
      date_of_arrival: data.date_of_arrival,
      estimated_time: data.estimated_time,
      reserved: data.reserved
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }


  handleChange = () => {
    this.setState({checkedG:!this.state.checkedG})
  };
  handleStart = (index) => {
    let tmp = this.state.to_be_reserved[index]
    this.setState({user_obj:tmp})
    this.setState({draggin:true})
  }
  handleStop = (index) => {
    this.setOccupied()
    const i = this.state.items.indexOf(this.state.to_be_reserved[index])
    
    if(this.state.changed){
      this.state.items[i].reserved = true
      this.update_data(this.state.items[i])
      let tmp = []
      this.state.to_be_reserved.forEach((item) => {
        if(item == this.state.user_obj){
          tmp.push(null)
        }
        else{
          tmp.push(item)
        }
      })
      this.setState({
        to_be_reserved: tmp,
        changed: false,
        draggin: false
      })
    }
  }
  setOccupied = () => {
    for(let i = 0; i < this.state.reservations_color.length; i++){
      if(this.state.reservations_color[i] == "green"){
        this.state.all_table[i].table_occupied = true
      }
    }
  }
  change_menu_state = (index) => {
    this.setState({menu_open:!this.state.menu_open})
    let in_list = false;
    this.state.to_be_reserved.forEach(element => {
      if(element == this.state.items[index]){
        in_list = true;
      }
    });
    if(in_list == false){
      this.state.to_be_reserved.push(this.state.items[index])
      this.setState({to_be_reserved:this.state.to_be_reserved})
    }

  }
  remove_reservation_from_items = (index) => {
    this.delete_data(this.state.items[index])
    this.setState({
      //TODO: Backend handle
      items: this.state.items.filter(i=>i.id != this.state.items[index].id)
    })
  }
  info = (e) => {
    // console.log("hi")
  }
  removefocus = (e) => {
    e.preventDefault()
  }
  /* change color of card */ 
  checkcapacity = (index) => {
    // const cur_table = document.getElementById(`Table-${index}`)
    // this.setState({current_table:cur_table})
    const cur_table_obj = this.state.all_table[index]
    if (this.state.draggin){
      if (cur_table_obj.table_capacity >= this.state.user_obj.people && cur_table_obj.table_occupied == false){
        this.state.reservations_color[index] = "green"
        this.setState({reservations_color:this.state.reservations_color, changed: true})
      }
      else if(cur_table_obj.table_occupied == false){
        this.state.reservations_color[index] = "red"
        this.setState({reservations_color:this.state.reservations_color, changed: false})
      }
    }
  }
  resumecard = (index) => {
    if(this.state.all_table[index].table_occupied == false){
      this.state.reservations_color[index] = "#f8f9fa"
      this.setState({reservations_color:this.state.reservations_color, changed: false})
    }

  }
  showdate = (value) => {
    const year = value.$y
    const month = (value.$M) + 1
    const day = (value.$D)
    const date = `${year}/${month}/${day}`
    this.setState({current_date:date})
  }
  handleStateChange = (state) => {
    this.setState({menu_open:state.isOpen})
  }
  handleMouseOver = (index) => {
    if(this.state.draggin){
      this.checkcapacity(index)
    }
  }
  empty_seats = (index) => {
    if(this.state.all_table[index].table_occupied == true){
      this.state.all_table[index].table_occupied = false
      this.resumecard(index)
    }
  }
  remove_from_reserved = (index) =>{
    this.setState({
      //TODO: Backend handle
      to_be_reserved: this.state.to_be_reserved.filter(i=>i.id != this.state.to_be_reserved[index].id)
    })
  }
  filter_date = () => {
    this.fetch_data()
    console.log(this.state.all_seats)
    this.setState({
      items: this.state.all_seats.filter((value) => value.date_of_arrival == this.state.current_date)
    })
  }
  setModalState = (state) => {
    this.setState({
      modal_show: state
    })
  }
  add_reservation = (name, ppl_num, date, time) =>{
    const new_wl = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      people: ppl_num,
      date_of_arrival: date,
      estimated_time: time
    }
    this.filter_date()
    this.setModalState(false)
    const header = {
      headers: {'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    };  

    axios.post('/waitlist/newWaitlist', {
      id: new_wl.id,
      name: new_wl.name,
      people: new_wl.people,
      date_of_arrival: new_wl.date_of_arrival,
      estimated_time: new_wl.estimated_time
    },header)
      .then((response) => {
          console.log(response);
      }, (error) => {
          console.log(error);
      });
    this.fetch_data()
  }
  render_button = (index) =>{
    if(this.state.items[index].reserved){
      return null
    }
    else{
      return <button class="accept-button" onClick = {(e) => this.change_menu_state(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/done-tick.png"></img></button>
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let draggables = []
    this.state.to_be_reserved.forEach((item,index) => {
      if(item!=null){
        draggables.push(
          <Draggable  onStart={() => this.handleStart(index)}  onStop={() => this.handleStop(index)}>
                      <Card id = {`usercard-${index}`} draggable = "true" style={{backgroundColor:"#f8f9fa", width: '18rem' }}>
                        <Card.Header className = "header-of-card">
                          <div className = "pic-container">
                            <strong>
                              {item.name}
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
                              <button class="reject-button" onClick = {(e) => this.remove_from_reserved(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Draggable>
        )
      }
      else{
        draggables.push(null)
      }
    })
    return (
      <div id = "outer-container" className = "card-container">
        <Menu pageWrapId={ "page-wrap" } width = {'1000px'} outerContainerId={ "outer-container" } right disableAutoFocus customBurgerIcon={false} isOpen={this.state.menu_open}
         onStateChange={(state) => this.handleStateChange(state)} handleMousemove = {() => handleMousemove(this)}>
          <span id = "reservation_container" onMouseDown = {this.removefocus}>
            {
              draggables.map((item,index) => (
                //Fix bug
                item
              ))
            }
          </span>
          <span id = "avaliable_seats_container" onMouseDown = {this.removefocus}>
            {
              this.state.all_table.map((item,index) => (
                <Card id = {`Table-${index}`} className = "tablecard" style={{backgroundColor:this.state.reservations_color[index],  width: '18rem' }}  onMouseOver = {(e) => this.handleMouseOver(index)} onMouseLeave = {() => this.resumecard(index)}>
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
                          <button class="reject-button" onClick = {(e) => this.empty_seats(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))
              }
            </span>
      </Menu>
      <div id = "page-wrap">
      <Navbar />
        <div id = "cal" style={{height: '80px'}}>
          <DatePicker onChange={(value)=>this.showdate(value)} showDefaultIcon></DatePicker>
          <button id = "date-confirm" onClick={()=>this.filter_date()}>Confirm</button>
          <button id = "date-confirm" onClick={()=>this.setModalState(true)}>Add Reservation</button>
        </div>
        <CardColumns id = "content-wrapper">
          {
            this.state.items.map((item,index) => (
              <Card className = "usercard" bg="light" style={{ width: '18rem' }}>
                <Card.Header className = "header-of-card">
                  <div className = "pic-container">
                    <strong>
                      {item.name}
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
                  <div>
                  <span><img className = "info-png" src = "./images/restaurant_images/receptionist.png"></img><span className = "attendence">{item.reserved ? 'Reserved' : 'Not Reserved'}</span></span>
                  </div>
                  <div className = "user_profile_holder">
                    <div className = "check-container">  
                        {this.render_button(index)}
                        <button class="reject-button" onClick = {(e) => this.remove_reservation_from_items(index)} onMouseDown = {this.removefocus}><img src = "./images/restaurant_images/no-stopping.png"></img></button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          }
          </CardColumns>
          <VerticalModal 
            show={this.state.modal_show}
            onHide={()=>this.setModalState(false)}
            add_reservation = {this.add_reservation}
          ></VerticalModal>
        </div>
      </div>
    );
  }
}

export default Employee
