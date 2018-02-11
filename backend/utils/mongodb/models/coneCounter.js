/*
   coneCounter.js - model for cone counter
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConeCounterSchema = new Schema({
  count: Number,
  id: Number,
});

// Compile model from schema
const ConeCounter = mongoose.model('ConeCounter', ConeCounterSchema);

module.exports = {
  ConeCounter,
};
