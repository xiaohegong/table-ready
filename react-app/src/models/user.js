'use strict';
const log = console.log;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const {MongoClient, ObjectID} = require('mongodb');

// Todo: Jiatao
const UserSchema = new Schema({
    username: {
        type: String,
        required: false,
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
        required: false,
        minlength: 4
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});


module.exports = mongoose.model("User", UserSchema);