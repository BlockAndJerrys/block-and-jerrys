import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Happy from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import Sad from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

const styles = {
  rightIcon: { display: 'flex', justifyContent: 'flex-end', width: '30%' },
};

const HomeCart = ({ cart, cartTotal, btcPrice }) => (
  <Paper zDepth={3} >
    <List>
      {cart.map((x) => {
        const len = x.quantity;
        let rightIcon;
        if (len === 0) {
          rightIcon = <Sad key={Math.random()} color="red" />;
        } else {
          let arr = new Array(len).fill(null);
          arr = arr.map(() => Math.random());
          rightIcon = (
            <div style={styles.rightIcon}>
              {arr.map(j => <Happy key={j} color="green" />)}
            </div>
          );
        }
        return (
          <div key={x.flavor} >
            <ListItem disabled rightIcon={rightIcon} primaryText={`${x.flavor} x ${x.quantity}`} />
            <Divider />
          </div>
        );
        })}
      <ListItem disabled primaryText={`$${cartTotal} ~ ${(cartTotal / btcPrice).toFixed(6)} BTC`} />
    </List>
    <Link to="/checkout">
      <RaisedButton
        label="Order"
        secondary
        fullWidth
        /* disabled={cartTotal == 0} */
      />
    </Link>
  </Paper>
);

const mapStateToProps = state => ({
  cartTotal: state.cartTotal,
  cart: state.cart,
  btcPrice: state.btcPrice,
});

export default connect(mapStateToProps)(HomeCart);
