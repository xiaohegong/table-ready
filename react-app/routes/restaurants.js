const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { isAuth, isSuperAdmin } = require('../middleware/auth');
const { ObjectID } = require('mongodb');
const Restaurant = require('../models/restaurant');

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

module.exports = router;
