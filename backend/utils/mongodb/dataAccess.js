/*
   dataAccess.js - mongodb connection and methods via Mongoose
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const mongoose = require('mongoose');

const { Order } = require('./models/order');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {

});

/**
 * Add order.
 * @param {time, name, location, phone} time, name, loccation, phone
 * @returns {Promise} - Returns {Order}.
 */

async function addOrder(time, name, location, phone) {
  const resp = await Order.create({
    time,
    name,
    location,
    phone,
  });
  return resp;
}

/**
 * Get order.
 * @param {id} id
 * @returns {Promise} - Returns {Order}.
 */

async function getOrder(id) {
  const resp = await Order.findById(id);
  return resp;
}

/**
 * Delete order.
 * @param {id} id
 * @returns {Promise} - Returns {Order}.
 */

async function deleteOrder(id) {
  const resp = await Order.findById(id).remove().exec();
  return resp;
}

// db exported strictly for testing purposes
// otherwise all db actions reside here
module.exports = {
  addOrder,
  getOrder,
  deleteOrder,
  db,
};
