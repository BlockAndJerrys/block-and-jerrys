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
import { connect } from 'react-redux';

const qrCart = ({ invoice, cartTotal }) => (
  <Paper zDepth={3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
    <div style={{ display: 'flex', padding: '1em' }} >
      <QRCode value={invoice} />
      <div style={{ marginLeft: '1em', overflowWrap: 'break-word', width: '75%' }}>
        ${cartTotal} USD <br />
        {invoice}
      </div>
    </div>
    <div>
      <CopyToClipboard options={{ message: invoice }} text={invoice} >
        <RaisedButton label="Copy" secondary fullWidth />
      </CopyToClipboard>
    </div>
  </Paper>
);

const mapStateToProps = state => ({
  invoice: state.invoice,
  cartTotal: state.cartTotal,
});

export default connect(mapStateToProps)(qrCart);
