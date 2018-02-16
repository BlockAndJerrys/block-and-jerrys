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
// import Icecream from './icecream';
import ConeCounter from './coneCounter';
import Cart from './cart';
import menu from '../utils/menu';

import {
  Grid,
  Row,
  Col,
  // Clearfix,
  Button,
  Image,
} from 'react-bootstrap';

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
    // socket = ioClient('localhost:5000');
    //
    // socket.on('INVOICE', (payreq) => {
    //   this.setState({ payreq });
    // });
    //
    // socket.on('PAID', () => {
    //   this.setState({ paid: true });
    // });
    //
    // socket.on('CONE', (count) => {
    //   this.setState({ coneCount: count });
    // });
  }

  addItemToCart(price, i) {
    const temp = this.state.quantities.slice();
    temp[i] += 1;
    this.setState({
      quantities: temp,
      artTotal: (parseFloat(this.state.cartTotal) + parseFloat(price)).toFixed(6),
    });
  }

  generateInvoice() {
    // socket.emit('GENERATE_INVOICE', this.state.cartTotal, this.state.quantities.reduce((x, y) => x + y));
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
      <Grid id='grid'>
        <Row>
          <Col xs={1} style={{ backgroundColor: 'white' }}>
            <Image responsive rounded src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
          </Col>
          <Col xsOffset={9} xs={2} style={{ backgroundColor: 'white' }}>
            <ConeCounter totalcones={this.state.coneCount} />
          </Col>
        </Row>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Image responsive rounded src={logo} alt="LND logo" />
          </Col>
        </Row>
        <Row style={{marginTop: '2em'}}>
          <Col xs={4} xsOffset={4}>
            <Cart
              cartTotal={this.state.cartTotal}
              restart={this.restart}
              generateInvoice={this.generateInvoice}
              payreq={this.state.payreq}
              paid={this.state.paid}
              menu={menu}
              quantities={this.state.quantities}
            />
          </Col>
        </Row>
        <Row>
          {
            this.state.payreq ? null :
            menu.map(x => (
              <Col key={x.price}
                xs={8} xsOffset={2}
                sm={6} smOffset={0}
                md={3} mdOffset={0}
                style={styles.cone}
              >
                <Image src={x.img_url} />
                <p>{x.flavor}</p>
                <p>{x.price}</p>
                <Button onClick={this.addItemToCart}>Add Item To Cart</Button>
              </Col>
            ))
          }
        </Row>
      </Grid>
    );
  }
}

const styles = {
  cone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
    marginTop: '2em',
  },
};


export default App;
