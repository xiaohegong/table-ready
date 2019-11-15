'use strict';
const log = console.log;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const {MongoClient, ObjectID} = require('mongodb');

// Todo: Jiatao
const MenuItemSchema = new Schema({
    restaurant:{
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    ingredients: {
        type: String,
        required: false,
        default: ""
    },
    image:{
        type:String,
        required: true,
        default:'/images/menu/burger.jpg'
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    }
});


module.exports = mongoose.model("MenuItem", MenuItemSchema);