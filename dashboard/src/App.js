import React, { Component } from 'react';
import './App.css';
const {
  OrderIcecream,
} = require('../../backend/utils/postgres');

class App extends Component {
  async componentDidMount() {
    const resp = await OrderIcecream.findAll();
    console.log(resp);
  }

  render() {
    return (
      <div className="App">
      <table>
      <tbody>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Paid</th>
          <th>Sale</th>

        </tr>
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
