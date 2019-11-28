import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import store from '../../store';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import axios from 'axios';

class MenuImageModal extends Component {
  constructor(props) {
    super(props);
    const { className } = props;
    this.state = { modal: false, className, image: props.image, url: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  setModalState = (key, value) => {
    this.setState({ [key]: value });
  };

  confirm = async () => {
    axios
      .patch(
        `/api/menu/${this.props.match.params.id}`,
        {
          image: this.state.url
        },
        this.tokenConfig()
      )
      .then(res => {
        this.setState({ image: this.state.url });
        this.toggle();
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
  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <img
          onClick={this.toggle}
          src={this.state.image}
          alt=""
          className="restaurant-image"
        />
        <button
          onClick={this.toggle}
          className="btn btn-outline-secondary btn-sm btn-block mt-2"
        >
          Change Image
        </button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.state.className}
        >
          <ModalHeader toggle={this.toggle}>
            Change Restaurant Image
          </ModalHeader>
          <ModalBody>
            <ImageUploader
              setParentState={this.setModalState}
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

export default connect(mapStateToProps)(withRouter(MenuImageModal));
