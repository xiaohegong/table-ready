/* server.js*/
"use strict";

const log = console.log;
const express = require("express");
const bodyParser = require("body-parser"); // middleware for parsing HTTP body
const app = express();
const { ObjectID } = require("mongodb");
const User = require("./models/user.js");
const Restaurant = require("./models/Restaurant.js");
const MenuItem = require("./models/MenuItem.js");

/* Use statements for the server */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./mongoose").connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" }
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

  user
    .save()
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
    operationHour: req.body.hours,
    owner: req.body.owner
  });
  restaurant
    .save()
    .then(restaurant => {
      res.send("restaurant " + restaurant.name + " saved to database");
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});

app.post("/restaurant/updateRestaurant", (req, res) => {
  Restaurant.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
    Cuisine: req.body.cuisine,
    operationHour: req.body.hours
  })
    .then(restaurant => {
      res.send("restaurant " + restaurant.name + " updated to database");
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});

app.post("/restaurant/newMenuItem", (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price.value,
    ingredients: req.body.ingredients.value,
    calories: req.body.calories.value,
    restaurant: "WHAt"
  });
  menuItem
    .save()
    .then(menuItem => {
      res.send("menuItem " + menuItem.name + " saved to database");
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
  // return new Promise((resolve, reject) => {
  //
  // });
});

app.post("/restaurant/findRestaurantByOwner", (req, res) => {
  Restaurant.find({ owner: req.body.owner }).then(
    restaurant => {
      console.log(restaurant);
      res.send(restaurant);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
  // return new Promise((resolve, reject) => {
  //
  // });
});

app.post("/restaurant/findEmployeesByRestaurant", (req, res) => {
  const restaurant_id = req.body.restaurant_id;
  console.log("restaurant_id:   --- ", restaurant_id);
  User.find({ workFor: restaurant_id }).then(
    users => {
      res.send(users);
    },
    error => {
      res.send({ code: 404, error });
    }
  );

  // return new Promise((resolve, reject) => {
  //
  // });
});

app.post("/restaurant/updateDressCode", (req, res) => {
  Restaurant.findByIdAndUpdate(req.body._id, {
    DressCode: req.body.dressCode
  }).then(
    user => {
      res.send(user);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});

app.post("/restaurant/add_employee", (req, res) => {
  // res.send("1000");
  const username = req.body.username;
  const restaurant_id = req.body.restaurant_id;
  console.log("username:", username);
  if (username && restaurant_id) {
    User.findOneAndUpdate(
      { username: username },
      { workFor: restaurant_id }
    ).then(user => {});
  }
});

app.post("/restaurant/delete_employee", (req, res) => {
  // const restaurant_id = req.body.restaurant_id;
  const user_id = req.body.user_id;
  console.log("\n\n\n/restaurant/delete_employee\n\n\n");
  if (user_id) {
    User.findByIdAndUpdate(user_id, { workFor: "" }, (err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log("user deleted from restaurant");
      console.log(user);
      res.send(user);
    });
  }
});

app.post("/restaurant/findRestaurant", (req, res) => {
  Restaurant.find({ _id: req.body._id }).then(
    user => {
      res.send(user);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
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
  waitlist
    .save()
    .then(waitlist => {
      res.send("waitlist" + waitlist.name + " saved to database");
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, error });
    });
});

app.post("/waitlist/getWaitlist", (req, res) => {
  Waitlist.find().then(
    waitlist => {
      res.send(waitlist);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
  // return new Promise((resolve, reject) => {
  //
  // });
});

app.get("/api/users", (req, res) => {
  User.find({}, function(err, users) {
    if (err) {
      log(err);
      return err;
    }

    res.send(users);
  });
});

app.get("/api/restaurants", (req, res) => {
  Restaurant.find({}, function(err, restaurants) {
    if (err) {
      log(err);
      return err;
    }
    res.send(restaurants);
  });
});

app.get("/api/empolyee/:id", (req, res) => {
  const empolyee_id = req.params.id
  User.find({_id:ObjectID(empolyee_id)}, function(err, single_user) {
    if (err){
      console.log(err)
      return err
    }
    res.send(single_user)
  })
})

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.send("User " + id + " deleted.");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

app.delete("/api/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id)
    .then(() => {
      res.send("Restaurant " + id + " deleted.");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

app.delete("/api/removeWaitlist/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Waitlist.findByIdAndDelete(id)
    .then(() => {
      res.send("Waitlist " + id + " deleted");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

app.get("/user/info", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json("Err " + error));
});

// update the information of the user specified by the id.
app.put("/user/:id", (req, res) => {
  log("this body is: " + req.body.email);
  log("this body is: " + req.body.password);
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, todo) => {
      if (err) {
        return res.status(500).send(err);
      }

      console.log(todo);
      return res.send(todo);
    }
  );
});

app.put("/updateWaitlist/:id", (req, res) => {
  Waitlist.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.send("Waitlist " + id + " updated");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log("Listening on port 5000...");
});
