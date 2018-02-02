import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ioClient from 'socket.io-client';
import logo from './Ben_and_jerry_logo-svg.svg'

import Icecream from './components/icecream'
import Cart from './components/cart'

import menu from './utils/menu'

var socket;

class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
      	payreq: "",
        cartTotal: 0,
      	paid: false,
     }
 }

  componentDidMount() {
	 socket = ioClient('localhost:8081');

	 socket.on("INVOICE", (payreq) => {
	 	 this.setState({payreq});
     // setTimeout(()=>this.setState({paid: true}),2000)
	 })

	 socket.on("PAID", () => {
		this.setState({paid: true})
	})
  }


  addItemToCart = async (price) => {
	  this.setState({cartTotal: (parseFloat(this.state.cartTotal)+parseFloat(price)).toFixed(6)})
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
        <div className="header">
          <img className="logo_img" src={logo} alt="blockandjerrys"/>
        </div>
        <Cart
          cartTotal={this.state.cartTotal}
          generateInvoice={this.generateInvoice.bind(this)}
          payreq={this.state.payreq}
          paid={this.state.paid}
          />
        <div className="body">
        {   this.state.payreq ? null :
            menu.map( (x,i) => (
              <div key={i} className="menuitem">
              <Icecream
                img_url={x.img_url}
                flavor={x.flavor}
                price={x.price}
                handleClick={this.addItemToCart.bind(this, x.price)}
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
