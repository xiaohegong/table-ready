import React, {Component} from 'react';
import axios from "axios";

class TableItem extends Component {
  state = { codeBlock:<p>{this.props.capacity}</p> };

  editCode = () => {
    this.setState({
      codeBlock: (
        <>
          <textarea id="codeBlock" row="5">
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
    console.log("Q")
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "/restaurant/updateTable",
        {
          _id: this.props.id,
          tableNum: document.getElementById("codeBlock").value
        },
        header
      )

      .then(table => {
        const block = document.getElementById("codeBlock").value;
        this.setState({
          codeBlock: (
            <>
              <p>{block}</p>
            </>
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
                <strong>Capacity: </strong>
                {this.state.codeBlock}
              </p>

            </div>
          </div>
          <div className="col col-md-2">
            <span
              className="btn btn-sm btn-outline-danger"
              onClick={deleteItem.bind(this, id)}
            >
              Delete
            </span>
          </div>
          <div className="col col-md-2">
            <span
              className="btn btn-sm btn-outline-success"
              onClick={this.editCode}
            >
              Edit
            </span>
          </div>
        </div>
      </button>
    );
  }
}

export default TableItem;
