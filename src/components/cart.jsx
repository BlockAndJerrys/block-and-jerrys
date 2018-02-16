/*
   cart.js - simplified navigation logic between the three views:
      1. browseCart
      2. checkoutCart
      3. paidCart
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

import UserInfo from './userInfo';
import Paid from './paidCart';

export default ({
  cartTotal,
  generateInvoice,
  payreq,
  paid,
  menu,
  quantities,
  restart,
  forms,
  showForms,
}) => {
  let curView;
  if (payreq && paid) {
    curView = <Paid restart={restart} />;
  } else if (payreq) { // invoice generated
    curView = (
      <Paper zDepth={3} style={{ display: 'flex', flexFlow: 'column nowrap', }}>
        <div style={{ display: 'flex', padding: '1em' }} >
          <QRCode value={payreq} />
          <div style={{ marginLeft: '1em', }}>
            {cartTotal} BTC <br />
            {payreq}
          </div>
        </div>
        <div>
          <CopyToClipboard options={{ message: payreq }} text={payreq} >
            <RaisedButton label="Copy" secondary fullWidth />
          </CopyToClipboard>
        </div>
      </Paper>
    );
  } else if (forms) {
    curView = <UserInfo generateInvoice={generateInvoice} />
  } else { // default
    curView = (
      <Paper zDepth={3} >
        <List>
          {menu.map((x, i) => (
            <div key={x.flavor}>
              <ListItem disabled primaryText={`${x.flavor} x ${quantities[i]}`} />
              <Divider />
            </div>
            ))}
        </List>
        <RaisedButton
          label={`Checkout (${cartTotal} BTC)`}
          secondary
          fullWidth
          onClick={showForms}
          /*disabled={cartTotal == 0}*/
        />
      </Paper>
    );
  }
  return (
    <div className="cart">
      {curView}
    </div>);
};
