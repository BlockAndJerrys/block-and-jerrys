/*
   coneCounter.js - model for cone counter
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
    unique: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
});

// Compile model from schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
  Order,
};
