/*
   browseCart.js - shoping component with ice cream selection - view #1
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
// import CartItem from './cartItem';

export default ({
  cartTotal,
  generateInvoice,
  menu,
  quantities,
}) => (
  <Paper
    zDepth={3}
  >
    <List>
      {
        menu.map((x, i) => (
          <div key={x.flavor}>
            <ListItem
              disabled
              primaryText={`${x.flavor} x ${quantities[i]}`}
            />
            <Divider />
          </div>
        ))
      }
    </List>
    <RaisedButton
      label={`Checkout (${cartTotal} BTC)`}
      secondary
      fullWidth
      onClick={generateInvoice}
    />
  </Paper>
);
