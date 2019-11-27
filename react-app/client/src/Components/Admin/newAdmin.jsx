import {Component} from "react";
import axios from "axios";
import {
    Card, CardBody, CardHeader,
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
} from "reactstrap";
import React from "react";

const log = console.log;

class AddAdmin extends Component {
    constructor(props) {
        super(props);

        this.confirm = this.confirm.bind(this);
        this.state = {
            error: false
        };
    }

    componentWillReceiveProps(nextProp) {
        this.setState(nextProp);
    }

    confirm = (e) => {
        e.preventDefault();
        const new_username = document.getElementById("newUsername").value;
        const new_email = document.getElementById("newEmail").value;
        const new_password = document.getElementById("newPwd").value;
        const new_tel = document.getElementById("newTel").value;

        const new_user = {
            accountType: "SuperAdmin",
            username: new_username,
            password: new_password,
            email: new_email,
            tel: new_tel
        };
        // console.log(new_user);

        axios
            .post('/api/users', new_user)
            .then(res => {
                    log(res);
                    log("Successfully added new super admin!");
                    log(this.state);
                    this.setState({
                        message: "Successfully added new super admin user " + res.data.user.username + "!",
                        error: false
                    });

                    return res;
                }
            )
            .catch(err => {
                log(err);
                log(err.response);
                this.setState({
                    message: err.response.data.message || err.response.data.err.message,
                    error: true
                });
                return err;

            });
    };

    render() {
        return (
            <div className="newAdmin">
                {this.state.message && this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                ) : null}
                {this.state.message && !this.state.error ? (
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                ) : null}
                <Card>
                    <CardHeader>
                        Add a New Super Admin
                    </CardHeader>
                    <CardBody>
                        <Form action="">
                            <FormGroup>
                                <InputGroup>
                                    {/*<InputGroupAddon addonType="prepend">*/}
                                    {/*<InputGroupText><i className="fa fa-user"/></InputGroupText>*/}
                                    {/*</InputGroupAddon>*/}
                                    <Input type="text" id="newUsername" name="newUsername" placeholder="Username"
                                           autoComplete="name"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    {/*<InputGroupAddon addonType="prepend">*/}
                                    {/*<InputGroupText><i className="fa fa-user"/></InputGroupText>*/}
                                    {/*</InputGroupAddon>*/}
                                    <Input type="text" id="newTel" name="new tel" placeholder="Phone Number"
                                           autoComplete="phone number"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    {/*<InputGroupAddon addonType="prepend">*/}
                                    {/*<InputGroupText><i className="fa fa-envelope"/></InputGroupText>*/}
                                    {/*</InputGroupAddon>*/}
                                    <Input type="email" id="newEmail" name="newEmail" placeholder="Email"
                                           autoComplete="username"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    {/*<InputGroupAddon addonType="prepend">*/}
                                    {/*<InputGroupText><i className="fa fa-asterisk"/></InputGroupText>*/}
                                    {/*</InputGroupAddon>*/}
                                    <Input type="password" id="newPwd" name="newPwd" placeholder="Password"
                                           autoComplete="current-password"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="form-actions">
                                <Button type="submit" size="sm" color="primary"
                                        onClick={this.confirm}>Confirm</Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default AddAdmin;
