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
//import Lightning from './utils/lightning'
import ioClient from 'socket.io-client';
import logo from './Ben_and_jerry_logo-svg.svg'

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
	 socket = ioClient('http://b6c31ab4.ngrok.io');

	 socket.on("INVOICE", (payreq) => {
	 	this.setState({payreq});
	 })
  
	 socket.on("PAID", () => {
		this.setState({paid: true}) 
	})
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
          <img className="logo_img" src={logo} />
        </div>
        <div className="cart">
        <Paper
          className={this.state.payreq ? "invoice_container" : "cart_container"}
          zDepth={3} >
          {this.state.payreq ? <h1>{this.state.paid ? "Thank you, come again!" : "Invoice:"}</h1> : <p>Cart: {this.state.cart} BTC</p>}

            {this.state.payreq ? 
		(this.state.paid ? <div>
			<img className="confirmation_img" src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png"/><RaisedButton
		label="Restart"
		onClick={this.restart.bind(this)}
		primary={true}
		fullWidth={true}/> </div>	
		: <p className="invoice">{this.state.payreq}</p>) :
            <RaisedButton
              label="Generate Invoice"
              onClick={this.generateInvoice.bind(this)}
              primary={true}
              fullWidth={true}/>
            }
        </Paper>
        </div>
        {
          this.state.payreq ? <div className="body"></div> : <div className="body">
          {
            menu.map( x => (
              <div className="menuitem">
              <Paper
                className="icecream_container"
                zDepth={3} >
                  <img className="tree_img" src={x.img_url} alt={x.flavor}></img>
                  <h1>{x.flavor}</h1>
    		          <p>{x.price} BTC</p>
                  <RaisedButton
                    label="Add to Cart"
                    onClick={this.handleClick.bind(this, x.price)}
    		            primary={true}
                    fullWidth={true} />
              </Paper>
              </div>
            ))
          }

          </div>
        }


      </div>
    );
  }
}



export default App;
