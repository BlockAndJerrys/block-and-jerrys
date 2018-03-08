import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  Router,
  Route,
  withRouter,
  Link,
} from 'react-router-dom';

import '../styles/App.css';
import history from '../history';

const url = 'http://localhost:5000';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      baseball: '',
      success: null,
      data: [
        { id: 1, description: 'Loading' },
        { id: 2, description: 'Loading' },
      ],
      orderData: [
        { id: 1, description: 'Loading' },
      ],
      waypoint_store: [],
      grocery_stores: [],
      nearby_orders: [],
      stopRecursion: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.acceptJob = this.acceptJob.bind(this);
  }
  componentDidMount() {
    console.log("this props", this.props);
    axios.get(url + '/dashboard').then((res) => {
      this.setState({
        success: res.data.success,
        data: res.data.data,
      });
      history.push('/dashboard/orders');
    });
  }
  handleChange(e) {
    this.setState({ baseball: e.target.value });
  }

  handleClose() { this.setState({ open: false }); }

  async handleClick() {
    const res = await axios.post(url + '/login', {
      username: 'foobar',
      password: this.state.baseball,
    });
    console.log("DATA", res.data.data);
    this.setState({
      success: res.data.success,
      data: res.data.data[0],
    });

    this.props.addDriver(res.data.driver);
    history.push('/dashboard/orders');
  }
  async acceptJob(jobId, orderLocation) {
    console.log("jobId", jobId, this.props.driver.id);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const {latitude, longitude} = position.coords;
      const additionalInfo = await axios.post(url + '/acceptJob/', {
        driverId: this.props.driver.id,
        jobId,
        latitude,
        longitude,
        orderLocation,
      });
      const {waypoint_store, grocery_stores, nearby_orders} = additionalInfo.data;
      this.setState({waypoint_store, grocery_stores,nearby_orders});
      history.push(`/dashboard/order/${jobId}`);
    });

  }
  render() {
    if (this.state.success === true) {
      let columns = Object.keys(this.state.data[0]);
      columns = columns.map(x => ({
        Header: x,
        accessor: x,
      }));
      columns.push({
        Header: 'Delivery Driver',
        accessor: 'Delivery Driver',
        Cell: row => {
          console.log("ROW", row);
          return (
          <span>
            {row.original.delivery_driver ?
              <span> {row.original.delivery_driver} </span> : <RaisedButton
                label="Accept Job"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.acceptJob(row.original.id, row.original.address); }}
                secondary
            />
            }
          </span>
        )},
      });
      return (
        <Router history={history}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <RaisedButton href="/dashboard/orders" style={{ marginRight: '15px', marginBottom: '15px' }}>All Orders</RaisedButton>
            <RaisedButton href="/dashboard/driverQueue">Your order queue </RaisedButton>
            <Route exact path='/dashboard/orders' render={() => {
              return (
              <ReactTable
                getTrProps={(state, row, column, instance) => {
                  return {
                    onClick: async () => {
                      history.push(`/dashboard/order/${row.original.id}`);
                    },
                  };
                }}
                className="-striped -highlight"
                data={this.state.data}
                columns={columns}
              />
            )}}
            />
            <Route exact path="/dashboard/order/:id" render={() => {
              if(!this.state.stopRecursion) {
                axios.get(url + history.location.pathname)
                .then(res => {
                  let data = res.data.data;
                  console.log("res.data", res.data.additionalInfo);
                  if (res.data.additionalInfo) {
                    const { waypoint_store, grocery_stores, nearby_orders } = res.data.additionalInfo;
                    this.setState({ waypoint_store, grocery_stores, nearby_orders });
                  }
                  data = data.map(x => {
                    x.flavor = x.icecream.flavor;
                    x.price = x.icecream.price;
                    delete x.icecream;
                    return x;
                  });
                  this.setState({ orderData: data, stopRecursion: true });
                });
              }
              let cols = Object.keys(this.state.orderData[0]);
              cols = cols.map(x => ({
                Header: x,
                accessor: x,
              }));
              return (
                <div>
                  <div className="additionalInfo">
                    <p>Closest Waypoint FlagShipt Ben and Jerries Store: <span style={{ color: 'blue' }}> {this.state.waypoint_store[0]}, {this.state.waypoint_store[1]} metres away </span></p>
                    <p> Closest grocery_stores:
                      {this.state.grocery_stores.map(store => {
                          return (
                            <span style={{color: 'blue', display: 'block'}} key={store[0]}> {store[0]}, {store[1]} metres away </span>
                          )
                      })}
                    </p>
                    <p> Orders {this.state.nearby_orders.map(order => {
                      return (
                        <span style={{ color: 'blue' }} key={order}>{order}</span>
                      )
                      })} is within a mile of this order
                    </p>
                  </div>
                  <ReactTable
                    data={this.state.orderData}
                    columns={cols}
                  />
                </div>
            );
            }}
            />
          </div>
        </Router>
      );
    }
    return (
      <Dialog open={this.state.open} >
        <form action="/login">
          <TextField
            value={this.state.baseball}
            floatingLabelText="Baseball"
            type="password"
            onChange={this.handleChange}
          />
          <RaisedButton
            label="Baseball"
            onClick={this.handleClick}
            secondary
          />
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  driver: state.driver,
});

const mapDispatchToProps = dispatch => ({
  addDriver: (driver) => {
    dispatch({ type: 'SET_DRIVER', driver });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
