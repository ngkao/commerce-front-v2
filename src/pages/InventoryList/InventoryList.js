import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PaySummary from '../PaySummary/PaySummary';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart, removeFromCart, className, cartSession, setCartSession, setShowQuantity, showQuantity}) => {

const location = useLocation();
const [selectedCart, setSelectedCart] = useState([]);
const [itemQuantity, setItemQuantity] = useState(0)

const handleAddToCart = (selectedId) => {
    // console.log(selectedId)

    const str = sessionStorage.getItem("myCart");
    let myCart = JSON.parse(str);
    console.log("Current Cart Session", myCart)
        totalCart(product)

        console.log("Clicked", product.product_name, "showQuantity: ", showQuantity.includes(selectedId))
 
}

const handleRemoveFromCart = (selectedId) => {
    if (cartSession.find((item) => item.id === selectedId)?.count < 2) {
        console.log("Prevent from go lower")

        let str = sessionStorage.getItem("myCart");
        let myCart = JSON.parse(str);
        let updatedCart = myCart.filter((item) => item.id != selectedId)
        sessionStorage.setItem("myCart", JSON.stringify(updatedCart))
        setCartSession(updatedCart)

        if (cartSession.find((item) => item.id === selectedId)?.count === 1) {
            console.log("HIDE BACK QUANTITY")
            console.log("SEE what in the quantity", showQuantity)
            setShowQuantity(showQuantity.filter((index) => index !== product.id))
        }

        return;
    }
    removeFromCart(product)
    // setShowQuantity(true)
    // let str = sessionStorage.getItem("myCart");
    // let myCart = JSON.parse(str);
    // sessionStorage.setItem("myCart", JSON.stringify(myCart))
    // setCartSession(myCart)

    // setCartSession(myCart)

}



const handlePlusClick = (selectedId) => {
    
    handleAddToCart(product.id)
    
    setShowQuantity([...showQuantity, selectedId])
    // setShowQuantity(true)
    
    console.log("Clicked", product.product_name, "showQuantity: ", showQuantity.includes(selectedId))
    
}

// const [showQuantity, setShowQuantity] = useState([]);


//Transition 
useEffect(() => {
    setTimeout(() => {
        const items = document.querySelectorAll('.inventory-item__btn-ctr');
       console.log("PATH CHANGED")
    //    if (showQuantity.includes(product.id)) {
           setTimeout(() => {
               items.forEach((item, index) => 
                //    setTimeout(() => {
                       item.classList.add('show-button')
                //    },index * 100)
               );
               console.log("Button Class was added")
           },0)

    //    } else {
    //    items.forEach(item => item.classList.remove('show-button'));
    //    console.log("Button Class was removed")
    //    }
   },300)

  }, [showQuantity]);


  console.log("showQuantity",showQuantity)

    return (
        <>
            {/* {productList.map((product) => ( */}
                <div className="inventory__item">
                    <img className="inventory-item__img" src="https://picsum.photos/seed/picsum/200/300"/>
                    <p className="inventory-item__name">{product.product_name}</p>
                    <div className="inventory-item__price-quantity">
                        
                        {showQuantity.includes(product.id)? 
                            (<div className="inventory-item__btn-ctr">
                                <p className="inventory-item__btn" onClick={() => handleRemoveFromCart(product.id)}>-</p>
                                <p className="inventory-item__count">
                                    {cartSession.find((item) => item.id === product.id)?.count || 0}
                                </p>
                                <p className="inventory-item__btn"  onClick={() => handleAddToCart(product.id)}>+</p>
                            </div>) 
                            : 
                            <>
                                <p className="inventory-item__price">${product.sale_price}</p>
                                <p onClick={() => handlePlusClick(product.id)} className="inventory-item__plus-btn">+</p>
                            </>
                        }
                      
                        
            
                        {/* {showDefaultPrice ? 
                            (<>
                                <p className="inventory-item__price">${product.sale_price}</p>
                                <p onClick={() => handlePlusClick(product.id)} className="inventory-item__plus-btn">+</p>
                            </>) :null
                        } */}

                    </div>
                </div>
             {/* ))}   */}

            {/* <PaySummary onClick={onClick}/> */}
        </>


    );
};

export default InventoryList;