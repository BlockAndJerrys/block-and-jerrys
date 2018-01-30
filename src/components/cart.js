import React from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default ({img_url, flavor, price}) => (
  <div className="cart">
  <Paper
    className={
      // this.state.payreq ? "invoice_container" : "cart_container"
      "cart_container"
    }
    zDepth={3} >
    {
      // this.state.payreq ? <h1>{this.state.paid ? "Thank you, come again!" : "Invoice:"}</h1> : <p>Cart: {this.state.cart} BTC</p>
      <p>Cart: {0.000012} BTC</p>
    }

            {
      //         this.state.payreq ?
      // (this.state.paid ? <div>
      // <img className="confirmation_img" src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" alt="checkmark"/><RaisedButton
      // label="Restart"
      // onClick={this.restart.bind(this)}
      // primary={true}
      // fullWidth={true}/> </div>
      // :
      // <p className="invoice">{this.state.payreq}</p>) :
            <RaisedButton
              label="Generate Invoice"
              primary={true}
              fullWidth={true}/>
            }
  </Paper>
  </div>
);
