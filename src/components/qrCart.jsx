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

const qrCart = ({ invoice, cartTotal, btcPrice, quantity }) => {
  const coneMsg = quantity === 1 ? '1 cone' : `${quantity} cones`;
  const primaryText = `${coneMsg}: $${cartTotal} ~ ${(cartTotal / btcPrice).toFixed(6)} BTC`;
  return (
    <Paper zDepth={3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <div style={{ display: 'flex', padding: '1em' }} >
        <QRCode value={invoice} />
        <div style={{ marginLeft: '1em', overflowWrap: 'break-word', width: '75%' }}>
          {primaryText} <br />
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
};

const mapStateToProps = state => ({
  invoice: state.invoice,
  cartTotal: state.cartTotal,
  btcPrice: state.btcPrice,
  quantity: state.quantity,
});

export default connect(mapStateToProps)(qrCart);
