import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import { Link } from 'react-router-dom';
import "./ProductSelectionView.scss"

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart}) => {
    console.log(productList)
    return (
        <>
            <Link to="/products/add">Add Product</Link>
            <div className="product-list">
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

        </>
    );
};

export default ProductSelectionView;