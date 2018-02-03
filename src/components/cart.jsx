import React from 'react';
import Browse from './browseCart';
import Checkout from './checkoutCart';
import Paid from './paidCart';

export default ({
  cartTotal,
  generateInvoice,
  payreq,
  paid,
  copyInvoice,
  menu,
  quantities,
  restart,
}) =>
  (
    <div className="cart">
      {
        payreq ?
          (paid ? <Paid restart={restart} /> :
          <Checkout payreq={payreq} cartTotal={cartTotal} />) :
          <Browse
            generateInvoice={generateInvoice}
            cartTotal={cartTotal}
            menu={menu}
            quantities={quantities}
          />
    }
    </div>);
