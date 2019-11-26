const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const isAuth = require('../middleware/auth');

// register

router.post('/', (req, res) => {
  console.log(req.body);
  const { accountType, username, password, email, tel } = req.body;
  if (!accountType || !username || !email || !password || !tel) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ message: 'User already exists' });
  });
  const hour = 3600;
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      jwt.sign(
        { id: user._id },
        config.get('jwtSecret'),
        {
          expiresIn: 1 * hour
        },
        (err, token) => {
          if (err) throw err;
          user = user.toObject();
          delete user.password;
          res.json({
            token,
            user
          });
        }
      );
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

// login
router.post('/login', (req, res) => {
  const hour = 3600;
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  User.findByUsernamePassword(username, password)
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Invalid username or password' });
      } else {
        jwt.sign(
          { id: user._id },
          config.get('jwtSecret'),
          {
            expiresIn: 1 * hour
          },
          (err, token) => {
            if (err) throw err;
            user = user.toObject();
            console.log('user: ', user);

            delete user.password; // prevent sending hashed password to frontend
            console.log('user: ', user);
            res.json({
              token,
              user,
              message: 'Authenticated'
            });
          }
        );
      }
    })
    .catch(error => {
      res.status(400).json({ message: error });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: 'User ' + id + ' deleted.' });
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

// return user info without password, given it's logged in and token is provided and not expired
router.get('/auth', isAuth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
