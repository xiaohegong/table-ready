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
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import userlist from './userlist'
import axios from 'axios'
import { withCookies } from 'react-cookie';

class Userpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            invitations: []
        }
    }
    
    componentDidMount() {
    console.log(this.props)
     axios.get(`/restinfo/${this.props.match.params.id}`).then(
            res => {
                console.log(res) 
                this.setState({invitations: res.data})
            }
        )
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
        return null
        //     request_cards = this.state.roommate_list.map((roommate, index) => (

            
        //         <Col md="3" key={index} className="request_col">        
        //             <Card className="request_card">
        //                 <p>ID: {roommate.id}</p><br></br>
        //                 <Card.Body>
        //                     <Card.Text>Name: {roommate.name}</Card.Text>
        //                     <Card.Text>Rating: {roommate.rating}</Card.Text>
        //                     <Card.Text><Link to={roommate.url}>Link</Link></Card.Text>
        //                     <Button variant="danger" onClick={()=>{
        //                             this.state.roommate_list[index].status = "reject"
        //                             this.setState({
        //                                 roommate_list: this.state.roommate_list.filter(i => i.status == "pending")     
        //                             })
        //                             console.log(this.state.roommate_list)
        //                         }}>Reject</Button>
        //                     <Button className="float-right" variant="success" onClick={()=>{
        //                             this.state.roommate_list[index].status = "approve"
        //                             this.setState({
        //                                 roommate_list: this.state.roommate_list.filter(i => i.status == "pending")     
        //                             })
        //                         }}>Approve</Button>
        //                 </Card.Body>
        //             </Card>
        //         </Col>
        //     ))
        // return(
        //     <div>
        //         <div id="pagewrap">
        //         <span className="content">
        //             <div className="header">
        //                 <h2 id="header_text">Dash Board</h2>
        //             </div>
        //             <h4 className="sub_header">{this.state.request_type} Requests</h4>
        //             <Row>
        //                 {request_cards}
        //             </Row>
        //         </span>


        //     </div>
        //     </div>
        //)
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    current_user: state.auth.user,
    auth: state.auth
});
  
export default connect(mapStateToProps)(withRouter(Userpage));

