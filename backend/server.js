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
const bp = require('body-parser');

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
let btcPrice;

const payreqUserMap = {};
const call = lightning.streamInvoices();

call.on('data', async (message) => {

  const payedreq = message.payment_request;
  coneCount += payreqUserMap[payedreq].quantity;
  payreqUserMap[payedreq].socket.emit('PAID');
  io.emit('CONE_UPDATE', { coneCount });
  // client.messages.create({
  //   to: process.env.PHONE_NUMBER,
  //   from: '(207) 248-8331',
  //   body: `NEW ORDER`,
  // });
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

app.use('/dashboard/order/:orderId', async (req, res) => {
  const data = await OrderIcecream.findAll({
    where: {
      order_id: req.params.orderId,
    },
    include: [{ model: Icecream }],
  });
  res.json({ data });
});

app.use('/dashboard', bp.json(), bp.urlencoded({ extended: false }), async (req, res) => {
  if (req.body.baseball === process.env.BASEBALL) {
    const data = await Order.findAll({
    });
    res.json({ success: true, data });
  } else {
    res.json({ success: false });
    // ping us that there was an incorrect password attempt
    // log and save request data
  }
});

io.on('connection', (socket) => {
  console.log('New connect');
  socket.emit('INIT', { coneCount, cart, btcPrice });
  console.log('INIT CALLED');
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
  });
  btcPrice = await getBtcPrice();
}

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  init();
});
