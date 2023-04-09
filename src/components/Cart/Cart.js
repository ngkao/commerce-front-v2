import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Cart.scss"
import { useEffect } from 'react';

const Cart = ({cartSession}) => {

    const myId = uuidv4();

//     //Transition
    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.cart__item');
        console.log("Cart Transition", items)
        // if (cartSession === true) {
            // setTimeout(() => {
                items.forEach((item) => 
                    // setTimeout(() => {
                        item.classList.add('show-cart')
                    // },index * 100)
                );
                console.log("Cart Class was added")
            // },0)

    //     } else {
    //     items.forEach(item => item.classList.remove('show-button'));
    //     console.log("Cart Class was removed")
    //     }
    },400)

  }, [cartSession]);


    return (
        <div className="cart">
          <p className="cart__title">TOTAL PAY CART</p>
          <div className="cart__list">
                {cartSession ? 
                    (cartSession.map((cartItem) => (
                      <div className="cart__item" key={cartItem.id}>
                        <div className="cart__img-name-qt">
                            <img className="cart__img" src="https://picsum.photos/seed/picsum/200/300"/>
                            <div className="cart__name-quantity">
                                <p className="cart__name">{cartItem.product_name}</p>
                                <p className="cart__quantity">Quantity :  {cartItem.count}</p>
                            </div>
                        </div>
                        <p className="cart__price">${cartItem.sale_price}</p>
                      </div>)
                    )) : null}
          </div>
        </div>
    );
};

export default Cart;