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
  MenuItem.findByIdAndUpdate(req.params.id, { image: req.body.image }, { new: true })
    .then(restaurant => {
      if (!restaurant) {
        console.log(req.params.id)
        res.status(404).send('Restaurant not found, and cannot update');
      } else {
        res.send(restaurant);
      }
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});
router.post('/newMenuItem', (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
    ingredients: req.body.ingredients,
    calories: req.body.calories,
    restaurant: req.body.restaurant
  });
  menuItem
    .save()
    .then(menuItem => {
      res.send('menuItem ' + menuItem.name + ' saved to database');
    })
    .catch(err => {
      log(err);
      res.send({ code: 404, err });
    });
});

router.post('/findMenuByRestaurant', (req, res) => {
  const restaurant_id = req.body.restaurant_id;
  MenuItem.find({ restaurant: restaurant_id }).then(
    menus => {
      res.send(menus);
    },
    error => {
      res.send({ code: 404, error });
    }
  );
});

router.delete('/deleteMenuItem/?:id', (req, res) => {
  // const restaurant_id = req.body.restaurant_id;
  const menu_id = req.params.id;
  if (menu_id) {
    MenuItem.findByIdAndDelete(menu_id).then(
      users => {
        res.send(users);
      },
      error => {
        res.send({ code: 404, error });
      }
    );
  }
});

router.put('/EditMenuItem', (req, res) => {
  // const restaurant_id = req.body.restaurant_id;
  const id = req.body.id;
  if (id) {
    MenuItem.findByIdAndUpdate(id, {
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
      calories: req.body.calories
    }).then(
      users => {
        res.send(users);
      },
      error => {
        res.send({ code: 404, error });
      }
    );
  }
});




module.exports = router;