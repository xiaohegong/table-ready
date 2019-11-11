'use strict';
const log = console.log;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const {MongoClient, ObjectID} = require('mongodb');
// Todo: Jiatao
const TableSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    table_occupied:{
        type: Boolean,
        required: true,
        default: false
    },
    table_capacity:{
        type: Number,
        required: true
    }
    
});


module.exports = mongoose.model("Table", TableSchema);