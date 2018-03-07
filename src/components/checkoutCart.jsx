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
import {
  // Router,
  // Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

const CheckoutCart = ({ payreq, cartTotal }) => {
  return (
  <Paper zDepth={3} style={{display: 'flex', flexDirection: 'column', color: 'white', backgroundColor: '#61a8f5'}} >
    <h1 style={{textAlign: 'center'}}>PAY with BITCOIN</h1>
    <div style={{textAlign: 'center', padding: '20px', fontSize: '12pt'}}>
      ${cartTotal}<br />
    </div>
    <div style={{textAlign: 'center'}}>
      {"SCAN THIS INVOICE WITH YOUR LN-ENABLED WALLET"}
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px'}}>
      <div style={{backgroundColor: 'white', padding: '15px'}}>
        <QRCode value={payreq} />
      </div>
    </div>
    <div style={{textAlign: 'center'}}>
      {"COPY AND PASTE THIS PAY REQUEST INTO YOUR LN-ENABLED WALLET"}
    </div>
    <p style={{ overflowWrap: "break-word", padding: '20px', color: 'black'}}>{payreq}</p>
    <CopyToClipboard options={{ message: payreq }} text={payreq} >
      <RaisedButton label="Copy Pay Request" secondary fullWidth />
    </CopyToClipboard>
  </Paper>
); };

const mapStateToProps = state => ({
  payreq: state.invoice,
  cartTotal: state.cartTotal,
});

export default withRouter(connect(mapStateToProps)(CheckoutCart));
