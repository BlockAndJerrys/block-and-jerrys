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
 * @param {time, name, address, phone, invoice} time, name, loccation, phone, invoice
 * @returns {Promise} - Returns {Order}.
 */

async function addOrder(time, name, address, phone, invoice) {
  const resp = await Order.create({
    time,
    name,
    address,
    phone,
    invoice,
    paid: false,
  });
  return resp;
}

/**
 * Get order.
 * @param {invoice} invoice
 * @returns {Promise} - Returns {Order}.
 */

async function getOrder(invoice) {
  const resp = await Order.findOne({ invoice });
  return resp;
}

/**
 * Delete order.
 * @param {invoice} invoice
 * @returns {Promise} - Returns {Order}.
 */

async function deleteOrder(invoice) {
  const resp = await Order.findOne({ invoice }).remove().exec();
  return resp;
}

/**
 * Set order as paid.
 * @param {invoice} invoice
 * @returns {Promise} - Returns {Order}.
 */

async function orderPaid(invoice) {
  const resp = await Order.findOneAndUpdate({ invoice }, { paid: true });
  return resp;
}

// db exported strictly for testing purposes
// otherwise all db actions reside here
module.exports = {
  addOrder,
  getOrder,
  deleteOrder,
  orderPaid,
  db,
};
