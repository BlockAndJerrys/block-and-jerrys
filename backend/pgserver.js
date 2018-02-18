/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./utils/postgres');
const lightning = require('./utils/lightning.js');

const call = lightning.streamInvoices();
call.on('data', async (message) => {
  console.log('call.ondata', message);
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

async function getBtcPrice() {
  try {
    const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    return parseFloat(res.data[0].price_usd);
  } catch (err) { console.log(err); }
}

let coneCount = 0;
let cart = [];
io.on('connection', async (socket) => {
  socket.emit('INIT', { coneCount, cart });
  socket.on('GENERATE_INVOICE', async (order) => {
    try {
      console.log('SERVER GEN INVOICE', order);
      const btcCartTotal = parseFloat(order.cartTotal) / (await getBtcPrice());
      const genInvoice = await lightning.generateInvoice(btcCartTotal);
      const invoice = genInvoice.payment_request;
      const o = await Order.create({
        name: order.name,
        address: order.address,
        phone: order.phone,
        invoice,
      });
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
    } catch (err) { console.log('Error generating invoice', err); }
  });
});

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  (async () => {
    coneCount = (await OrderIcecream.findAll()).length;
    cart = await Icecream.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });
    // cart.forEach(x => console.log(x.get()));
    // console.log('coneCount', coneCount);
    // console.log('cart', cart);
  })();
});
