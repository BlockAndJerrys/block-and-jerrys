/*
   checkoutCart.js - displays the invoice -- both QR and copyable plaintext
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

export default ({ payreq, cartTotal }) => (
  <Paper
    className="invoice_container"
    style={{ backgroundColor: 'black' }}
    zDepth={3}
  >
    <div className="checkout_header">
      {cartTotal} <span className="bitcoin_sub">BTC</span>
    </div>
    <div className="checkout_body">
      <div className="qr_code_container">
        <div className="qr_code">
          <QRCode value={payreq} />
        </div>
      </div>
      <p className="invoice">{payreq}</p>
      <CopyToClipboard
        options={{ message: payreq }}
        text={payreq}
      >
        <RaisedButton
          label="Copy"
          primary
          fullWidth
        />
      </CopyToClipboard>
    </div>
  </Paper>
);
