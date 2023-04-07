import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Cart = ({cartSession}) => {

    const myId = uuidv4();

    return (
        <div>
          <p>TOTAL PAY CART</p>
          {cartSession ? 
                    (cartSession.map((cartItem) => (
                      <div key={cartItem.id}>
                        <p >cartItem {cartItem.product_name}</p>
                        <p>Quantity {cartItem.count}</p>
                      </div>)
                    )) : null
        }

        </div>
    );
};

export default Cart;