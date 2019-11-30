import React from 'react';
import './userpage.css';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {slide as Menu} from 'react-burger-menu';
import Nav from 'react-bootstrap/Nav';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import VerticalModal from './verticalmodal';
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';
import userlist from './userlist';
import axios from 'axios';
import {withCookies} from 'react-cookie';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import '../../Stylesheets/restaurateur_page.scss';
import RestaurateurSettingModal from '../Restaurateur/RestaurateurSettingModal';
import AvatarModal from '../Restaurateur/AvatarModal';
import RestaurantListItem from '../Restaurateur/RestaurantListItem'


class Userpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
            approved: false,
            rest_obj: null
        };
    }

    componentDidMount() {
        axios.get(`/restinfo/${this.props.match.params.id}`)
            .then(
                res => {
                    this.setState({invitations: res.data});
                }
            )
    }

    deleteInvitation = (index) => {
        const tobedeleted = this.state.invitations[index];
        axios.post(`/deleteinvi/${this.props.match.params.id}`, {
            new_array: this.state.invitations.filter(element => element !== tobedeleted)
        }).then(res => {
                console.log(res);
            }
        ).catch(error => console.log(error));
    };

    approveInvitation = (index) => {
        const approved = this.state.invitations[index];
        console.log(approved);
        axios.post(`/acceptinvi/${this.props.match.params.id}`, {
            new_array: [],
            rest_id: approved
        }).then(res => {
            console.log(res);
            this.setState({approved: true});
        }).catch(error => console.log(error));
    };

    render_page = () => {
        return (
            this.state.invitations.map((item, index) => (
                <Col md="6" key={index} className="request_col">
                    <Card className="request_card">
                        <Card.Header>ID: {item._id}</Card.Header>
                        <Card.Body>
                            <Card.Text>Name: {item.name}</Card.Text>
                            <Card.Text>Rating: {item.rating}</Card.Text>
                            <Card.Text>Phone Number: {item.phoneNumber}</Card.Text>
                            <Button variant="danger" onClick={(index) => {
                                this.deleteInvitation(index);
                            }}>Reject</Button>
                            <Button className="float-right" variant="success" onClick={(e) => {
                                this.approveInvitation(index);
                            }}>Approve</Button>
                        </Card.Body>
                    </Card>
                </Col>
        )

        ))
    }
    render_invitations = () => {
        return (
            <div className="col-md-9">
                <h2 style={{ display: 'inline' }}>Your Invitations</h2>
                <div className="restaurants-display">
                    {this.state.invitations.length === 0 ? (
                    <div  style={{margin: "5%"}}>
                    <React.Fragment>
                        <br/>
                        <p>    Welcome! You don't have invitation to join any restaurant yet.</p>
                        <p>    Please request your restaurant managers to send you an invitation and check back!</p>
                    </React.Fragment>
                    </div>
                ) : this.render_page()}
                  </div>
                </div>
            
        )
    }
    render_restaurant = () => {
        return (
            <div>
                <Link to={`/employee/${this.props.match.params.id}`}>
                    <Button>To my Restaruant</Button>
                </Link>
                
            </div>
        )
    }

    new_render_page = () => {
        return (
        <div className="restaurateur-page">
          <div className="container">
            <div className="row">
              <div className="col-md-3 info">
                <h2 className="">{this.props.current_user.username}</h2>
                <div>
                  <AvatarModal image={this.props.current_user.image} />
                </div>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Telephone: </strong>
                    {this.props.current_user.tel}
                  </li>
                  <li className="list-group-item">
                    <strong>Email: </strong>
                    {this.props.current_user.email}
                  </li>
                  <li className="list-group-item">
                    <RestaurateurSettingModal user={this.props.current_user} />
                  </li>
                </ul>
              </div>
            
            <div>
                {this.props.current_user.workFor === "" ? this.render_invitations() : this.render_restaurant()}
            </div>
              
              
              </div>
            </div>
          </div>
        )
        
    }

    render() {
            if (this.state.approved) {
                return <Redirect to={`/employee/${this.props.match.params.id}`}/>;
            }
            if (!this.props.isAuthenticated) {
                return <Redirect to="/signin"/>;
            } else {
                return (
                    <div>
                        <Navbar/>
                        {this.new_render_page()}
                    </div>

                );
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

