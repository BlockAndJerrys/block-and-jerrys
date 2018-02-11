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
