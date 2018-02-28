import ioClient from 'socket.io-client';

let url = 'localhost';
url += ':5000';
const socket = ioClient(url);
console.log('Connected to socket at', url);

const initialState = {
  socket,
  coneCount: 'loading cones...',
  cart: [],
  cartTotal: 0,
  quantity: 0,
  btcPrice: 0,
  name: '',
  address: '',
  phone: '',
  invoice: '',
  email: '',
  open: false,
};

export default function (state = initialState, action) {
  console.log(action, state);
  switch (action.type) {
    case 'INIT': {
      const { cart, coneCount, btcPrice } = action;
      const cartOrder = cart.map((x) => {
        x.quantity = 0;
        return x;
      });
      return {
        ...state,
        coneCount,
        cart: cartOrder,
        btcPrice,
      };
    }
    case 'OPEN': {
      return {
        ...state,
        open: !state.open,
      };
    }

    case 'ADD': {
      let conePrice;
      const newCart = state.cart.map(x => {
        if (x.id === action.id) {
          if (action.quantity) {
            x.quantity = action.quantity;
          } else {
            x.quantity += 1;
          }
          conePrice = x.price;
        }
        return x;
      });
      return {
        ...state,
        cart: newCart,
        cartTotal: state.cartTotal + conePrice,
        quantity: state.quantity + 1,
      };
    }

    case 'SUBTRACT': {
      let conePrice;
      const newCart = state.cart.map(x => {
        if (x.id === action.id) {
          if (action.quantity) {
            x.quantity = action.quantity;
          } else {
            x.quantity -= 1;
          }
          conePrice = x.price;
        }
        return x;
      });
      return {
        ...state,
        cart: newCart,
        cartTotal: state.cartTotal + conePrice,
        quantity: state.quantity - 1,
      };
    }

    case 'INPUT_CHANGE': {
      const { target } = action.event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      return {
        ...state,
        [name]: value,
      };
    }
    case 'GENERATE_INVOICE':
      state.socket.emit(
        'GENERATE_INVOICE',
        {
          name: state.name,
          address: state.address,
          phone: state.phone,
          cartOrder: state.cart,
          cartTotal: state.cartTotal,
        },
      );
      return state;
    case 'RECEIVED_INVOICE':
      return {
        ...state,
        invoice: action.invoice,
      };
    case 'CONE_UPDATE':
      console.log('ALL SOCKETS SHOULD RECEIVE THIS', action);
      return {
        ...state,
        coneCount: action.coneCount,
      };
    case 'EMAIL':
      state.socket.emit(
        'EMAIL',
        {
          email: state.email,
          phone: state.phone,
        },
      );
      return {
        ...state,
        email: '',
      };
    case 'RESTART': {
      const cartOrder = state.cart.map((x) => {
        x.quantity = 0;
        return x;
      });
      return {
        ...state,
        invoice: '',
        cart: cartOrder,
        cartTotal: 0,
        quantity: 0,
        name: '',
        address: '',
        phone: '',
      };
    }

    case 'HANDLE_CLEAR_CART': {
      const newCartOrder = state.cart.map((x) => {
        x.quantity = 0;
        return x;
      });
      return {
        ...state,
        cart: newCartOrder,
        cartTotal: 0,
        quantity: 0,
      };
    }
    default:
      return state;
  }
}
