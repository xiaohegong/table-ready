import React, { Component, useState } from 'react';
import axios from 'axios';

class ImageUpload extends Component {
  state = {
    filename: '',
    progress: 0,
    url: '',
    file_type: ''
  };

  onChange = e => {
    if (!e.target.files[0]) return;
    this.setState({
      filename: e.target.files[0].name,
      file_type: e.target.files[0].type
    });
    console.log(e.target.files);
  };

  setUploadPercentage = progress => {
    this.setState({ progress });
  };

  onSubmit = async e => {
    e.preventDefault();
    const input_element = document.getElementById('file-input');
    if (!input_element.files || !input_element.files[0]) {
      console.log('No file chosen');
      return;
    }
    const file = input_element.files[0];
    const file_type = file.type;
    if (
      !file_type.includes('png') &&
      !file_type.includes('jpg') &&
      !file_type.includes('pdf')
    ) {
      console.log('File must be jpg, png or pdf file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file); // get first file chosen
    const setUploadPercentage = this.setUploadPercentage;
    try {
      const res = await axios.post('/upload', formData, {
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

      const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      console.log('File Uploaded');
      console.log(res.data[0]);
      this.setState({ url: res.data[0].url });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
      console.log(err);
    }
  };

  getDisplay = () => {
    if (this.state.url) {
      if (this.state.file_type.includes('pdf')) {
        return (
          <embed
            className="center"
            src={this.state.url}
            width="100%"
            height="1000px"
          />
        );
      } else {
        return (
          <img
            src={this.state.url}
            className="rounded mx-auto d-block"
            alt="..."
            style={{ width: '50%' }}
          />
        );
      }
    } else {
      return null;
    }
  };

  render() {
    const buttonCSS = { padding: 0, border: 'none', background: 'none' };
    return (
      <div className="container mt-5">
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
          <button
            style={buttonCSS}
            className="input-group-append"
            onClick={this.onSubmit}
          >
            <span className="input-group-text" id="">
              Upload
            </span>
          </button>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${this.state.progress}%` }}
            aria-valuenow={`${this.state.progress}`}
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

export default ImageUpload;
