const grpc = require('grpc');
const fs = require('fs');
const path = require('path');
const lndCert = fs.readFileSync(path.join(__dirname,"lndConnectDocs/tls.cert"));
const credentials = grpc.credentials.createSsl(lndCert);
const lnrpcDescriptor = grpc.load(path.join(__dirname,"lndConnectDocs/rpc.proto"));
const lnrpc = lnrpcDescriptor.lnrpc;
const lightning = new lnrpc.Lightning('localhost:10009', credentials);
const ByteBuffer = require('bytebuffer');
const bitcore = require('bitcore-lib');
const Bluebird = require('bluebird');
const BufferUtil = bitcore.util.buffer;

const generateInvoice = (amt) => {
  return new Promise( function(resolve, reject){
    lightning.addInvoice({
		memo: "Merkle Tree",
		value: amt*100000000,
	}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

const streamInvoices = () => {
   return lightning.subscribeInvoices({});
}


module.exports = {
	generateInvoice,
	streamInvoices,
}

