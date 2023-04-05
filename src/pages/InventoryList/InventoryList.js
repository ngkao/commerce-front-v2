import React, { useState } from 'react';
import PaySummary from '../PaySummary/PaySummary';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart}) => {

const [selectedCart, setSelectedCart] = useState([]);
// const cart = []

// const totalCart = (product) => {
//     cart.push(product)

//     console.log("Total Cart",cart)
// }

const handleAddToCart = (selectedId) => {
    // console.log(selectedId)
    console.log("product in func",product)

    totalCart(product)
    
    // const selectedItem = product.filter((item) => {
    //     console.log("item",item)
    // })
    // console.log(selectedItem)
}
// console.log("Total Cart", cart)

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