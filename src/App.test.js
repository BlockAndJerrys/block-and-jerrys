import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './components/App';
import Cart from './components/cart';
import CartItem from './components/cartItem';
import BrowseCart from './components/browseCart';
import CheckoutCart from './components/checkoutCart';
import PaidCart from './components/paidCart';
import ConeCounter from './components/coneCounter';
import Icecream from './components/icecream';

import menu from './utils/menu';

Enzyme.configure({ adapter: new Adapter() });
it('shallow renders without crashing -- App', () => {
  shallow(<App />);
});
it('shallow renders without crashing -- Cart', () => {
  shallow(<Cart
    cartTotal={10}
    restart={() => console.log('Test')}
    generateInvoice={() => console.log('Test')}
    payreq="This is a test payreq"
    paid
    menu={menu}
    quantities={[1, 2, 3, 4]}
  />);
});
it('shallow renders without crashing -- Cart Item', () => {
  shallow(<CartItem flavour="Test Flavour" quantity={5} />);
});
it('shallow renders without crashing -- Browse Cart', () => {
  shallow(<BrowseCart
    generateInvoice="This is a test invoice."
    cartTotal={10}
    menu={menu}
    quantities={[1, 2, 3, 4]}
  />);
});
it('shallow renders without crashing -- Checkout Cart', () => {
  shallow(<CheckoutCart payreq="This is a test payreq." cartTotal={10} />);
});
it('shallow renders without crashing -- Paid Cart', () => {
  shallow(<PaidCart restart={() => console.log('Test')} />);
});
it('shallow renders without crashing -- Cone Counter', () => {
  shallow(<ConeCounter totalcones={7} />);
});
it('shallow renders without crashing -- Cone Counter', () => {
  shallow(<Icecream
    imgUrl="This is a test imgUrl."
    flavor="This is a test flavour."
    price={10}
    handleClick={() => console.log('Test')}
    index={1}
  />);
});
