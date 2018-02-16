/*
   coneCounter.js - model for cone counter
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  time: Date,
  name: String,
  location: String,
  phone: String,
});

// Compile model from schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
  Order,
};
