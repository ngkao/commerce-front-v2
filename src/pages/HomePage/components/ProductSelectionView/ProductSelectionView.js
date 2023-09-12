import React from "react";
import InventoryList from "../InventoryList/InventoryList";
import "./ProductSelectionView.scss";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";

const ProductSelectionView = ({
  productList,
  onClick,
  totalCart,
  removeFromCart,
  cartSession,
  setCartSession,
  showQuantity,
  setShowQuantity,
  setPreviewCart,
  productsSold,
  setOutOfStockMsg,
  setShowQR,
}) => {
  useEffect(() => {
    if (!productList) {
      <p>Loading...</p>;
    }
  }, [productList]);

  return (
    <section className="product">
      <div className="product__ctr">
        <div className="product__list">
          {productList ? (
            productList
              .sort((a, b) => a.id - b.id)
              .map((product) => (
                <div className="test" key={product.id}>
                  <InventoryList
                    key={product.id}
                    product={product}
                    onClick={onClick}
                    totalCart={totalCart}
                    removeFromCart={removeFromCart}
                    productList={productList}
                    cartSession={cartSession}
                    setCartSession={setCartSession}
                    showQuantity={showQuantity}
                    setShowQuantity={setShowQuantity}
                    setPreviewCart={setPreviewCart}
                    productsSold={productsSold}
                    setOutOfStockMsg={setOutOfStockMsg}
                    setShowQR={setShowQR}
                  />
                </div>
              ))
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSelectionView;
