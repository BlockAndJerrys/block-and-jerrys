import React from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';

import {
  Paper,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableBody,
} from 'material-ui';
import ChevronLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right';

const styles = {
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  autocomplete: {
    autocompleteContainer: { zIndex: '2' },
    input: { margin: '1.5em 0 0.5em 0', padding: '0', border: '0', borderBottom: '1px solid #f3f3f3' },
  },
};

const orderCart = ({ cart, currency, handleAdd, handleSubtract }) => {
  return (
    <Paper zDepth={0} style={styles.form}>
      <Table selectable={false} >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Flavor</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'center' }}>Quantity</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'right' }}>Total</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          {
            cart.map(item => {
              const price = currency === 'BTC' ? ((item.quantity * item.priceBtc).toFixed(6)) + ' BTC' : '$' + ((item.quantity * item.price).toFixed(2));
              return (
                <TableRow key={item.id} >
                  <TableRowColumn>
                    <Avatar
                      src={item.img_url}
                      size={30}
                      style={{ marginRight: '5px' }}
                    />
                    {item.flavor}
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleSubtract(item.id) }><ChevronLeftIcon /></span>
                      <span style={{ fontSize: '16px', marginLeft: '10px', marginRight: '10px'}}>{item.quantity}</span>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleAdd(item.id) }><ChevronRightIcon /></span>
                    </div>
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'right' }}>{price}</TableRowColumn>
                </TableRow>
            );
          })
          }
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = state => ({
  cartTotal: state.cartTotal,
  cart: state.cart,
  quantity: state.quantity,
  btcPrice: state.btcPrice,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: (id) => {
    dispatch({ type: 'ADD', id });
  },
  handleSubtract: (id) => {
    dispatch({ type: 'SUBTRACT', id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(orderCart);
