import React from 'react';
import {
  Router,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import HomeCart from './homeCart';
import InfoCart from './infoCart';
import QRCart from './qrCart';
import Paid from './paidCart';
import history from '../history';

const Cart = ({ socket, handleInvoice, handleInit, handleConeUpdate }) => {
  socket.on('INVOICE', ({ invoice }) => {
    handleInvoice({ invoice });
    history.push('/qr');
  });

  socket.on('PAID', () => {
    console.log('CLIENT PAID');
    history.push('/paid');
  });

  socket.on('INIT', ({ coneCount, cart, btcPrice }) => {
    handleInit({ coneCount, cart, btcPrice });
  });

  socket.on('CONE_UPDATE', ({ coneCount }) => {
    handleConeUpdate({ coneCount });
  });

  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={HomeCart} />
        <Route path="/checkout" component={InfoCart} />
        <Route path="/qr" component={QRCart} />
        <Route path="/paid" component={Paid} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  socket: state.socket,
  quantities: state.quantities,
});

const mapDispatchToProps = dispatch => ({
  handleInvoice: ({ invoice }) => {
    dispatch({ type: 'RECEIVED_INVOICE', invoice });
  },
  handleInit: ({ coneCount, cart, btcPrice }) => {
    dispatch({ type: 'INIT', coneCount, cart, btcPrice });
  },
  handleConeUpdate: ({ coneCount }) => {
    dispatch({ type: 'CONE_UPDATE', coneCount });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
