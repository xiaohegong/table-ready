import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class RestaurateurSettingModal extends Component {
  state = {};

  state = {
    modal: false,
    email: '',
    tel: '',
    old_password: '',
    new_password: '',
    confirm_password: '',
    msg: null
  };

  toggle = () => {
    // Clear errors
    // this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
    this.setState({ msg: null });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    let {
      email,
      tel,
      old_password,
      new_password,
      confirm_password
    } = this.state;
    email = email === '' ? this.props.user.email : email;
    tel = tel === '' ? this.props.user.tel : tel;
    if (!old_password || old_password === '') {
      this.setState({
        msg: 'Old Password Must be filled in to make any changes'
      });
      return;
    }
    if (new_password !== confirm_password) {
      this.setState({ msg: "Passwords don't match" });
      return;
    }
    const user = {
      email,
      tel,
      old_password,
      new_password
    };

    // Attempt to change setting
    axios
      .patch('/api/users/setting/' + this.props.match.params.id, user)
      .then(res => {
        this.toggle();
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ msg: err.response.data });
      });
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {/* <NavLink onClick={this.toggle} href="#">
          <strong>Setting</strong>
        </NavLink> */}
        <button className="btn btn-sm btn-block" onClick={this.toggle}>
          <strong>Setting</strong>
        </button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Setting</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={this.props.user.email}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="tel">tel</Label>
                <Input
                  type="text"
                  name="tel"
                  id="tel"
                  placeholder={this.props.user.tel}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="old_password">Old Password</Label>
                <Input
                  type="password"
                  name="old_password"
                  id="old_password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="new_password">New Password</Label>
                <Input
                  type="password"
                  name="new_password"
                  id="new_password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="confirm_password">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withRouter(RestaurateurSettingModal);
