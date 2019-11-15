import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
<div>
    <center><h1>YOU DO NOT HAVE PERMISSION TO VIEW THIS PAGE!</h1></center>
<center><Link to="/SignIn">Return to Home Page</Link></center>
</div>
);
export default NotFound;