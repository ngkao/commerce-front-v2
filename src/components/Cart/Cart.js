import React, { useState } from "react";
import "./Cart.scss";
import { useEffect } from "react";
import Lottie from "lottie-react";
import CartPreview from "../../assets/animations/cart.json";

const Cart = ({ cartSession, previewCart, orders }) => {
  //Transition
  useEffect(() => {
    setTimeout(() => {
      const items = document.querySelectorAll(".cart__item");
      items.forEach((item) => item.classList.add("show-cart"));
    }, 400);
  }, [cartSession]);
  // Transition $ Item Amount
  // eslint-disable-next-line
  const [previousCounts, setPreviousCounts] = useState({});

  useEffect(() => {
    const items = document.querySelectorAll(".cart__item");
    items.forEach((item) => {
      const itemId = item.dataset.itemId;
      const count = parseInt(
        item.querySelector(".cart__quantity").textContent.split(":")[1].trim()
      );
      if (previousCounts[itemId] !== count) {
        updatePriceClass(item, count);
        previousCounts[itemId] = count;
      }
    });

    function updatePriceClass(item, count) {
      const priceCtr = item.querySelector(".cart__price-ctr");

      priceCtr
        .querySelector(".cart__price-top")
        .classList.remove("cart__price-top--final");
      priceCtr
        .querySelector(".cart__price-bottom")
        .classList.remove("cart__price-bottom--final");

      setTimeout(() => {
        priceCtr
          .querySelector(".cart__price-top")
          .classList.add("cart__price-top--final");
        priceCtr
          .querySelector(".cart__price-bottom")
          .classList.add("cart__price-bottom--final");
      }, 400);

      return () => {
        priceCtr
          .querySelector(".cart__price-top")
          .classList.add("cart__price-top---hide");
        priceCtr
          .querySelector(".cart__price-bottom")
          .classList.add("cart__price-bottom---show");
      };
    }
  }, [cartSession, previousCounts]);

  const nextOrderNumber = () => {
    const highestValue = Math.max(
      ...orders.map((obj) => parseInt(obj.order_id))
    );
    return highestValue + 1;
  };

  return (
    <div className="cart">
      <p className="cart__title">SALE: #{nextOrderNumber()}</p>
      {previewCart ? (
        <div className="cart__lottie">
          <Lottie animationData={CartPreview} />
          <p>Add products to the cart</p>
        </div>
      ) : (
        <div className="cart__list">
          {cartSession
            ? cartSession.map((cartItem) => (
                <div
                  className="cart__item"
                  key={cartItem.id}
                  data-item-id={cartItem.id}
                >
                  <div className="cart__img-name-qt">
                    <img
                      className="cart__img"
                      src={cartItem.image_url}
                      alt={cartItem.image_url}
                    />
                    <div className="cart__name-quantity">
                      <p className="cart__name">{cartItem.product_name}</p>
                      <p className="cart__quantity">
                        Quantity : {cartItem.count}
                      </p>
                    </div>
                  </div>
                  <div className="cart__price-ctr">
                    <p className="cart__price-top cart__price-top--final">
                      ${cartItem.sale_price * cartItem.count}
                    </p>
                    <p className="cart__price-bottom cart__price-bottom--final">
                      ${cartItem.sale_price * (cartItem.count - 1)}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Cart;
