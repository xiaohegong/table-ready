import React, {Component} from 'react';
import axios from "axios";

class TableItem extends Component {
  state = { codeBlock:<><div><strong>Name: </strong><p>{this.props.name}</p></div>
      <div><strong>Capacity: </strong><p>{this.props.capacity}</p></div></> };

  editCode = () => {
    this.setState({
      codeBlock: (
        <>
          <textarea id="name" row="2">
            {this.props.name}
          </textarea>
          <textarea id="capacity" row="2">
            {this.props.capacity}
          </textarea>
          <button
            className="addNewButton btn btn-outline-success btn-sm"
            onClick={this.submit}
          >
            Done
          </button>
        </>
      )
    });
  };

  submit = () => {
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "/table/updateTable",
        {
          _id: this.props.id,
          tableNum: document.getElementById("capacity").value,
          name: document.getElementById("name").value
        },
        header
      )

      .then(table => {
        const capacity = document.getElementById("capacity").value;
        const name = document.getElementById("name").value;
        this.setState({

          codeBlock: (
            <><div><strong>Name: </strong><p>{name}</p></div>
              <div><strong>Capacity: </strong><p>{capacity}</p></div></>
          )
        });
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { deleteItem, id } = this.props;
    return (
      <button
        type="button"
        className="employee-list-item-component list-group-item list-group-item-action employee-list-item"
      >
        <div className="row">

          <div className="col col-md-6">
            <div className="employee-info">
              <p>
                {this.state.codeBlock}
              </p>

            </div>
          </div>

          <div className="col col-md-2">
            <span
              className="btn btn-sm btn-outline-success"
              onClick={this.editCode}
              style={{marginBottom:"10px"}}
            >
              Edit
            </span>
            <span
              className="btn btn-sm btn-outline-danger"
              onClick={deleteItem.bind(this, id)}
            >
              Delete
            </span>
          </div>
        </div>
      </button>
    );
  }
}

export default TableItem;
