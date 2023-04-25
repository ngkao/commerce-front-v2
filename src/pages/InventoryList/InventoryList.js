import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart, removeFromCart, className, cartSession, setCartSession, setShowQuantity, showQuantity, setPreviewCart,productsSold}) => {

    // const location = useLocation();
    // const [selectedCart, setSelectedCart] = useState([]);
    // const [itemQuantity, setItemQuantity] = useState(0)

    const [stockError, setStockError] = useState(false)

    const handleAddToCart = (selectedId) => {
        
        const str = sessionStorage.getItem("myCart");
        let myCart = JSON.parse(str);
        totalCart(product)
        setPreviewCart(false); // to hide the preview animation
        
        // checkStockQuantity(selectedId);
    }

    const handleRemoveFromCart = (selectedId) => {
        if (cartSession.find((item) => item.id === selectedId)?.count < 2) {
            let str = sessionStorage.getItem("myCart");
            let myCart = JSON.parse(str);
            let updatedCart = myCart.filter((item) => item.id != selectedId)
            sessionStorage.setItem("myCart", JSON.stringify(updatedCart))
            setCartSession(updatedCart)
            if (cartSession.find((item) => item.id === selectedId)?.count === 1) {
                setShowQuantity(showQuantity.filter((index) => index !== product.id))
            }
            setPreviewCart(true);
            return;
        }
        removeFromCart(product)
    }

    const handlePlusClick = (selectedId) => { 
        // checkStockQuantity(selectedId)
        
        handleAddToCart(product.id) 
        setShowQuantity([...showQuantity, selectedId])
    }

    // const checkStockQuantity = (selectedId) => {

    // //     if (cartSession.length > 0 ) {
    //         const selectProduct = productsSold.filter((product) => product.product_id == selectedId)
    // //         console.log(selectProduct)
    //         // const countCheck = cartSession.find((item) => item.id === selectedId)?.count + 1 || 0;
    //         console.log("CardSession",cartSession)
    //         console.log("Chosen ID",selectedId)
    //         // console.log("Request count",countCheck, typeof(countCheck));
    //         console.log("available count",selectProduct[0].available_quantity, typeof(selectProduct[0].available_quantity));
    //         // console.log("current quantity", countCheck)
        
    // //         if (selectProduct[0].available_quantity > countCheck) {
    // //             return;
    // //         }
    // //     }
    // }

    //Transition 
    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.inventory-item__btn-ctr');
            setTimeout(() => {
                items.forEach((item, index) => 
                        item.classList.add('show-button')
                );
            },0)
        },300)
    }, [showQuantity]);

    return (
        <div className="inventory__item">
            <img className="inventory-item__img" src={product.image_url}/>
            <p className="inventory-item__name">{product.product_name}</p>
            <div className="inventory-item__price-quantity"> 
                {/* {showQuantity.includes(product.id) && !cartSession && (cartSession.find((item) => item.id === product.id)?.count) > (productsSold.filter((product) => product.product_id == product.id))[0].available_quantity ? <p>Enough</p>: <p>Enought</p>} */}
                {showQuantity.includes(product.id)? 
                    (<div className="inventory-item__btn-ctr inventory-item__stock-error">
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
            </div>
        </div>
    );
};

export default InventoryList;