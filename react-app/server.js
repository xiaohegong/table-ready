/* server.js*/
'use strict';

const log = console.log;
const express = require('express');
const bodyParser = require('body-parser'); // middleware for parsing HTTP body
const app = express();
const { ObjectID } = require('mongodb');
const User = require('./models/user.js');
const Restaurant = require('./models/restaurant.js');
const MenuItem = require('./models/MenuItem.js');
const Waitlist = require('./models/waitlist.js');
const path = require('path');
const config = require('config');
const cloudinary = require('cloudinary').v2;
const formData = require('express-form-data');

/* Use statements for the server */
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./mongoose').connect();

// setup cloudinary
app.use(formData.parse());
cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret')
});

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
const restaurantsRouter = require('./routes/restaurants');
app.use('/api/restaurants', restaurantsRouter);
const menuRouter = require('./routes/menu');
app.use('/api/menu', menuRouter);

app.post('/upload', (req, res) => {
  console.log(req.files);
  const values = Object.values(req.files);
  console.log(values);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises)
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err));
});


app.post('/api/upload', (req, res) => {
  console.log('change avatar route reached');
  const public_id = req.body.public_id;
  const options = {};
  if (public_id) {
    options.public_id = public_id;
  }
  const values = Object.values(req.files);
  console.log('public id: ', public_id);
  const promises = values.map(image =>
    cloudinary.uploader.upload(image.path, options)
  );

  Promise.all(promises)
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err));
});


app.post('/waitlist/CreateNewTable', (req, res) => {
  const table = new Table({
    rest_id: req.body.rest_id,
    table_occupied: req.body.table_occupied,
    table_capacity: req.body.table_capacity
  });
  table
    .save()
    .then(table => {
      res.send('table' + table.id + ' created');
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});


app.post('/restaurant/findTableByRestaurant', (req, res) => {
  const restaurant_id = req.body.restaurant_id;
  Table.find({ rest_id: restaurant_id }).then(
    table => {
      res.send(table);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});


app.post('/restaurant/deleteTableItem', (req, res) => {
  // const restaurant_id = req.body.restaurant_id;
  const table_id = req.body.table_id;
  if (table_id) {
    Table.findByIdAndDelete(table_id).then(
      table => {
        res.send(table);
      },
      error => {
        res.send({ code: 404, error });
      }
    );
  }
});







app.post('/restaurant/updateReservation', (req, res) => {
  Restaurant.findByIdAndUpdate(req.body._id, {
    reservations: req.body.reservations
  }).then(
    user => {
      res.send(user);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});
app.post('/updateWaitlistStatus', (req, res) => {
  Waitlist.findByIdAndUpdate(req.body._id, {
    reserved: req.body.reserved
  }).then(
    user => {
      res.send(user);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});

app.post('/restaurant/add_employee', (req, res) => {
  // res.send("1000");
  const username = req.body.username;
  const restaurant_id = req.body.restaurant_id;
  if (username && restaurant_id) {
    User.findOneAndUpdate(
      { username: username },
      { workFor: restaurant_id }
      //{ $addToSet: { restaurantInvitation: restaurant_id } }
    ).then(user => {
      res.send(user);
    });
  }
});


app.delete('/waitlist/DeleteTableByID', (req, res) => {
  const id = req.body.id;
  Table.findByIdAndDelete(id)
    .then(res => console.log(res))
    .catch(err => console.log(err));
});
app.put('/waitlist/ModifyTableStatus', (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  Table.findByIdAndUpdate(id, { table_occupied: status })
    .then(res => console.log(res))
    .catch(err => console.log(err));
});




// app.post("/restaurant/")

app.post('/waitlist/newWaitlist', (req, res) => {
  const waitlist = new Waitlist({
    id: req.body.id,
    name: req.body.name,
    people: req.body.people,
    type: req.body.type,
    date_of_arrival: req.body.date_of_arrival,
    estimated_time: req.body.estimated_time
  });
  waitlist
    .save()
    .then(waitlist => {
      res.send(waitlist._id);
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});

app.post('/waitlist/getWaitlist', (req, res) => {
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

app.post('/waitlist/getWaitlistById', (req, res) => {
  Waitlist.find({ _id: req.body._id }).then(
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



app.post('/waitlist/GetTableForRestaurant', (req, res) => {
  Table.find({ rest_id: req.body.rest_id })
    .then(table => {
      res.send(table);
    })
    .catch(err => console.log(err));
});



app.delete('/api/removeWaitlist/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Waitlist.findByIdAndDelete(id)
    .then(() => {
      res.send('Waitlist ' + id + ' deleted');
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});




// update the information of the user specified by the id.


app.put('/updateWaitlist/:id', (req, res) => {
  Waitlist.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.send('Waitlist ' + id + ' updated');
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log('Listening on port 5000...');
});
