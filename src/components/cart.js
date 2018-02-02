import React from 'react';
import Browse from './browseCart'
import Checkout from './checkoutCart'
import Paid from './paidCart'

export default ({cartTotal, generateInvoice, payreq, paid}) => (
  <div className="cart">
    {
      payreq ?
        (paid ? <Paid /> :
          <Checkout payreq={payreq} />) :
        <Browse generateInvoice={generateInvoice} cartTotal={cartTotal} />
    }
  </div>
);
