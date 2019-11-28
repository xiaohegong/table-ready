// 'use strict';
// const log = console.log;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// const {MongoClient, ObjectID} = require('mongodb');
const Restaurant = require('./restaurant.js');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  accountType: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  workFor: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: true,
    default: '/images/avatar_sample.png'
  },
  restaurantInvitation:{
    type:Array,
    default: []
  },
  restaurantInvitation:{
    type:Array,
    default: []
  },
  email: String,
  tel: String
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified('password')) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.pre('remove', function(next) {
  const userID = this._id;
  console.log('USER DELETE');
  Restaurant.find({ owner: userID }).then(
    res => {
      res.forEach(re => {
        re.remove();
        console.log(re.name);
      });
    },
    error => {
      console.log('FAILED', error);
    }
  );
  next();
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
  const User = this; // binds this to the User model

  // First find the user by their email
  return User.findOne({ username: username }).then(user => {
    if (!user) {
      return Promise.reject("User doesn't exist"); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject('Password incorrect');
        }
      });
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
