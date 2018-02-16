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

import {
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';

import RaisedButton from 'material-ui/RaisedButton';
import { GridTile, GridList } from 'material-ui/GridList';

import '../styles/App.css';
import logo from '../assets/logo.svg';
import ConeCounter from './coneCounter';
import Cart from './cart';
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
      forms: false,
    };
    this.restart = this.restart.bind(this);
    this.generateInvoice = this.generateInvoice.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.showForms = this.showForms.bind(this);
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

  showForms() {
    this.setState({ forms: true });
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
    this.setState({ payreq: '123' });
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
      <Grid>
        <Row>
          <Col xs={1} style={{ backgroundColor: 'white' }}>
            <Image responsive rounded src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
          </Col>
          <Col xs={4} xsOffset={3}>
            <Image responsive rounded src={logo} alt="LND logo" />
          </Col>
          <Col xsOffset={2} xs={2} style={{ backgroundColor: 'white' }}>
            <ConeCounter totalcones={this.state.coneCount} />
          </Col>
        </Row>
        <Row style={{ marginTop: '2em' }}>
          <Col xs={4} xsOffset={4}>
            <Cart
              cartTotal={this.state.cartTotal}
              restart={this.restart}
              generateInvoice={this.generateInvoice}
              payreq={this.state.payreq}
              paid={this.state.paid}
              menu={menu}
              quantities={this.state.quantities}
              showForms={this.showForms}
              forms={this.state.forms}
            />
          </Col>
        </Row>
        <Row>
          <GridList
            cellHeight="auto"
            style={styles.gridList}
          >
            {menu.map((x, i) => (
              <GridTile
                key={x.price}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                children={<img src={x.img_url} />}
                actionIcon={
                  <RaisedButton
                    onClick={() => this.addItemToCart(x.price, i)}
                    label="Add to Cart"
                    fullWidth
                    secondary
                  />
                }
                title={x.flavor}
                subtitle={x.price + ' BTC'}
              />
            ))}
          </GridList>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  gridList: {
    display: 'flex',
    flexFlow: 'row nowrap',
    overflowX: 'auto',
    marginTop: '1.5em',
  },
};


export default App;
