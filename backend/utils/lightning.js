/*
   lightning.js - lightning network utils for interacting with LND
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys

   To learn more about LND: http://dev.lightning.community/
*/

const grpc = require('grpc');
const fs = require('fs');
const path = require('path');

const lndCert = fs.readFileSync(__dirname + '/lndConnectDocs/tls.cert');
const credentials = grpc.credentials.createSsl(lndCert);
const lnrpcDescriptor = grpc.load(__dirname + '/lndConnectDocs/rpc.proto');
const { lnrpc } = lnrpcDescriptor;

const lightning = new lnrpc.Lightning('localhost:10009', credentials);

/**
 * Generate an invoice.
 * @param {Amount} amt
 * @returns {Promise} - Returns {Pay Request}.
 */

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

/**
 * Subscribe to invoices.
 * @returns {Streaming RPC}
 */

const streamInvoices = () => lightning.subscribeInvoices({});

module.exports = {
  generateInvoice,
  streamInvoices,
};
