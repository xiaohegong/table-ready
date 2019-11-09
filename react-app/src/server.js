/* server.js*/
'use strict';
const log = console.log;
const express = require('express');
const bodyParser = require('body-parser'); // middleware for parsing HTTP body
const app = express();
const {ObjectID} = require('mongodb');
const User = require('./models/user.js');
const Restaurant = require('./models/Restaurant.js');

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
    accountType: req.body.accountType,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    tel: req.body.tel,
    manager: req.body.manager
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

app.post("/restaurant/newRestaurant", (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
    cuisine: req.body.cuisine,
    owner: req.body.owner
  });
  console.log(restaurant);
  restaurant.save()
    .then(restaurant => {
      res.send("restaurant " + restaurant.name + " saved to database");
    })
    .catch(err => {
      log(err);
      res.send({code: 404, error});
    });
  // return new Promise((resolve, reject) => {
  //
  // });
});

app.post("/restaurant/findRestaurantByOwner", (req, res) => {
  Restaurant.find({_id: "5dc4a693086ca7174b00fed7"}).then((restaurant) => {
    res.send(restaurant);
  }, (error) => {
    res.send({code: 404, error});
  });
  // return new Promise((resolve, reject) => {
  //
  // });

});

app.get('/api/users', (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      log(err);
      return err;
    }

    res.send(users);
  });
});

app.get('/api/restaurants', (req, res) => {
  Restaurant.find({}, function (err, restaurants) {
    if (err) {
      log(err);
      return err;
    }
    res.send(restaurants);
  });
});

app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.json('User ' + id + ' deleted.');
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

app.delete('/api/restaurants/:id', (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id)
    .then(() => {
      res.json('Restaurant ' + id + ' deleted.');
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});


app.get("/user/info", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json('Err ' + error));
});

// update the information of the user specified by the id.
app.put("/user/:id", (req, res) => {
  log('this body is: ' + req.body.email);
  log('this body is: ' + req.body.password);
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, todo) => {
    if (err) {
      return res.status(500).send(err)
    }

    console.log(todo);
    return res.send(todo);
  });
});

app.get("user/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      log("server.js successed!");
      res.json(user);
    })
    .catch(error => log(error));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log('Listening on port 5000...');
});
