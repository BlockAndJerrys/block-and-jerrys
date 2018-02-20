/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./utils/postgres');
const lightning = require('./utils/lightning.js');
const getBtcPrice = require('./utils/getBtcPrice');
const routes = require('./utils/routes');

app.use(routes);

let coneCount = 0;
let cart = [];
let btcPrice;

const invoiceSocketMap = {};
const call = lightning.streamInvoices();

call.on('data', async (data) => {
  const invoice = data.payment_request;
  const foundOrder = await Order.findOne({ where: { invoice } });
  await foundOrder.update({ status: 'paid' });
  coneCount = await OrderIcecream.coneCount();
  invoiceSocketMap[invoice].socket.emit('PAID');
  io.emit('CONE_UPDATE', { coneCount }); // TODO: This only emits to the purchasing socket, not all sockets as would be expected
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

io.on('connection', (socket) => {
  console.log('New connect');
  socket.emit('INIT', { coneCount, cart, btcPrice });
  console.log('INIT CALLED');
  socket.on('GENERATE_INVOICE', async ({ name, address, phone, cartTotal, cartOrder }) => {
    const btcCartTotal = parseFloat(cartTotal) / (await getBtcPrice());
    const invoiceData = (new Date()).getTime() + name + address + phone;
    const genInvoice = await lightning.generateInvoice(btcCartTotal, invoiceData);
    const invoice = genInvoice.payment_request;
    const o = await Order.create({ name, address, phone, invoice });
    invoiceSocketMap[invoice] = { socket, order_id: o.id };
    socket.emit('INVOICE', { invoice });
    cartOrder.forEach(x => {
      if (x.quantity > 0) {
        OrderIcecream.create({
          order_id: o.id,
          icecream_id: x.id,
          quantity: x.quantity,
        });
      }
    });
  });
  socket.on('EMAIL', async ({ email, phone }) => {
    const foundOrder = await Order.findOne({ where: { phone } });
    await foundOrder.update({ email });
  });
});

async function init() {
  // Since this is centralized, only need to get cone count on init
  coneCount = await OrderIcecream.coneCount();
  cart = await Icecream.cart();
  btcPrice = await getBtcPrice();
}

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  init();
});
