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

import React from 'react';
import {
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';

import RaisedButton from 'material-ui/RaisedButton';
import { GridTile, GridList } from 'material-ui/GridList';

import { connect } from 'react-redux';

import '../styles/App.css';
import logo from '../assets/logo.svg';
import Cart from './cart';
import menu from '../utils/menu';

const styles = {
  gridList: {
    display: 'flex',
    flexFlow: 'row nowrap',
    overflowX: 'auto',
    marginTop: '1.5em',
  },
  titleBackground: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
};

const App = ({ coneCounter, handleAdd }) => (
  <Grid>
    <Row>
      <Col xs={1} style={{ backgroundColor: 'white' }}>
        <a href="http://dev.lightning.community/" target="_blank" rel="noopener noreferrer">
          <Image responsive rounded src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
        </a>
      </Col>
      <Col xs={4} xsOffset={3}>
        <Image responsive rounded src={logo} alt="LND logo" />
      </Col>
      <Col xsOffset={2} xs={2} style={{ backgroundColor: 'white' }}>
        Total Cones Bought: <b>{coneCounter}</b>
      </Col>
    </Row>
    <Row style={{ marginTop: '2em' }}>
      <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
        <Cart />
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
            titleBackground={styles.titleBackground}
            children={<img src={x.img_url} alt={x.flavor} />}
            actionIcon={
              <RaisedButton
                onClick={() => handleAdd({ price: x.price, i })}
                label="Add to Cart"
                fullWidth
                secondary
              />
            }
            title={x.flavor}
            subtitle={`${x.price} BTC`}
          />
        ))}
      </GridList>
    </Row>
  </Grid>
);

const mapStateToProps = state => ({
  coneCounter: state.coneCounter,
  quantities: state.quantities,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ i, price }) => {
    dispatch({ type: 'ADD_ITEM', i, price });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
