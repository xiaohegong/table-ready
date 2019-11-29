import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ImageUploader extends Component {
  state = {
    filename: '',
    progress: 0,
    url: '',
    file_type: '',
    msg: '',
    public_id: '',
    isUploading: false
  };

  removeFile = () => {
    if (this.state.public_id) {
      axios
        .delete(`/upload/${this.state.public_id}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  onChange = async e => {
    if (!this.props.public_id) {
      this.removeFile();
    }
    if (!e.target.files[0]) return;
    this.setState({
      filename: e.target.files[0].name,
      file_type: e.target.files[0].type
    });
    console.log(e.target.files);
    const input_element = document.getElementById('file-input');
    if (!input_element.files || !input_element.files[0]) {
      this.setMessage('No file chosen');
      return;
    }
    const file = input_element.files[0];
    const file_type = file.type;
    this.setState({ isUploading: true });
    if (
      !file_type.includes('png') &&
      !file_type.includes('jpg') &&
      !file_type.includes('jpeg')
    ) {
      this.setMessage('File must be jpg or png');
      return;
    }
    const formData = new FormData();
    formData.append('file', file); // get first file chosen
    if (this.props.public_id) {
      formData.append('public_id', this.props.public_id);
    }
    const setUploadPercentage = this.setUploadPercentage;
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      this.setMessage('File Uploaded');
      console.log(res.data[0]);
      this.setState({ url: res.data[0].url, public_id: res.data[0].public_id });
      this.props.setParentState('url', this.state.url);
      this.setState({ isUploading: false });
    } catch (err) {
      if (err.response.status === 500) {
        this.setMessage('There was a problem with the server');
      } else {
        this.setMessage(err.response.data.msg);
      }
      console.log(err);
    }
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  setUploadPercentage = progress => {
    this.setState({ progress });
  };

  onSubmit = async e => {
    e.preventDefault();
  };

  getDisplay = () => {
    if (this.state.isUploading) {
      return <h3>Uploading</h3>;
    }
    if (this.state.url) {
      return (
        <img
          src={this.state.url}
          className="rounded mx-auto d-block"
          alt="..."
          style={{ width: '100%' }}
        />
      );
    } else {
      return null;
    }
  };

  setMessage = msg => {
    this.setState({ msg });
    setTimeout(() => {
      this.setState({ msg: '' });
    }, 5000);
  };

  render() {
    // const buttonCSS = { padding: 0, border: 'none', background: 'none' };
    return (
      <div className="container">
        {this.state.msg ? (
          <div className="alert alert-info" role="alert">
            {this.state.msg}
          </div>
        ) : null}
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="file-input"
              onChange={this.onChange}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile02">
              {this.state.filename ? this.state.filename : 'Choose file'}
            </label>
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${this.state.progress}%` }}
            aria-valuenow={this.state.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {this.state.progress}%
          </div>
        </div>
        <br />
        {this.getDisplay()}
      </div>
    );
  }
}

export default withRouter(ImageUploader);
