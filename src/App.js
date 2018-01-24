import React, { Component } from 'react';
import './App.css';
import tree from './tree.png'
import Paper from 'material-ui/Paper';
// import Like from 'material-ui/svg-icons/action/favorite-border';
// import Heart from 'material-ui/svg-icons/action/favorite';
import RaisedButton from 'material-ui/RaisedButton';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import axios from 'axios';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>HeDgEhOg's Tree Farm</h1>
        </div>
        <div className="body">
          <Paper
            className="tree_container"
            style={{backgroundColor: "green"}}
            zDepth={3} >
              <img className="tree_img" src={tree} alt="merkle tree"></img>
              <h1>Merkle Tree</h1>
              <p> 0.0017 BTC</p>
              <RaisedButton
                label="Generate Invoice"
                primary={true}
                fullWidth={true} />
          </Paper>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}



export default App;
