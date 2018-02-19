import ioClient from 'socket.io-client';

const socket = ioClient('localhost:5000');

const initialState = {
  socket,
  paid: false,
  coneCount: 'loading cones...',
  cart: [],
  cartTotal: 0,
  name: '',
  address: '',
  phone: '',
  invoice: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'INIT': {
      const { cart, coneCount } = action;
      cart.forEach((x, i) => {
        cart[i].quantity = 0;
      });
      return {
        ...state,
        coneCount,
        cart,
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
          cart: state.cart,
          cartTotal: state.cartTotal,
          quantity: state.cart.reduce((sum, x) => x.quantity + sum, 0),
        },
      );
      return state;
    case 'RECEIVED_INVOICE':
      return {
        ...state,
        invoice: action.invoice,
      };
    case 'PAID':
      return {
        ...state,
        paid: true,
      };
    case 'CONE_UPDATE':
      return {
        ...state,
        coneCount: action.coneCount,
      };
    case 'RESTART':
      return {
        ...state,
        invoice: '',
        paid: false,
        cartTotal: 0,
        name: '',
        address: '',
        phone: '',
        quantities: [0, 0, 0, 0],
      };
    default:
      return state;
  }
}
