import React, { useState } from 'react';
import PaySummary from '../PaySummary/PaySummary';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart}) => {

const [selectedCart, setSelectedCart] = useState([]);


const handleAddToCart = (selectedId) => {
    // console.log(selectedId)
    console.log("product in func",product)

    const str = sessionStorage.getItem("myCart");
    let myCart = JSON.parse(str);
    console.log("Current Cart Session", myCart)
    const checkCart = myCart.filter((item) => (
        item.id === product.id
    ))
    console.log(checkCart)

    if (!checkCart.length > 0) {
        totalCart(product)
    }
    
}


    return (
        <>
            {/* {productList.map((product) => ( */}
                <div className="inventory-item">
                    <p>Product Name: {product.product_name}</p>
                    <p>Product Price: {product.sale_price}</p>
                    <p>Quantity</p>
                    <button>-</button>
                    <button onClick={() => handleAddToCart(product.id)}>+</button>
                </div>
            {/* // ))}  */}

            {/* <PaySummary onClick={onClick}/> */}
        </>


    );
};

export default InventoryList;