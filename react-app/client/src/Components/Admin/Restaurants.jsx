import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import axios from 'axios';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const log = console.log;

function RestRow(props) {
    const rest = props.rest;
    const del = props.delete;
    const restLink = `/restaurateur2/${rest._id}`;
    const ownerLink = `/restaurateur/${rest.owner}`;

    return (
        <tr key={rest._id.toString()}>
            <th scope="row"><Link to={restLink}>{rest.name}</Link></th>
            <td><Link to={ownerLink}>{rest.owner_name}</Link></td>
            <td>{rest.location}</td>
            <td>{rest.phoneNumber}</td>
            {/*<td>{rest.operationHour}</td>*/}
            <td><Button outline color="danger" size="sm" onClick={() => {
                del(rest._id);
            }}>Delete
            </Button></td>
        </tr>
    );
}

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.deleteRest = this.deleteRest.bind(this);
        this.state = {
            rest: [],
            users: [],
            query: this.props.query
        };
    }

    componentWillReceiveProps(nextProp) {
        this.setState(nextProp);
    }

    componentDidMount() {
        axios.get('api/restaurants')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        rest: res.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('api/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteRest(id) {
        const restaurant = this.state.rest.filter(el => el._id === id)[0];

        confirmAlert({
            title: 'Delete Restaurant',
            message: 'Are you sure you want to remove restaurant ' + restaurant.name + '?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete('api/restaurants/' + id)
                            .then(res => {
                                this.setState({
                                    rest: this.state.rest.filter(el => el._id !== id)
                                });
                            })
                            .catch(err => {
                                log(err);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        });

    }


    restList() {
        let res = this.state.rest;

        if (this.state.query !== "") {
            res = res.filter((r) => {
                return r.name.toLowerCase().match(this.state.query);
            });
        }

        return res.map((rest, index) => {
                log(this.state.users);
                let owner = this.state.users.find((user) => {
                    return user._id === rest.owner;
                });

                rest.owner_name = "";
                if (owner) {
                    rest.owner_name = owner.username;
                } else {
                    rest.owner_name = "No Name";
                }
                log(rest);
                return <RestRow key={index} rest={rest} delete={this.deleteRest}/>;
            }
        );
    }

    search = () => {
        let val = document.getElementById("searchInput").value;
        val = val.trim().toLowerCase();
        this.setState(() => ({query: val}));
    };


    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="searchInput"
                           placeholder="Search restaurant name..."
                           aria-label="username" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button"
                                id="button-addon2" onClick={this.search}>Search
                        </button>
                    </div>
                </div>

                <div className="animated fadeIn mx-auto">
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Restaurants at Table Ready
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover>
                                        <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Owner</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Contact</th>
                                            {/*<th scope="col">Hours</th>*/}
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.restList()
                                        }
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Restaurants;
