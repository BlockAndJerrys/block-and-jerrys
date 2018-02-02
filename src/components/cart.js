import React from 'react';
import Browse from './browseCart'
import Checkout from './checkoutCart'
import Paid from './paidCart'

export default ({cartTotal, generateInvoice, payreq, paid, copyInvoice, menu, quantities}) => (
  <div className="cart">
    {
      payreq ?
        (paid ? <Paid /> :
          <Checkout payreq={payreq} />) :
        <Browse generateInvoice={generateInvoice} cartTotal={cartTotal} menu={menu} quantities={quantities} />
    }
  </div>
);
