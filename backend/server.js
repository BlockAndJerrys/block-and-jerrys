/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const axios = require('axios');

const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./utils/postgres');
const lightning = require('./utils/lightning.js');

async function getBtcPrice() {
  try {
    const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    return parseFloat(res.data[0].price_usd);
  } catch (err) { console.log(err); }
}

let coneCount = 0;
let cart = [];
const payreqUserMap = {};

const call = lightning.streamInvoices();

call.on('data', async (message) => {
  const payedreq = message.payment_request;
  payreqUserMap[payedreq].socket.emit('PAID');
  client.messages.create({
    to: process.env.PHONE_NUMBER,
    from: '(207) 248-8331',
    body: `NEW ORDER`,
  });
});

call.on('end', () => {
  // The server has finished sending
});

call.on('status', () => {
  // Process status
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

io.on('connection', (socket) => {
  socket.emit('INIT', { coneCount, cart });
  socket.on('GENERATE_INVOICE', async (order) => {
    const btcCartTotal = parseFloat(order.cartTotal) / (await getBtcPrice());
    const timeNow = new Date();
    const invoiceData = timeNow.getTime() + order.name + order.address + order.phone;
    const genInvoice = await lightning.generateInvoice(btcCartTotal, invoiceData);
    const invoice = genInvoice.payment_request;
    const o = await Order.create({
      name: order.name,
      address: order.address,
      phone: order.phone,
      invoice,
    });
    payreqUserMap[invoice] = { socket, quantity: order.quantity };
    socket.emit('INVOICE', { invoice });
    order.cart.forEach(x => {
      if (x.quantity > 0) {
        OrderIcecream.create({
          order_id: o.id,
          icecream_id: x.id,
          quantity: x.quantity,
        });
      }
    });
  });
});

async function init() {
  // Since this is centralized, only need to get cone count on init
  coneCount = (await OrderIcecream.findAll()).length;
  cart = await Icecream.findAll({
    order: [
      ['id', 'ASC'],
    ],
  })
}

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  init();
});
