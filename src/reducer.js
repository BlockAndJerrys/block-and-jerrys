const initialState = {
  socket: null,
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
  switch (action.type) {
    case 'INIT': {
      const { socket, cart, coneCount, btcPrice } = action;
      const cartOrder = cart.map((x) => {
        x.quantity = 0;
        return x;
      });
      return {
        ...state,
        socket,
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
          conePrice = x.price;
          if (action.quantity) {
            return { ...x, quantity: action.quantity };
          } else {
            return { ...x, quantity: x.quantity + 1 };
          }
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
      let newQuant = state.quantity;
      let newTotal = state.cartTotal;
      const newCart = state.cart.map(x => {
        if (x.id === action.id) {
          if (action.quantity) {
            newQuant += x.quantity - action.quantity;
            return { ...x, quantity: action.quantity };
          } else if (x.quantity > 0) {
            newQuant -= 1;
            newTotal -= x.price;
            return { ...x, quantity: x.quantity - 1 };
          }
        }
        return x;
      });
      return {
        ...state,
        cart: newCart,
        cartTotal: newTotal,
        quantity: newQuant,
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
      console.log('Generating an invoice');
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
        open: false,
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
