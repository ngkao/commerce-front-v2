import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PaySummary from '../PaySummary/PaySummary';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart, removeFromCart, className}) => {

const location = useLocation();
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


const handlePlusClick = () => {
    console.log("Clicked", product.product_name)
    handleAddToCart(product.id)
    setShowQuantity(true)
}

const [showQuantity, setShowQuantity] = useState(false);

//Transition 
useEffect(() => {
    setTimeout(() => {
        const items = document.querySelectorAll('.inventory-item__btn-ctr');
       console.log("PATH CHANGED")
       if (showQuantity === true) {
           setTimeout(() => {
               items.forEach((item, index) => 
                   setTimeout(() => {
                       item.classList.add('show-button')
                   },index * 100)
               );
               console.log("Button Class was added")
           },0)

       } else {
       items.forEach(item => item.classList.remove('show-button'));
       console.log("Button Class was removed")
       }
   },300)

  }, [showQuantity]);

    return (
        <>
            {/* {productList.map((product) => ( */}
                <div className="inventory__item">
                    <img className="inventory-item__img" src="https://picsum.photos/seed/picsum/200/300"/>
                    <p className="inventory-item__name">{product.product_name}</p>
                    <div className="inventory-item__price-quantity">
                        {showQuantity? 
                            (<div className="inventory-item__btn-ctr">
                                <p className="inventory-item__btn" onClick={() => handleRemoveFromCart(product.id)}>-</p>
                                <p className="inventory-item__count">1</p>
                                <p className="inventory-item__btn"  onClick={() => handleAddToCart(product.id)}>+</p>
                            </div>) 
                            : 
                            <>
                                <p>${product.sale_price}</p>
                                <p onClick={handlePlusClick} className="inventory-item__plus-btn">+</p>
                            </>
                        }

                    </div>
                </div>
             {/* ))}   */}

            {/* <PaySummary onClick={onClick}/> */}
        </>


    );
};

export default InventoryList;