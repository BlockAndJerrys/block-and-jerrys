/*
   App.js - Main Component
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys

   The structure of the this view is as follows:

    TOP LEFT: "Powered by LND."
    TOP RIGHT: Cone counter.
    HEADER: Block and Jerry's logo.
    CART: Varies by state.
      1. browseCart: shopping state, displays current cart
      2. checkoutCart: checkout state, displays invoice
      3. paidCart: paid state, displays paid confirmation and restart button
    BODY: Displays the ice cream selection.
*/

import React, { Component } from 'react';
import ioClient from 'socket.io-client';
import '../styles/App.css';
import logo from '../assets/logo.svg';
import Icecream from './icecream';
import Cart from './cart';
import ConeCounter from './coneCounter';
import menu from '../utils/menu';

let socket;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payreq: '',
      cartTotal: 0,
      paid: false,
      quantities: [0, 0, 0, 0],
      coneCount: 'Connecting...',
    };
    this.restart = this.restart.bind(this);
    this.generateInvoice = this.generateInvoice.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  componentDidMount() {
    socket = ioClient('localhost:5000');

    socket.on('INVOICE', (payreq) => {
      this.setState({ payreq });
    });

    socket.on('PAID', () => {
      this.setState({ paid: true });
    });

    socket.on('CONE', (count) => {
      this.setState({ coneCount: count });
    });
  }

  addItemToCart(price, i) {
    const temp = this.state.quantities.slice();
    temp[i] += 1;
    this.setState({
      quantities: temp,
      cartTotal: (parseFloat(this.state.cartTotal) + parseFloat(price)).toFixed(6),
    });
  }

  generateInvoice() {
    socket.emit('GENERATE_INVOICE', this.state.cartTotal, this.state.quantities.reduce((x, y) => x + y));
  }

  restart() {
    this.setState({
      payreq: '',
      paid: false,
      cartTotal: 0,
      quantities: [0, 0, 0, 0],
    });
  }

  render() {
    return (
      <div className="App">
        <div className="top_left_container">
          Powered By: <img className="lnd_logo_img"src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
        </div>
        <div className="top_right_container">
          <ConeCounter totalcones={this.state.coneCount} />
        </div>
        <div className="header">
          <img className="logo_img" src={logo} alt="blockandjerrys" />
        </div>
        <Cart
          cartTotal={this.state.cartTotal}
          restart={this.restart}
          generateInvoice={this.generateInvoice}
          payreq={this.state.payreq}
          paid={this.state.paid}
          menu={menu}
          quantities={this.state.quantities}
        />
        <div className="body">
          {
            this.state.payreq ? null :
            menu.map((x, i) => (
              <div key={x.price} className="menuitem">
                <Icecream
                  imgUrl={x.img_url}
                  flavor={x.flavor}
                  price={x.price}
                  handleClick={this.addItemToCart}
                  index={i}
                />
              </div>
            ))
        }
        </div>
      </div>
    );
  }
}


export default App;
