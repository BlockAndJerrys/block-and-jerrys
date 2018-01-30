import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
// import ioClient from 'socket.io-client';
import logo from './Ben_and_jerry_logo-svg.svg'
import Icecream from './components/icecream'
import Cart from './components/cart'

var socket;

const menu = [
  {
    img_url: "http://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/banana-split-detail.png",
    flavor: "Ethereum Split",
    price: 0.000012,
  },
  {
    img_url: "http://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/chunky-monkey-detail.png",
    flavor: "Chunky Blocky",
    price: 0.000020,
  },
  {
    img_url: "http://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/cherry-garcia-detail.png",
    flavor: "Cherry Garcia",
    price: 0.000018,
  },
  {
    img_url: "http://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/everything-but-the-detail.png",
    flavor: "Everything But The",
    price: 0.000031,
  },
]

class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
	payreq: "",
        cart: 0,
	paid: false,
     }
 }

  componentDidMount() {
	//  socket = ioClient('http://b6c31ab4.ngrok.io');
  //
	//  socket.on("INVOICE", (payreq) => {
	//  	this.setState({payreq});
	//  })
  //
	//  socket.on("PAID", () => {
	// 	this.setState({paid: true})
	// })
}


  handleClick = async (price) => {
	  this.setState({cart: (parseFloat(this.state.cart)+parseFloat(price)).toFixed(6)})
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
        <Cart />
        <div className="body">
        {
          // this.state.payreq ? <div className="body"></div> : <div className="body">
          // {

            menu.map( (x,i) => (
              <div key={i} className="menuitem">
              <Icecream
                img_url={x.img_url}
                flavor={x.flavor}
                price={x.price}
                />
              </div>
            ))
          // }

          // </div>
        }
        </div>


      </div>
    );
  }
}



export default App;
