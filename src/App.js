import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ioClient from 'socket.io-client';
import logo from './Ben_and_jerry_logo-svg.svg'

import Icecream from './components/icecream'
import Cart from './components/cart'
import ConeCounter from './components/coneCounter'

import menu from './utils/menu'

var socket;

class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
      	payreq: "",
        cartTotal: 0,
      	paid: false,
        quantities: [0,0,0,0]
     }
 }

  componentDidMount() {
	 socket = ioClient('localhost:8081');

	 socket.on("INVOICE", (payreq) => {
	 	 this.setState({payreq});
	 })

	 socket.on("PAID", () => {
		this.setState({paid: true})
	})
  }

  addItemToCart = async (price, i) => {
    let temp = this.state.quantities.slice();
    temp[i] ++;
	  this.setState({
      quantities: temp,
      cartTotal: (parseFloat(this.state.cartTotal)+parseFloat(price)).toFixed(6)
    })
  }

  generateInvoice = () => {
    socket.emit("GENERATE_INVOICE", this.state.cart);
  }


 restart = () => {
   this.setState({payreq: "", paid: false, cart: 0})
 }

 render() {
    return (
      <div className="App">
        <div className="top_left_container">
          Powered By: <img className="lnd_logo_img"src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" />
        </div>
        <div className="top_right_container">
          <ConeCounter totalcones={0}/>
        </div>
        <div className="header">
          <img className="logo_img" src={logo} alt="blockandjerrys"/>
        </div>
        <Cart
          cartTotal={this.state.cartTotal}
          restart={this.restart.bind(this)}
          generateInvoice={this.generateInvoice.bind(this)}
          payreq={this.state.payreq}
          paid={this.state.paid}
          menu={menu}
          quantities={this.state.quantities}
          />
        <div className="body">
        {
          this.state.payreq ? null :
            menu.map( (x,i) => (
              <div key={i} className="menuitem">
              <Icecream
                img_url={x.img_url}
                flavor={x.flavor}
                price={x.price}
                handleClick={this.addItemToCart.bind(this, x.price, i)}
                />
              </div>
            ))
        }
        </div>
      </div>
    );
  }
}



export default App;
