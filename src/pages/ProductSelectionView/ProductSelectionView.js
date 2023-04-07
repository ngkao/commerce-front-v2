import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import { Link } from 'react-router-dom';
import "./ProductSelectionView.scss"

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart}) => {
    console.log(productList)
    return (
        <section className="product">
            <div className="product__topbar">
                <input placeholder="SEARCH"></input>
                <Link className="product__add" to="/products/add">Add Product</Link>
            </div>

            <div className="product__ctr">
                <div className="product__list">
                    {productList? 
                    productList.map((product) => (
                        <InventoryList 
                            key={product.id}
                            product={product}
                            onClick={onClick}
                            totalCart={totalCart}
                            removeFromCart={removeFromCart}
                        />
                    )): <p>Loading</p>}
                </div>
            </div>

        </section>
    );
};

export default ProductSelectionView;