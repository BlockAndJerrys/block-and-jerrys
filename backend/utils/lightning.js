const grpc = require('grpc');
const fs = require('fs');
const path = require('path');
const lndCert = fs.readFileSync("./lndConnectDocs/tls.cert");
const credentials = grpc.credentials.createSsl(lndCert);
const lnrpcDescriptor = grpc.load("./lndConnectDocs/rpc.proto");
const lnrpc = lnrpcDescriptor.lnrpc;
const lightning = new lnrpc.Lightning('localhost:10009', credentials);
const ByteBuffer = require('bytebuffer');
const bitcore = require('bitcore-lib');
const Bluebird = require('bluebird');
const BufferUtil = bitcore.util.buffer;

const generateInvoice = () => {
  return new Promise( function(resolve, reject){
    lightning.addInvoice({
		memo: "Merkle Tree",
		value: 1000,
	}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}


module.exports = {
	generateInvoice,
}

