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
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import '../../Stylesheets/restaurateur_page.scss';
import RestaurateurSettingModal from '../Restaurateur/RestaurateurSettingModal';
import AvatarModal from '../Restaurateur/AvatarModal';
import RestaurantListItem from '../Restaurateur/RestaurantListItem';


class Userpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
            approved: false,
            rest_obj: null,
            current_user: null
        };
    }

    componentDidMount() {
        axios.get(`/restinfo/${this.props.match.params.id}`)
            .then(
                res => {
                    this.setState({invitations: res.data});
                }
            );
        axios.get(`/api/users/get/${this.props.match.params.id}`)
            .then(res => {
                this.state.current_user = res.data[0];
                this.setState({
                    current_user: res.data[0]
                });
                if (this.state.current_user.workFor !== "") {
                    axios.post("/api/restaurants/findRestaurant", {_id: this.state.current_user.workFor})
                        .then(res => {
                            console.log(res)
                            this.setState({
                                rest_obj: res.data[1][0]
                            });
                        });
                }
            })

    }

    deleteInvitation = (index) => {
        console.log(index);
        const tobedeleted = this.state.invitations[index];
        console.log(tobedeleted);
        axios.post(`/deleteinvi/${this.props.match.params.id}`, {
            new_array: this.state.invitations.filter(element => element !== tobedeleted)
        }).then(res => {
                console.log(res);
                this.setState({
                    invitations: this.state.invitations.filter(element => element !== tobedeleted)
                });
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
                            <Card.Header>Invitation to join {item.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>Name: {item.name}</Card.Text>
                                <Card.Text>Rating: {item.rating}</Card.Text>
                                <Card.Text>Phone Number: {item.phoneNumber}</Card.Text>
                                <Button variant="danger" onClick={(e) => {
                                    this.deleteInvitation(index);
                                }}>Reject</Button>
                                <Button className="float-right" variant="success" onClick={(e) => {
                                    this.approveInvitation(index);
                                }}>Approve</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            ));
    };
    render_invitations = () => {
        return (
            <Col >
                <h2 style={{display: 'inline'}}>Your Invitations</h2>
                <div className="restaurants-display">
                    {this.state.invitations.length === 0 ? (
                        <div style={{margin: "5%"}}>
                            <React.Fragment>
                                <br/>
                                <p> Welcome! You don't have invitation to join any restaurant yet.</p>
                                <p> Please request your restaurant managers to send you an invitation and check
                                    back!</p>
                            </React.Fragment>
                        </div>
                    ) : this.render_page()}
                </div>
            </Col>

        );
    };
    render_restaurant = () => {
        if (this.state.rest_obj != null) {
            return (
                <Col md="6">
                    <h2 style={{display: 'inline'}}>Your Restaurants</h2>
                    <br/>
                    <div className="restaurant-list-item" style={{width: '800px'}}>
                        <Link to={`/employee/${this.props.match.params.id}`}>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action"
                            >
                                <div className="row">
                                    <div className="restaurant-info col-md-8">
                                        <h4>{this.state.rest_obj.name}</h4>
                                        <p>Address: {this.state.rest_obj.location}</p>
                                        <p>Telephone: {this.state.rest_obj.phoneNumber}</p>
                                    </div>
                                    <img
                                        src={this.state.rest_obj.image}
                                        alt=""
                                        className="img-thumbnail rounded float-right col-md-4"
                                    />
                                </div>
                            </button>
                        </Link>
                    </div>
                </Col>
            );
        }

    };

    new_render_page = () => {
        return (
            <div className="restaurateur-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 info">
                            <h2 className="">{this.state.current_user.username}</h2>
                            <div>
                                <AvatarModal image={this.state.current_user.image}/>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Telephone: </strong>
                                    {this.state.current_user.tel}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email: </strong>
                                    {this.state.current_user.email}
                                </li>
                                <li className="list-group-item">
                                    <RestaurateurSettingModal user={this.state.current_user}/>
                                </li>
                            </ul>
                        </div>

                        {this.state.current_user.workFor === "" ? this.render_invitations() : this.render_restaurant()}


                    </div>
                </div>
            </div>
        );

    };

    render() {
        if (this.state.current_user != null) {
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
        } else {
            return (null);
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

