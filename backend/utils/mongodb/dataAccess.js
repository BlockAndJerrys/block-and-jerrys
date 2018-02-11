/*
   dataAccess.js - mongodb connection and methods via Mongoose
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const mongoose = require('mongoose');

const { ConeCounter } = require('./models/coneCounter');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {

});

/**
 * Increment cone counter.
 * @param {Amount} amt
 * @returns {Promise} - Returns {Cone Count}.
 */

async function incrementConeCounter(amt) {
  await ConeCounter.findOneAndUpdate({ id: 1 }, { $inc: { count: amt } });
}

/**
 * Get cone count.
 * @returns {Promise} - Returns {Cone Count}.
 */

async function getConeCount() {
  const resp = await ConeCounter.findOne({ id: 1 });
  return resp;
}

module.exports = {
  incrementConeCounter,
  getConeCount,
};
