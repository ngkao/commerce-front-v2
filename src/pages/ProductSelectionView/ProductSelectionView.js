import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import { Link } from 'react-router-dom';

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart}) => {
    return (
        <>
            <Link to="/products/add">Add Product</Link>
            {productList? 
            productList.map((product) => (
            <>
                <InventoryList 
                key={product.id}
                product={product}
                onClick={onClick}
                totalCart={totalCart}
                removeFromCart={removeFromCart}
                /> 
            </>
            ))
        : <p>Loading</p>}
        </>
    );
};

export default ProductSelectionView;