import React from 'react';
import { Link } from 'react-router-dom';


class NotFound extends React.Component{
    constructor(props) {
        super(props);
      }
      render(){
        console.log(this.props.cookies.cookies)
        return(
            <div>
            <center><h1>YOU DO NOT HAVE PERMISSION TO VIEW THIS PAGE!</h1></center>
            <center><Link to="/SignIn">Return to Home Page</Link></center>
            </div>
        )
      }
}

export default NotFound;