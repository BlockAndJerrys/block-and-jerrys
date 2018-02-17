/*
   cart.js - simplified navigation logic between the three views:
      1. browseCart
      2. checkoutCart
      3. paidCart
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import HomeCart from './homeCart';
import InfoCart from './infoCart';
import QRCart from './qrCart';
import Paid from './paidCart';

const Cart = ({ socket, handleInvoice, history }) => {
  socket.on('INVOICE', (invoice) => {
    handleInvoice(invoice);
    history.push('/qr');
  });

  return (
    <Router>
      <div>
        <Route path="/" exact component={HomeCart} />
        <Route path="/checkout" exact component={InfoCart} />
        <Route path="/qr" exact component={QRCart} />
        <Route path="/paid" exact component={Paid} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  socket: state.socket,
  quantities: state.quantities,
});

const mapDispatchToProps = dispatch => ({
  handleInvoice: (invoice) => {
    dispatch({ type: 'RECEIVED_INVOICE', invoice });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
