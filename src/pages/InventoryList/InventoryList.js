import React, { useState } from 'react';
import PaySummary from '../PaySummary/PaySummary';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart, removeFromCart}) => {

const [selectedCart, setSelectedCart] = useState([]);


const handleAddToCart = (selectedId) => {
    // console.log(selectedId)

    const str = sessionStorage.getItem("myCart");
    let myCart = JSON.parse(str);
    console.log("Current Cart Session", myCart)
        totalCart(product)
}

const handleRemoveFromCart = (selectedId) => {
    removeFromCart(product)
}


    return (
        <>
            {/* {productList.map((product) => ( */}
                <div className="inventory-item">
                    <p>Product Name: {product.product_name}</p>
                    <p>Product Price: {product.sale_price}</p>
                    <p>Quantity</p>
                    <button className="inventory-item__btn" onClick={() => handleRemoveFromCart(product.id)}>-</button>
                    <button className="inventory-item__btn"  onClick={() => handleAddToCart(product.id)}>+</button>
                </div>
            {/* // ))}  */}

            {/* <PaySummary onClick={onClick}/> */}
        </>


    );
};

export default InventoryList;