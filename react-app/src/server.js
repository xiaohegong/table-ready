/* server.js - mar 11 -10am*/
'use strict';
const log = console.log;

const express = require('express');
const mongoose = require('./mongoose');
const path = require('path');
const {Users} = require('./modules');

const app = express();
const bodyParser = require('body-parser'); // middleware for parsing HTTP body
const {ObjectID} = require('mongodb');



app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});

var u = new Users({
    name:"DAHAI",
    password:"1234",
    isAdmin: false,
}).save(function (err, res) {
   console.log('w')
});
// Users.insertOne(u);


// u.save().then((result) => {
//     console.log(result);
// }, (error) => {
//     console.log("NO");
// });

app.use(express.static("public"));



const port = process.env.PORT || 5000;
app.listen(port, () => {
    log('Listening on port 5000...');
});  // common local host development port 3000
// we've bound that port to localhost to go to our express server
// Must restart web server whenyou make changes to route handlers
