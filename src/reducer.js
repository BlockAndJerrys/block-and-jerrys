import ioClient from 'socket.io-client';

const url = '10.0.0.131';
const socket = ioClient(url + ':5000');

const initialState = {
  socket,
  coneCount: 'loading cones...',
  cart: [],
  cartTotal: 0,
  btcPrice: 0,
  name: '',
  address: '',
  phone: '',
  invoice: '',
};

export default function (state = initialState, action) {
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
    case 'ADD': {
      const newCart = state.cart.map(x => {
        if (x.id === action.id) x.quantity += 1;
        return x;
      });
      return {
        ...state,
        cart: newCart,
        cartTotal: state.cartTotal + 7,
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
        name: '',
        address: '',
        phone: '',
      };
    }
    default:
      return state;
  }
}
