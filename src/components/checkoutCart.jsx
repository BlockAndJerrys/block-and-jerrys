/*
   checkoutCart.js - displays the invoice -- both QR and copyable plaintext
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import {
  RaisedButton,
  Paper,
} from 'material-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

export default ({ payreq, cartTotal }) => (
  <Paper zDepth={3} >
    {cartTotal} BTC
    <QRCode value={payreq} />
    <p>{payreq}</p>
    <CopyToClipboard options={{ message: payreq }} text={payreq} >
      <RaisedButton label="Copy" primary fullWidth />
    </CopyToClipboard>
  </Paper>
);
