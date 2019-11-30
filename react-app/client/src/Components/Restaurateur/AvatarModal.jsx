import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ImageUploader from './ImageUploader';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import store from '../../store';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/authActions';
import axios from 'axios';

class AvatarModal extends Component {
  constructor(props) {
    super(props);
    const {className} = props;
    this.state = {modal: false, className, image: props.image, url: ''};
  }

  setAvatarModalState = (key, value) => {
    this.setState({[key]: value});
  };

  confirm = () => {
    this.toggle();
    if (!this.state.url) return;
    axios
      .patch(
        `/api/users/change-avatar/${this.props.match.params.id}`,
        {
          image: this.state.url
        },
        this.tokenConfig()
      )
      .then(res => {
        store.dispatch(loadUser()); // update image in currentuser
        this.setState({image: this.state.url});
      })
      .catch(err => {
        console.log(err);
      });
  };

  tokenConfig = () => {
    const token = this.props.auth.token;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };

  toggle = () => this.setState(
    {modal: !this.state.modal}
  );

  render() {
    return (
      <div>
        <img
          onClick={this.toggle}
          src={this.state.image}
          alt=""
          className="avatar"
        />
        <button
          onClick={this.toggle}
          className="btn btn-outline-secondary btn-sm btn-block mt-2 mb-2"
        >
          Change Avatar
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.state.className}
        >
          <ModalHeader toggle={this.toggle}>Change Avatar</ModalHeader>
          <ModalBody>
            <ImageUploader
              setParentState={this.setAvatarModalState}
              public_id={this.props.match.params.id}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirm}>
              Confirm
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// getting from reducers (error and auth reducers)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  current_user: state.auth.user,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(AvatarModal));
