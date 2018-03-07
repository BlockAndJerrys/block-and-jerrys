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
    this.setState({
      success: res.data.success,
      data: res.data.data,
    });

    this.props.addDriver(res.data.driver);
    history.push('/dashboard/orders');
  }
  async acceptJob(jobId, orderLocation) {
    console.log("jobId", jobId, this.props.driver.id);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("POSITION", position);
      const {latitude, longitude} = position.coords;
      console.log("latitude", longitude)
      axios.post(url + '/acceptJob/', {
        driverId: this.props.driver.id,
        jobId,
        latitude,
        longitude,
        orderLocation
      });
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
            {row.delivery_driver ?
              <span> {row.delivery_driver} </span> : <RaisedButton
                label="Accept Job"
                onClick={() => { this.acceptJob(row.original.id, row.original.address); }}
                secondary
            />
            }
          </span>
        )},
      });
      return (
        <Router history={history}>
          <div>
            <a href="/dashboard/orders">All Orders</a>
            <a href="/dashboard/driverQueue">Your order queue </a>
            <Route exact path='/dashboard/orders' render={() => {
              console.log("in?");
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
              axios.get(url + history.location.pathname)
              .then(res => {
                let data = res.data.data;
                data = data.map(x => {
                  x.flavor = x.icecream.flavor;
                  x.price = x.icecream.price;
                  delete x.icecream;
                  return x;
                });
                this.setState({ orderData: data });
              });
              let cols = Object.keys(this.state.orderData[0]);
              cols = cols.map(x => ({
                Header: x,
                accessor: x,
              }));
              return (<ReactTable
                data={this.state.orderData}
                columns={cols}
              />);
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
