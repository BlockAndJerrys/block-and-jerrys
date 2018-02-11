/*
   cartItem.js - individual item components for for display in the cart
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';

export default ({ flavor, quantity }) => (
  <div className="cartitem">
    <p className="cartitem_title"><strong>{flavor}</strong> x {quantity}</p>
  </div>
);
