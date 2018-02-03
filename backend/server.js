const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

let coneCounter = 0;
const lightning = require('./utils/lightning.js');

const payreqUserMap = {};

const call = lightning.streamInvoices();

call.on('data', (message) => {
  const payedreq = message.payment_request;
  payreqUserMap[payedreq].socket.emit('PAID');
  coneCounter += payreqUserMap[payedreq].cones;
  io.emit('CONE', coneCounter);
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('GENERATE_INVOICE', (price, cones) => {
    lightning.generateInvoice(price)
      .then((resp) => {
        const paymentRequest = resp.payment_request;
        payreqUserMap[paymentRequest] = { socket, cones };
        socket.emit('INVOICE', paymentRequest);
      }).catch(err => socket.emit('ERROR', err));
  });
});

http.listen(8081, () => {

});
