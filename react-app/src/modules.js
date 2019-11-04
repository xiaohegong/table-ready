'use strict';
const log = console.log;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ObjectId = mongoose.Schema.Types.ObjectId;
const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const {MongoClient, ObjectID} = require('mongodb');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },


    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});
const Users = mongoose.model("User", UserSchema);


module.exports = {Users};