/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// const data = require('./utils/mongodb/dataAccess');

const lightning = require('./utils/lightning.js');

let coneCounter;

/*
 Maps invoices to socket and cone quantity
 Thus, when app "hears" an invoice has been
 paid, it increments cone counter and tells
 socket its invoice is paid.
*/
const payreqUserMap = {};

const call = lightning.streamInvoices();

// call.on('data', async (message) => {
//   const payedreq = message.payment_request;
//   payreqUserMap[payedreq].socket.emit('PAID');
//   coneCounter += payreqUserMap[payedreq].cones;
//   await data.incrementConeCounter(payreqUserMap[payedreq].cones);
//   io.emit('CONE', coneCounter);
// });

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
  socket.on('GENERATE_INVOICE', (price, cones) => {
    lightning.generateInvoice(price)
      .then((resp) => {
        const paymentRequest = resp.payment_request;
        payreqUserMap[paymentRequest] = { socket, cones };
        console.log('SERVER GEN');
        console.log(paymentRequest);
        socket.emit('INVOICE', paymentRequest);
      }).catch(err => socket.emit('ERROR', err));
  });
});

// async function init() {
//   const resp = await data.getConeCount();
//   coneCounter = resp.count;
// }

http.listen(5000, () => {
  console.log('SERVER RUNNING');
  // init();
});
