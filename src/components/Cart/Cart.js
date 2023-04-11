import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Cart.scss"
import { useEffect } from 'react';
import Lottie from "lottie-react";
import CartPreview from "../../assets/animations/cart.json"

const Cart = ({cartSession,previewCart, orders}) => {

    const [oldItemTotalPay, setOldItemTotalPay] = useState(0);
    const myId = uuidv4();

//     //Transition
    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.cart__item');
        console.log("Cart Transition", items)
                items.forEach((item) => 
                        item.classList.add('show-cart')
                );
                console.log("Cart Class was added")
                
    },400)
  }, [cartSession]);

      //Transition Item Amount
      useEffect(() => {
        //Top
        const items = document.querySelectorAll('.cart__price-top');
        items.forEach((item) => item.classList.remove('cart__price-top--final'));
        //Bottom
        const itemsBottom = document.querySelectorAll('.cart__price-bottom');
        itemsBottom.forEach((item) => item.classList.remove('cart__price-bottom--final'));
        setTimeout(() => {
        //Top
            const items = document.querySelectorAll('.cart__price-top');
                items.forEach((item) => 
                        item.classList.add('cart__price-top--final'));
            //Bottom
            const itemsBottom = document.querySelectorAll('.cart__price-bottom');
            itemsBottom.forEach((item) => 
                    item.classList.add('cart__price-bottom--final'));
        //In the end
        return () => {
            //Top
            const items = document.querySelectorAll('.cart__price-top');
            items.forEach((item) => 
                    item.classList.add('cart__price-top---hide'));
            //Bottom
            const itemsBottom = document.querySelectorAll('.cart__price-bottom');
            itemsBottom.forEach((item) => 
                    item.classList.add('cart__price-bottom---show'));
        }
        },300)
    }, [cartSession]);

    const [saleOrderNum, setSaleOrderNum] = useState();

    const nextOrderNumber = () => {
        console.log("Order", orders)
 
            const highestValue = Math.max(...orders.map(obj => parseInt(obj.order_id)))
            console.log("Highest ID", highestValue)
            // setSaleOrderNum(highestValue+1)
   
        return highestValue+1;
  
    }

    

    return (
        <div className="cart">
          <p className="cart__title">SALE: #{nextOrderNumber()}</p>
          {previewCart? 
                <div className="cart__lottie">
                    <Lottie
                        animationData={CartPreview}
                    />
                    <p>Add products to the cart</p>
                </div>
                
                :
                <div className="cart__list">
                        {cartSession ? 
                            (cartSession.map((cartItem) => (
                            <div className="cart__item" key={cartItem.id}>
                                <div className="cart__img-name-qt">
                                    <img className="cart__img" src={cartItem.image_url}/>
                                    <div className="cart__name-quantity">
                                        <p className="cart__name">{cartItem.product_name}</p>
                                        <p className="cart__quantity">Quantity :  {cartItem.count}</p>
                                    </div>
                                </div>
                                {/* <p className="cart__price">${cartItem.sale_price}</p> */}
                                <div className="cart__price-ctr">
                                    <p className="cart__price-top">${cartItem.sale_price * cartItem.count}</p>
                                    <p className="cart__price-bottom">${cartItem.sale_price * (cartItem.count-1)}</p>
                                </div>
                                
                            </div>)
                            )) : null}
                </div>
            }
        </div>
    );
};

export default Cart;