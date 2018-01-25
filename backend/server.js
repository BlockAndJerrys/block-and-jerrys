var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var lightning = require('./utils/lightning.js');

var payreqUserMap = {};

const call = lightning.streamInvoices()

call.on('data', function(message) {
    const payedreq = message.payment_request;
    payreqUserMap[payedreq].emit("PAID");
});


call.on('end', function() {
    // The server has finished sending
    console.log("END");
});

call.on('status', function(status) {
    // Process status
    console.log("Current status: " + status);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on("GENERATE_INVOICE", async () => {
	const {payment_request} = await lightning.generateInvoice();
	payreqUserMap[payment_request] = socket;
	socket.emit("INVOICE", payment_request);
  });

});

http.listen(8081, function(){
  console.log('listening on *:8081');
});


