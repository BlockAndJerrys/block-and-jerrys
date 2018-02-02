import React from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default ({flavor, quantity, price}) => (
  <div className="cartitem">
    <p className="cartitem_title"><strong>{flavor}</strong> x {quantity}</p>
  </div>
);
