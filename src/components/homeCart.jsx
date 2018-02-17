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
import menu from '../utils/menu';

const HomeCart = ({ quantities, cartTotal }) => (
  <Paper zDepth={3} >
    <List>
      {menu.map((x, i) => {
        const len = quantities[i];
        let rightIcon;
        if (len === 0) {
          rightIcon = <Sad key={Math.random()} color="red" />;
        } else {
          let arr = new Array(len).fill(null);
          arr = arr.map(() => Math.random());
          rightIcon = (
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '75%' }}>
              {arr.map(j => <Happy key={j} color="green" />)}
            </div>
          );
        }
        return (
          <div key={x.flavor} >
            <ListItem disabled rightIcon={rightIcon} primaryText={`${x.flavor} x ${quantities[i]}`} />
            <Divider />
          </div>
        );
        })}
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
