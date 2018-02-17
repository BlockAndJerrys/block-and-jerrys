import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import menu from '../utils/menu';

const HomeCart = ({ quantities, cartTotal }) => (
  <Paper zDepth={3} >
    <List>
      {menu.map((x, i) => (
        <div key={x.flavor}>
          <ListItem disabled primaryText={`${x.flavor} x ${quantities[i]}`} />
          <Divider />
        </div>
        ))}
    </List>
    <Link to="/checkout">
      <RaisedButton
        label={`Checkout (${cartTotal} BTC)`}
        secondary
        fullWidth
        /* disabled={cartTotal == 0} */
      />
    </Link>
  </Paper>
);

const mapStateToProps = state => ({
  quantities: state.quantities,
  cartTotal: state.cartTotal,
});

export default connect(mapStateToProps)(HomeCart);
