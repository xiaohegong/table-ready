import React, {Component} from "react";
import "../../Stylesheets/admin_page.scss";
import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
} from 'reactstrap';

const log = console.log;
axios.defaults.baseURL = '../';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.confirmChange = this.confirmChange.bind(this);
        this.state = {
            error: false,
            user: null
        };
    }

    componentDidMount() {
        axios
            .get('/api/users/get/' + this.props.id)
            .then(res => {
                this.setState({user: res.data[0]});
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({msg: err.response.data});
            });
    }


    confirmChange = () => {
        const new_email = document.getElementById("nf-email").value;
        const new_tel = document.getElementById("tel").value;
        const old_password = document.getElementById("oldPassword").value;
        const new_password = document.getElementById("newPassword").value;

        const email = new_email === '' ? this.state.user.email : new_email;
        const tel = new_tel === '' ? this.state.user.tel : new_tel;
        if (new_password === '' || new_password.length < 4) {
            this.setState({
                error: true,
                message: "Password must be longer than 4 characters!"
            });
            return;
        }
        if (!old_password || old_password === '') {
            this.setState({
                error: true,
                message: 'Old Password Must be filled in to make any changes'
            });
        } else {
            const user = {
                email,
                tel,
                old_password,
                new_password
            };

            axios
                .patch('/api/users/setting/' + this.props.id, user)
                .then(res => {
                    this.setState({
                        error: false,
                        message: "User information successfully updated!"
                    });
                })
                .catch(err => {
                    console.log(err.response.data);
                    this.setState({
                        error: true,
                        message: err.response.data
                    });
                });
        }

    };

    resetInputBox = () => {
        document.getElementById('nf-password').value = '';
        document.getElementById('nf-email').value = '';
    };

    render() {
        return (
            <div className='setting'>
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
                <div className='setting-container'>
                    <div className='row'>
                        <Card>
                            <CardHeader>
                                <strong>Update your Information</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-email">New Email</Label>
                                        <Input type="email" id="nf-email" name="nf-email" placeholder="Enter Email.."
                                               autoComplete="email"/>
                                        <FormText className="help-block">Please enter your new email</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-email">New Phone Number</Label>
                                        <Input type="email" id="tel" name="nf-email"
                                               placeholder="Enter New Phone Number..."
                                               autoComplete="email"/>
                                        <FormText className="help-block">Please enter your new email</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Old Password</Label>
                                        <Input type="password" id="oldPassword" name="nf-password"
                                               placeholder="Enter Password.." autoComplete="current-password"/>
                                        <FormText className="help-block">Please enter your old password</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">New Password</Label>
                                        <Input type="password" id="newPassword" name="nf-password"
                                               placeholder="Enter Password.." autoComplete="current-password"/>
                                        <FormText className="help-block">Please enter your new password</FormText>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.confirmChange}><i
                                    className="fa fa-dot-circle-o"></i> Confirm</Button>
                                <Button type="reset" size="sm" color="danger" onClick={this.resetInputBox}><i
                                    className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;