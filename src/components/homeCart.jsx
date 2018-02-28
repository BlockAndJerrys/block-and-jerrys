import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

import OrderCart from './orderCart';
import InfoCart from './infoCart';
import QrCart from './qrCart';

import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Exit from 'material-ui/svg-icons/content/clear';

import {
  Paper,
  TextField,
} from 'material-ui';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

/**
 * Non-linear steppers allow users to enter a multi-step flow at any point.
 *
 * This example is similar to the regular horizontal stepper, except steps are no longer
 * automatically set to `disabled={true}` based on the `activeStep` prop.
 *
 * We've used the `<StepButton>` here to demonstrate clickable step labels.
 */
class HomeCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      currency: "BTC",
    };
  }


  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <OrderCart currency={this.state.currency}/>
        );
      case 1:
        return (
          <InfoCart />
        );
      case 2:
        return (
          <QrCart />
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleCurrencyToggle = () => {
    this.setState({currency: this.state.currency === "BTC" ? "USD" : "BTC"})
  }

  render() {
    console.log(this.props);
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const price = this.state.currency === "BTC" ? ((this.props.cartTotal / this.props.btcPrice).toFixed(6))+ " BTC" : "$"+(this.props.cartTotal.toFixed(2))

    return (

      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
      <div style={{position: "absolute", left: 12, top: 12}}>
        <Exit style={{cursor: "pointer"}} onClick={this.props.handleOpenClose}/>
      </div>
      <div style={{position: "absolute", right: 12}}>
        <Toggle
          label={this.state.currency}
          onToggle={this.handleCurrencyToggle}
        />
      </div>
        <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
          <Step>
            <StepLabel>
              Confirm Order
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Enter Delivery Info
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Pay with Bitcoin
            </StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <p>{this.getStepContent(stepIndex)}</p>
          <div style={{marginTop: '35px'}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0 || stepIndex === 2}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === 2 || ((!this.props.name || !this.props.address || !this.props.phone) && stepIndex === 1 )}
              primary={true}
              onClick={this.handleNext}
            />
            <p style={{position: "absolute", right: 12}}>{`Total: ${price}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartTotal: state.cartTotal,
  cart: state.cart,
  quantity: state.quantity,
  btcPrice: state.btcPrice,
  name: state.name,
  address: state.address,
  phone: state.phone,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id, quantity }) => {
    dispatch({ type: 'ADD', id, quantity });
  },
  handleOpenClose: () => {
    dispatch({ type: 'OPEN' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeCart);
