import ioClient from 'socket.io-client';

const socket = ioClient('localhost:5000');

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
      cart.forEach((x, i) => {
        cart[i].quantity = 0;
      });
      return {
        ...state,
        coneCount,
        cart,
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
    case 'PAID':
      return state;
    case 'CONE_UPDATE':
      console.log(action);
      return {
        ...state,
        coneCount: action.coneCount,
      };
    case 'RESTART':
      return {
        ...state,
        invoice: '',
        cartTotal: 0,
        name: '',
        address: '',
        phone: '',
      };
    default:
      return state;
  }
}
