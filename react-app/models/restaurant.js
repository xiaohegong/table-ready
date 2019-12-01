const log = console.log;
const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;
// const TypeId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { MongoClient, ObjectID } = require("mongodb");
const MenuItem = require("./MenuItem.js");
const Table = require("./table.js");
const User = require("./user.js");

const RestaurantSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
    minlength: 3
  },
  location: {
    type: String,
    required: false,
    default: ""
  },
  phoneNumber: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    default: "/images/restaurant_images/restaurant2.jpeg"
  },
  Rating: {
    type: Number,
    required: true,
    default: 0
  },
  cuisine: {
    type: String,
    required: false,
    default: ""
  },
  DressCode: {
    type: String,
    required: true,
    default: "you do not have a dress code yet"
  },
  operationHour: {
    type: String,
    required: false
  },
  reservations: {
    type: Array,
    required: false,
    default: []
  },
  waitlists: {
    type: Array,
    required: false,
    default: []
  }
});

RestaurantSchema.pre('remove', { document: true },function (next) {
  console.log(User)
  const restaurant_id = this._id;
  console.log("rest_id",restaurant_id);
  MenuItem.deleteMany(
    {restaurant:restaurant_id}).then(
    res => {
      console.log("deleted",res)
    },
    error => {
      console.log("FAILED", error)
    }
  );
  Table.deleteMany(
    {rest_id:restaurant_id}).then(
    res => {
      console.log("deleted",res)
    },
    error => {
      console.log("FAILED", error)
    }
  );
  User.update({ workFor:restaurant_id},
    {$set:{workFor: ""}
  }).then(
    res =>{
      console.log(res)
    }

  ).catch(error =>{
    console.log(error)
  });
  next();
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
