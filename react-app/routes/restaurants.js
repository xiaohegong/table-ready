const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { isAuth, isSuperAdmin } = require('../middleware/auth');
const { ObjectID } = require('mongodb');
const Restaurant = require('../models/restaurant');
const Waitlist = require('../models/waitlist')
const Table = require('../models/table')

router.get('/test', (req, res) => {
  res.send('now on restaurants route');
});

router.get('/', (req, res) => {
  Restaurant.find({}, function(err, restaurants) {
    if (err) {
      log(err);
      return err;
    }
    res.send(restaurants);
  });
});

router.patch('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send('id not valid');
  }
  console.log(req.body);
  Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(restaurant => {
      if (!restaurant) {
        res.status(404).send('Restaurant not found, and cannot update');
      } else {
        res.send(restaurant);
      }
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then(rest => {
      rest.remove();
      res.send('res ' + id + ' deleted.');
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

router.post('/newRestaurant', (req, res) => {
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
      res.send('restaurant ' + restaurant.name + ' saved to database');
      for (let i = 0; i < req.body.tables; i++) {
        let table = new Table({
          rest_id: restaurant._id
        });
        table.save().catch(err => {
          log(err);
        });
      }
      res.send('restaurant ' + restaurant.name + ' saved to database');
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});



router.post('/updateRestaurant', (req, res) => {
  Restaurant.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
    Cuisine: req.body.cuisine,
    operationHour: req.body.hours
  })
    .then(restaurant => {
      res.send('restaurant ' + restaurant.name + ' updated to database');
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});

router.post('/findRestaurantByOwner', (req, res) => {
  Restaurant.find({ owner: req.body.owner }).then(
    restaurant => {
      console.log(restaurant);
      res.send(restaurant);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});

router.post('/updateDressCode', (req, res) => {
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

router.post('/findRestaurant', (req, res) => {
  Restaurant.find({ _id: req.body._id }).then(
    user => {
      const num_reserv = user[0].reservations;
      let tmp = [];
      num_reserv.forEach(element => {
        tmp.push(element);
      });
      Waitlist.find({
        _id: { $in: tmp }
      })
        .then(docs => {
          res.send([docs, user]);
          console.log(docs);
        })
        .catch(error => console.log(error));
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});

router.post('/findRestaurantById', (req, res) => {
  Restaurant.findById(req.body._id)
    .then(restaurant => {
      console.log(restaurant);
      res.send(restaurant);
    })
    .catch(err => {
      if (err) {
        res.send({ code: 404, err });
      }
    });
});



module.exports = router;
