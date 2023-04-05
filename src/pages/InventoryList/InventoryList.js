import React from 'react';

const InventoryList = ({productList}) => {
    return (
        <>
            {productList.map((product) => (
                <div key={product.id}>
                    <p>Product Name: {product.product_name}</p>
                    <p>Product Price: {product.sale_price}</p>
                </div>
            ))} 
        </>


    );
};

export default InventoryList;