import React from 'react';
import './userpage.css'
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {slide as Menu} from 'react-burger-menu'
import Nav from 'react-bootstrap/Nav'
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import VerticalModal from './verticalmodal'
import { Link } from 'react-router-dom';
import userlist from './userlist'

class Userpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list_request: [{
                status: "pending",
                id: 10001,
                user_name: "Tony",
                house_type: "Apartment",
                url: "/houseinfo",
                price: 1000
            }, 
            {
                status: "pending",
                id: 10002,
                user_name: "David",
                house_type: "Apartment",
                url: "/houseinfo",
                price: 2000
            }],
            request_type: "List",
            house_lists: [{
                id: 10001,
                house_type: "Apartment",
                owner: "Tony",
                currently_occupied: false,
                url: "/houseinfo",
                status: "approved"
            }],
            roommate_list: [{
                id: 10001,
                name: "Jinda Huang",
                url: "/roommateinfo",
                rating: 4.8
            }],
            menuOpen: false,
            statOpen:false
        }
    }
    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }
    statopen = () => {
        this.setState(state => ({statOpen:!state.statOpen}))
    }
    expand = () => {
        this.setState(state => ({ menuOpen: !state.menuOpen }))
    }
    render(){
        let request_cards;
        if(this.state.request_type == "List"){
            console.log(this.state.list_request)
            request_cards = this.state.list_request.map((request, index) => (
                <Col md="3" key={index} className="request_col">
                    
                        <Card className="request_card">
                            <p>ID: {request.id}</p><br></br>
                            <Card.Body>
                                <Card.Text>Request User: {request.user_name}</Card.Text>
                                <Card.Text>Price: ${request.price}</Card.Text>
                                <Card.Text><Link to={request.url}>Link</Link></Card.Text>
                                <Button variant="danger" onClick={()=>{
                                    this.state.list_request[index].status = "reject"
                                    this.setState({
                                        list_request: this.state.list_request.filter(i => i.status == "pending")     
                                    })
                                    console.log(this.state.list_request)
                                }}>Reject</Button>
                                <Button className="float-right" variant="success" onClick={()=>{
                                    this.state.list_request[index].status = "approve"
                                    this.setState({
                                        list_request: this.state.list_request.filter(i => i.status == "pending")     
                                    })
                                }}>Approve</Button>
                            </Card.Body>
                        </Card>
                    

                </Col>
            
            ))
        }        
        else if(this.state.request_type == "House_lists"){
            request_cards = this.state.house_lists.map((house, index) => (
                <Col md="3" key={index} className="request_col">
                    
                        <Card className="request_card">
                            <p>ID: {house.id}</p><br></br>
                            <Card.Body>
                                <Card.Text>Owner: {house.owner}</Card.Text>
                                <Card.Text>Occupied Status: {house.currently_occupied ? "Occupied" : "Empty"}</Card.Text>
                                <Card.Text><Link to={house.url}>Link</Link></Card.Text>
                                <Button variant="danger" onClick={()=>{
                                    this.state.house_lists[index].status = "Cancelled"
                                    this.setState({
                                        house_lists: this.state.house_lists.filter(i => i.status == "pending")     
                                    })
                                    console.log(this.state.house_lists)
                                }}>Cancel this listing</Button>
                            </Card.Body>
                        </Card>

                </Col>
            ))
        }
        else if(this.state.request_type == "Roomates"){
            request_cards = this.state.roommate_list.map((roommate, index) => (

            
                <Col md="3" key={index} className="request_col">        
                    <Card className="request_card">
                        <p>ID: {roommate.id}</p><br></br>
                        <Card.Body>
                            <Card.Text>Name: {roommate.name}</Card.Text>
                            <Card.Text>Rating: {roommate.rating}</Card.Text>
                            <Card.Text><Link to={roommate.url}>Link</Link></Card.Text>
                            <Button variant="danger" onClick={()=>{
                                    this.state.roommate_list[index].status = "reject"
                                    this.setState({
                                        roommate_list: this.state.roommate_list.filter(i => i.status == "pending")     
                                    })
                                    console.log(this.state.roommate_list)
                                }}>Reject</Button>
                            <Button className="float-right" variant="success" onClick={()=>{
                                    this.state.roommate_list[index].status = "approve"
                                    this.setState({
                                        roommate_list: this.state.roommate_list.filter(i => i.status == "pending")     
                                    })
                                }}>Approve</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))
        }
        return(
            <div>
                <div id="pagewrap">
                    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0">
                        <a className="navbar-brand" href="#" onClick={this.statopen}>
                            <img src="expand (1).png"></img>
                        </a>
                            </form>
                            <ul id = "actual-nav"  className="navbar-nav">
                                <Link to={'./mainpage'}>
                                    <div className="navbar-brand active-class" href="#">
                                        <img src="sublease.png" width="40" height="40" alt=""></img>
                                        {' Tenant '}
                                    </div>
                                </Link>
                                <Link to={'./landlord'}>
                                    <div className="navbar-brand" href="#">
                                        <img src="landlord.png" width="40" height="40" alt=""></img>
                                        {' Landlord '}
                                    </div>
                                </Link>
                                <Link to={'./roommate'}>
                                    <div className="navbar-brand" href="#">
                                        <img src="friendship.png" width="40" height="40" alt=""></img>
                                        {' Roommate '}
                                    </div>
                                </Link>
                                <Link to={'./'}>
                                    <div className="navbar-brand" href="#">
                                        <img src="logout.png" width="40" height="40" alt=""></img>
                                        {' Sign Out '}
                                    </div>
                                </Link>
                                <a id="current-user" className="navbar-brand" href="">
                                    <span id="user-name">{userlist.current_user_name}</span>
                                </a>
                                <a className="navbar-brand" href="#">
                                    <img id="nav-pic" src="dummyuser.jpg" width="40" height="40" alt=""></img>
                                </a>
                                <a className="navbar-brand" href="#" onClick={this.expand}>
                                    <img src="expand.png"></img>
                                </a>
                            </ul>
                        </div>
                    </nav>
                <span className="content">
                    <div className="header">
                        <h2 id="header_text">Dash Board</h2>
                    </div>
                    <h4 className="sub_header">{this.state.request_type} Requests</h4>
                    <Row>
                        {request_cards}
                    </Row>
                </span>


            </div>
            </div>
        )
    }
}

export default Userpage;