import React from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default ({img_url, flavor, price, handleClick}) => (
  <div className="icecream_container">
    <Paper
      className="icecream_img_container"
      zDepth={3}
      style={{width: "50%", marginLeft: "25%"}}
      >
      <img className="icecream_img" src={img_url} alt={flavor} />
    </Paper>
    <div className="icecream_info_container">
      <h1 className="flavor_title">{flavor}</h1>
      <p className="price_title">{price} BTC</p>
    </div>

    <FlatButton
      label={"Add to Cart"}
      onClick={handleClick}
      backgroundColor={"black"}
      hoverColor={"#242526"}
      labelStyle={{color: "white"}}
      style={{
        width: "90%",
        marginLeft: "5%",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        border: "3px solid #ffad12",
        borderTop: "none",
      }}
      className={"button"}
      className={"button_label"}
      />
  </div>
);
