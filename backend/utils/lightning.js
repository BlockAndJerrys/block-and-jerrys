const grpc = require('grpc');
const fs = require('fs');
const path = require('path');

const lndCert = fs.readFileSync(__dirname + '/lndConnectDocs/tls.cert');
const credentials = grpc.credentials.createSsl(lndCert);
const lnrpcDescriptor = grpc.load(__dirname + '/lndConnectDocs/rpc.proto');
const { lnrpc } = lnrpcDescriptor;

const lightning = new lnrpc.Lightning('localhost:10009', credentials);

const generateInvoice = amt =>
  new Promise((resolve, reject) => {
    lightning.addInvoice({
      memo: "Block and Jerry's Ice Cream",
      value: amt * 100000000,
    }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });

const streamInvoices = () => lightning.subscribeInvoices({});

module.exports = {
  generateInvoice,
  streamInvoices,
};
