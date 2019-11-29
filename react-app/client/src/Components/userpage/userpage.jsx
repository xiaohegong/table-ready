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
                this.setState({invitations: res.data})
            }
        )
    }

    deleteinvitation = (index) => {
        const tobedeleted = this.state.invitations[index]
        axios.post(`/deleteinvi/${this.props.match.params.id}`, {
            new_array: this.state.invitations.filter(element => element != tobedeleted )
        }).then(res => {
            console.log(res)
        }
        ).catch(error => console.log(error))
    }

    approveinvitation = (index) => {
        const approved = this.state.invitations[index]
        axios.post(`/acceptinvi/${this.props.match.params.id}`, {
            new_array: [],
            rest_id: approved
        }).then(res => console.log(res)).catch(error => console.log(error))
    }

    render(){
        {
            return(
                this.state.invitations.map((item,index) => {
                    <Col md="3" key={index} className="request_col">        
                        <Card className="request_card">
                            <Card.Header>ID: {item._id}</Card.Header>
                            <Card.Body>
                                <Card.Text>Name: {item.name}</Card.Text>
                                <Card.Text>Rating: {item.rating}</Card.Text>
                                <Card.Text>Phone Number: {item.phoneNumber}</Card.Text>
                                <Button variant="danger" onClick={(index)=>{
                                        this.deleteinvitation(index)
                                    }}>Reject</Button>
                                <Button className="float-right" variant="success" onClick={(index)=>{
                                        this.approveinvitation(index)
                                    }}>Approve</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                })
            )
        }
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    current_user: state.auth.user,
    auth: state.auth
});
  
export default connect(mapStateToProps)(withRouter(Userpage));

