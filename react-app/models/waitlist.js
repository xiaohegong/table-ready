'use strict';
const log = console.log;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const {MongoClient, ObjectID} = require('mongodb');
// Todo: Jiatao
const WaitlistSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    people:{
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    reserved:{
        type: Boolean,
        required: false,
        default: false
    }
});


module.exports = mongoose.model("Waitlist", WaitlistSchema);