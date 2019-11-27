'use strict';
const log = console.log;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const {MongoClient, ObjectID} = require('mongodb');
// Todo: Jiatao
const TableSchema = new Schema({
    rest_id:{
        type: String,
        required: true
    },
    table_occupied:{
        type: Boolean,
        required: false,
        default: false
    },
    table_capacity:{
        type: Number,
        required: false,
        default: 2
    },
    name:{
        type:String,
        required: false,
        default: "Table"
    }
    
});


module.exports = mongoose.model("Table", TableSchema);