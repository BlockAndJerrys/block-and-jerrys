import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CartItem from './cartItem';


export default ({
  cartTotal,
  generateInvoice,
  menu,
  quantities,
}) => (
  <Paper
    className="cart_container"
    zDepth={3}
  >
    <div className="cartitem_container">
      {
        menu.map((x, i) => (
          <CartItem
            key={x.price}
            img_url={x.img_url}
            flavor={x.flavor}
            price={x.price}
            quantity={quantities[i]}
          />
        ))
      }
    </div>
    <RaisedButton
      label={`Checkout ( ${cartTotal} BTC)`}
      primary
      fullWidth
      onClick={generateInvoice}
    />
  </Paper>
);
