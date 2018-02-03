import React from 'react';

export default ({ flavor, quantity }) => (
  <div className="cartitem">
    <p className="cartitem_title"><strong>{flavor}</strong> x {quantity}</p>
  </div>
);
