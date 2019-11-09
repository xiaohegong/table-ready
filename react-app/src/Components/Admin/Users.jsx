import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import axios from 'axios';

const log = console.log;

function UserRow(props) {
    const user = props.user;
    const del = props.delete;
    const userLink = `/users/${user._id}`;

    return (
        <tr key={user._id.toString()}>
            <th scope="row"><Link to={userLink}>{user.username}</Link></th>
            <td><Link to={userLink}>{user.name}</Link></td>
            {/*<td>{user.registered}</td>*/}
            <td>{user.tel}</td>
            <td>{user.accountType}</td>
            <td><Button outline color="danger" size="sm" onClick={() => {
                del(user._id);
            }}>Delete
            </Button></td>
        </tr>
    );
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

    deleteUser(id) {
        axios.delete('api/users/' + id)
            .then(res => {
                this.setState({
                    users: this.state.users.filter(el => el._id !== id)
                });
            })
            .catch(err => {
                log(err);
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


    render() {
        return (
            <div className="animated fadeIn mx-auto">
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Users
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th scope="col">Username</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone Number</th>
                                        {/*TODO (xiaohegong) add name, date registered*/}
                                        {/*<th scope="col">registered</th>*/}
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
        );
    }
}

export default Users;
