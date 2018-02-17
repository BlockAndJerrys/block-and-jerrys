/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
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

let coneCount = 0;
io.on('connection', async (socket) => {
  const menu = await Icecream.findAll();
  socket.emit('INIT', { coneCount, menu });
  socket.on('GENERATE_INVOICE', (order) => {
    console.log('SERVER GEN INVOICE', order);
  });
});

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  (async () => {
    coneCount = (await OrderIcecream.findAll()).length;
    console.log('coneCount', coneCount);
  })();
});
