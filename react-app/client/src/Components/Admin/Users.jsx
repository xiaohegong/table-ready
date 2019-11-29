import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import axios from 'axios';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

axios.defaults.baseURL = '../';

const log = console.log;

function UserRow(props) {
    const user = props.user;
    const del = props.delete;

    return (
        <tr key={user._id.toString()}>
            <th scope="row"><Link to={getUserLink(user)}>{user.username}</Link></th>
            {/*<td><Link to={""}>{user.name}</Link></td>*/}
            {/*<td>{user.registered}</td>*/}
            <td>{user.email}</td>
            <td>{user.tel}</td>
            <td>{user.accountType}</td>
            <td><Button outline color="danger" size="sm" onClick={() => {
                del(user._id);
            }}>Delete
            </Button></td>
        </tr>
    );
}

function getUserLink(user) {
    let res = `/${user._id}`;

    if (user.accountType === "SuperAdmin") {
        res = "/admin" + res;
    } else if (user.accountType === "Admin") {
        res = "/restaurateur" + res;
    } else if (user.accountType === "Employee")
        res = "/userpage" + res;

    return res;
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {
            users: [],
            query: this.props.query
        };

    }

    componentWillReceiveProps(nextProp) {
        this.setState(nextProp);
    }

    componentDidMount() {
        axios.get('/api/users/')
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

    deleteUser(id) {
        const user = this.state.users.filter(el => el._id === id)[0];

        confirmAlert({
            title: 'Delete User',
            message: 'Are you sure you want to remove user ' + user.username + '?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete('/api/users/' + id)
                            .then(res => {
                                this.setState({
                                    users: this.state.users.filter(el => el._id !== id)
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


    userList() {
        let res = this.state.users;

        if (this.state.query !== "") {
            res = res.filter((u) => {
                return u.username.toLowerCase().match(this.state.query);
            });
        }

        return res.map((user, index) =>
            <UserRow key={index} user={user} delete={this.deleteUser}/>
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
                           placeholder="Search username..."
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
                                    <i className="fa fa-align-justify"></i> Users of Table Ready
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover>
                                        <thead>
                                        <tr>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.userList()
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

export default Users;
