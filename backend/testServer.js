/*
   server.js - server with websockets for real time communication
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

io.on('connection', (socket) => {
  socket.on('GENERATE_INVOICE', async () => {
    const timeNow = new Date();
    const payreq = 'this is a testinvoice'+timeNow.getTime();

    socket.emit('INVOICE', {invoice: payreq});

    setTimeout(async () => {
      socket.emit('PAID');
    }, 2000);
  });
});

http.listen(5000, () => {
  console.log('SERVER RUNNING');
});
