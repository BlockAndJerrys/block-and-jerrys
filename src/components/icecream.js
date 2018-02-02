import React from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default ({img_url, flavor, price, handleClick}) => (
  <Paper
    className="icecream_container"
    zDepth={3} >
      <img className="tree_img" src={img_url} alt={flavor}></img>
      <h1>{flavor}</h1>
      <p>{price} BTC</p>
      <RaisedButton
        label="Add to Cart"
        primary={true}
        fullWidth={true}
        onClick={handleClick}/>
  </Paper>
);
