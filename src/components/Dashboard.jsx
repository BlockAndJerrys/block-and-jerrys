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
} from 'react-router-dom';

import '../styles/App.css';
import history from '../history';

const url = 'http://localhost:5000';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      baseball: 'colbycheese69',
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
  }
  componentDidMount() {
    this.handleClick();
  }
  handleChange(e) {
    this.setState({ baseball: e.target.value });
  }
  handleClose() { this.setState({ open: false }); }
  async handleClick() {
    const res = await axios.post(url + '/dashboard', {
      baseball: this.state.baseball,
    });
    this.setState({
      success: res.data.success,
      data: res.data.data,
    });
    history.push('/dashboard/orders');
    console.log(history);
  }
  render() {
    if (this.state.success === true) {
      let columns = Object.keys(this.state.data[0]);
      columns = columns.map(x => ({
        Header: x,
        accessor: x,
      }));
      return (
        <Router history={history}>
          <div>
            <Route exact path='/dashboard/orders' render={() => (
              <ReactTable
                getTrProps={(state, row, column, instance) => {
                  return {
                    onClick: async (e) => {
                      history.push(`/dashboard/order/${row.original.id}`);
                    },
                  };
                }}
                className="-striped -highlight"
                data={this.state.data}
                columns={columns}
              />
              )}
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
        <form action="">
          <TextField
            value={this.state.baseball}
            floatingLabelText="Baseball"
            onChange={this.handleChange}
          />
          <RaisedButton
            label="Icecream"
            onClick={this.handleClick}
            secondary
          />
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
