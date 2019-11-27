import React, { Component } from "react";
import TableItem from "./TableItem";
import { Link } from "react-router-dom";
import EmployeeListItem from "./EmployeeListItem";
import uid from "uid";
import axios from "axios";

class Table extends Component {
    state = { tableItem: [] };
    constructor(props) {
        super(props);
        this.fetchTable = this.fetchTable.bind(this);
        this.addTable = this.addTable.bind(this)
        // this.test1 = this.test1.bind(this);
    }
    componentDidMount() {
        this.fetchTable();
    }

    fetchTable = () => {
        const header = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        axios
          .post(
            "/restaurant/findTableByRestaurant",
            {
                restaurant_id: this.props.res_id
            },
            header
          )
          .then(tableItem =>
            this.setState({ tableItem: tableItem.data }, () =>
              console.log("Customers fetched...", tableItem)
            )
          )
          .catch(err => {
              console.log(400);
          });
    };
    deleteItem = id => {
        console.log(id);
        const tableItem = this.state.tableItem;
        for (let i = 0; i < tableItem.length; i++) {
            if (tableItem[i]._id === id) {
                tableItem.splice(i, 1);
                axios
                  .post("/restaurant/deleteTableItem", {
                      restaurant_id: this.props.res_id,
                      table_id: id
                  })
                  .then(msg => {
                      console.log(msg);
                  })
                  .catch(err => {
                      console.log(err);
                  });
            }
        }
        this.setState({ tableItem: tableItem });
    };

    addTable = () =>{
      const header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      axios
        .post(
          "/resetaurant/newTable",
          {
            restaurant_id: this.props.res_id
          },
          header
        )
        .then(
          this.fetchTable()
        )
        .catch(err => {
          console.log(400);
        });
    }

    render() {
        return (
          <>
              <h2 style={{ display: "inline" }}>Tables</h2>
            <button onClick={this.addTable} className="addNewButton btn btn-outline-success btn-sm">
              {" "}
              Add New{" "}
            </button>

              <div className="list-group employee-list">
                  {this.state.tableItem.map(tableItem => {
                      return (
                        <TableItem
                          key={uid()}
                          id = {tableItem._id}
                          capacity = {tableItem.table_capacity}
                          name = {tableItem.name}
                          deleteItem={this.deleteItem}
                        />
                      );
                  })}
              </div>
          </>
        );
    }
}

export default Table;
