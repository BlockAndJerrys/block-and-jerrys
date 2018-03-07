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
  socket.emit('INIT', {
    cart: [
      {
        id: 1,
        img_url: 'https://imgur.com/3ANZiYa.png',
        flavor: 'Ethereum Split',
        price: 0.000012,
      },
      {
        id: 2,
        img_url: 'https://i.imgur.com/hVb71IB.png',
        flavor: 'Chunky Blocky',
        price: 0.000020,
      },
      {
        id: 3,
        img_url: 'https://imgur.com/M0AFAjA.png',
        flavor: 'Doge Food',
        price: 0.000018,
      },
    ],
    coneCount: 0,
    btcPrice: 100,
  });
  socket.on('GENERATE_INVOICE', async () => {
    const timeNow = new Date();
    const payreq = 'lntb17u1pdfexnrpp5e5r3lje5p0kun3hdqyxugtrsm4gx7kjl5v3sy5e7z55j648katnsdpzxysy2umswfjhxum0yppk76twypgxzmnwvy026l3aljsxxa70n02xm48hwmzj8cw208y63jj5vyvl6l2wf3zlhjed24euy5j3rv8ytujuzy693sykn0elf9w73lhfz8dmxrlx66vlqp25jplq';

    socket.emit('INVOICE', {invoice: payreq});

    setTimeout(async () => {
      socket.emit('PAID');
    }, 200000);
  });
});

http.listen(5000, () => {
  console.log('SERVER RUNNING');
});
