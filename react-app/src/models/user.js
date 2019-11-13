// 'use strict';
// const log = console.log;
const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// const {MongoClient, ObjectID} = require('mongodb');

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
    required: true,
    default: ""
  },
  image: {
    type: String,
    required: true,
    default: "/images/avatar_sample.png"
  },
  email: String,
  tel: String,
});

module.exports = mongoose.model("User", UserSchema);
