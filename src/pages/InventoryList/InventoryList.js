import React, { useState, useEffect } from 'react';
import "./InventoryList.scss"

const InventoryList = ({product, onClick, totalCart, removeFromCart, className, cartSession, setCartSession, setShowQuantity, showQuantity, setPreviewCart,productsSold,setOutOfStockMsg,setShowQR}) => {

    const [stockError, setStockError] = useState(false)

    const handleAddToCart = (selectedId) => {
        const str = sessionStorage.getItem("myCart");
        let myCart = JSON.parse(str);
        totalCart(product)
        setPreviewCart(false); // to hide the preview animation
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
            if (cartSession.length === undefined || cartSession.length < 2) {
                setPreviewCart(true);
            }
            return;
        }
        removeFromCart(product)
    }

    const handlePlusClick = (selectedId) => { 

        if (product.quantity > 0) {
            setShowQR(false)
            handleAddToCart(product.id) 
            setShowQuantity([...showQuantity, selectedId])
        } else {
            setOutOfStockMsg({status: true, product: product.product_name, message: "is out of stock"})

            setTimeout(() => {
                setOutOfStockMsg({status: false, message: "test"})
            }, 3000)
        }
    }

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
                {showQuantity.includes(product.id)? 
                    (<div className="inventory-item__btn-ctr inventory-item__stock-error">
                        <p className="inventory-item__btn" onClick={() => handleRemoveFromCart(product.id)}>-</p>
                        <p className="inventory-item__count">
                            {cartSession != null && cartSession.find((item) => item.id === product.id)?.count || 0}
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