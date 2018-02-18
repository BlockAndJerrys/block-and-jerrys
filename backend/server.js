/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const data = require('./utils/mongodb/dataAccess');
const lightning = require('./utils/lightning.js');

let coneCounter;
const payreqUserMap = {};

const call = lightning.streamInvoices();

call.on('data', async (message) => {
  const payedreq = message.payment_request;
  payreqUserMap[payedreq].socket.emit('PAID');
  io.emit('CONE', coneCounter);
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
  socket.emit('CONE', coneCounter);
  socket.on('GENERATE_INVOICE', (price, quantity, name, address, phone) => {
    const timeNow = new Date();
    const invoiceData = timeNow.getTime() + name + address + phone;

    lightning.generateInvoice(price, invoiceData)
      .then(async (resp) => {
        const paymentRequest = resp.payment_request;

        await data.addOrder(
          timeNow, // time
          name, // name
          address, // address
          phone, // phone
          paymentRequest, // invoice
          quantity,
        );

        payreqUserMap[paymentRequest] = { socket, quantity };

        socket.emit('INVOICE', paymentRequest);
      }).catch(err => socket.emit('ERROR', err));
  });
});

async function init() {
  // Since this is centralized, only need to get cone count on init
  const resp = await data.getConeCount();
  coneCounter = resp;
}

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  init();
});
