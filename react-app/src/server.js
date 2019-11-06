/* server.js*/
'use strict';
const log = console.log;

const express = require('express');

const bodyParser = require('body-parser'); // middleware for parsing HTTP body
const app = express();
const {ObjectID} = require('mongodb');

const User = require('./models/user.js');

/* Use statements for the server */
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./mongoose').connect();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});

app.post("/user/signup", (req, res) => {
    log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    user.save()
        .then(user => {
            res.send("user " + user.username + " saved to database");
        })
        .catch(err => {
            log(err);
            res.status(400).send(err);
        });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    log('Listening on port 5000...');
});
