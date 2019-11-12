/* server.js*/
'use strict';
const log = console.log;
const express = require('express');
const bodyParser = require('body-parser'); // middleware for parsing HTTP body
const app = express();
const {ObjectID} = require('mongodb');
const User = require('./models/user.js');
const Restaurant = require('./models/restaurant.js');
const Waitlist = require('./models/waitlist.js');
const Table = require('./models/table.js');
var session = require('express-session')
/* Attempting to setup passport.js for user */
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000,
      httpOnly: true
  }
}));

// use to redirect to home if already logged in
const sessionChecker = (req, res, next) => {
  if (req.session.userId) {
      res.redirect('/index');
  } else {
      res.clearCookie("name");
      res.clearCookie("id");
      res.clearCookie("admin");
      res.clearCookie("newnotifications");
      next();
  }
};

// use to clear the cookie whenever the user is not actually logged in
const cookieClearer = (req, res, next) => {
  if (req.session.userId) {
      next();
  } else {
      res.clearCookie("name");
      res.clearCookie("id");
      res.clearCookie("admin");
      res.clearCookie("newnotifications");
      next();
  }
};

// use to redirect if a session has not been created
const sessionCheckLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
      res.clearCookie("name");
      res.clearCookie("id");
      res.clearCookie("admin");
      res.clearCookie("newnotifications");
      res.redirect('/login');
  } else {
      next();
  }
};

const sessionHandleRequest = (req, res, next) => {
  if (!req.session.userId) {
      res.clearCookie("name");
      res.clearCookie("id");
      res.clearCookie("admin");
      res.clearCookie("newnotifications");
      res.status(404).send();
  } else {
      next();
  }
};
/* Use statements for the server */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('./mongoose').connect();

app.get("/", (req, res) => {
  res.send("Hello World");
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
  Restaurant.find({owner: "Heddy"}).then((restaurant) => {
    res.send(restaurant);
  }, (error) => {
    res.send({code: 404, error});
  });
  // return new Promise((resolve, reject) => {
  //
  // });

});

app.post("/waitlist/newWaitlist", (req, res) => {
  const waitlist = new Waitlist({
    id: req.body.id,
    name: req.body.name,
    people: req.body.people,
    date_of_arrival: req.body.date_of_arrival,
    estimated_time: req.body.estimated_time
  });
  waitlist.save()
    .then(waitlist => {
      res.send("waitlist" + waitlist.name + " saved to database");
    })
    .catch(err => {
      log(err);
      res.send({code: 404, error})
    })
})

app.post("/waitlist/getWaitlist", (req, res) => {
  Waitlist.find().then((waitlist) => {
    res.send(waitlist);
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log('Listening on port 5000...');
});
