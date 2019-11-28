const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { isAuth, isSuperAdmin } = require('../middleware/auth');
const { ObjectID } = require('mongodb');
const MenuItem = require('../models/MenuItem.js');

router.patch('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send('id not valid');
  }
  console.log(req.body);
  MenuItem.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
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

module.exports = router;