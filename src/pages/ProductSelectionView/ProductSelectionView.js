import React from 'react';
import InventoryList from '../InventoryList/InventoryList';

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart}) => {
    return (
        <>
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