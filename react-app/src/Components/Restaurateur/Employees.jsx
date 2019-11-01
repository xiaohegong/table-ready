import React, {Component} from 'react';
import EmployeeListItem from "./EmployeeListItem";

class Employees extends Component {
    state = {  };
    render() {
        return ( <>
            <h2>Employees</h2>
            <div className="list-group employee-list">
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
                <EmployeeListItem
                    image={process.env.PUBLIC_URL + "/images/avatar_sample.png"}
                    name="Employee Name"
                    id="employee881294"
                    telephone="123-456-7890"
                />
            </div>
       </> );
    }
}

export default Employees;
