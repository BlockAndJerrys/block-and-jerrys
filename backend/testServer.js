/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const data = require('./utils/mongodb/dataAccess');

let coneCounter;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

io.on('connection', (socket) => {
  socket.emit('CONE', coneCounter);
  socket.on('GENERATE_INVOICE', async (price, quantity, name, address, phone) => {
    const timeNow = new Date();
    const payreq = 'this is a testinvoice'+timeNow.getTime();
    await data.addOrder(
      timeNow, // time
      name, // name
      address, // address
      phone, // phone
      payreq, // invoice
      quantity,
    );

    socket.emit('INVOICE', payreq);

    setTimeout(async () => {
      await data.orderPaid(payreq);
      socket.emit('PAID');
      coneCounter += quantity;
      io.emit('CONE', coneCounter);
    }, 2000);
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
