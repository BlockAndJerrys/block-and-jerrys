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
};

const orderCart = ({ cart, currency, handleAdd, handleSubtract }) => {
  return (
    <Paper zDepth={0} style={styles.form}>
      <Table selectable={false} >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow>
            <TableHeaderColumn>Flavor</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'center' }}>Quantity</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'right' }}>Total</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          {
            cart.map(item => {
              const price = currency === 'BTC' ? ((item.quantity * item.priceBtc).toFixed(0)) + ' Satoshis' : '$' + ((item.quantity * item.price).toFixed(0));
              return (
                <TableRow key={item.id} >
                  <TableRowColumn style={{ textAlign: 'left' }}>
                    <Avatar src={item.img_logo} size={30} style={{ marginRight: '5px' }} />
                    <span className="mobile-hide">{item.flavor}</span>
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleSubtract({ id: item.id })}><ChevronLeftIcon /></span>
                      <span style={{ fontSize: '16px', marginLeft: '5px', marginRight: '5px' }}>{item.quantity}</span>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleAdd({ id: item.id })}><ChevronRightIcon /></span>
                    </div>
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'right', padding: 0 }}>{price}</TableRowColumn>
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
  cart: state.cart,
  quantity: state.quantity,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id }) => {
    dispatch({ type: 'ADD', id });
  },
  handleSubtract: ({ id }) => {
    dispatch({ type: 'SUBTRACT', id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(orderCart);
