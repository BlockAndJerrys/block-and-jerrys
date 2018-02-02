import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default ({cartTotal, generateInvoice}) => (
  <Paper
    className={"cart_container"}
    zDepth={3}
    >
    <p>Cart: {cartTotal} BTC</p>
    <RaisedButton
      label="Checkout"
      primary={true}
      fullWidth={true}
      onClick={generateInvoice}
      />
    </Paper>
);
