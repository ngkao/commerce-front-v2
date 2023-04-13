import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import { Link } from 'react-router-dom';
import "./ProductSelectionView.scss"
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-grid-carousel'

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart, cartSession, setCartSession,showQuantity, setShowQuantity,setPreviewCart,productsSold}) => {

    return (
        <section className="product">
            <div className="product__topbar">
                <input className="product__search" placeholder="SEARCH"></input>
                <Link className="product__add" to="/products/add">Add Product</Link>
            </div>
            <div className="product__ctr">
                <div className="product__list">
                    <Carousel 
                        className="carousel" 
                        cols={4} 
                        rows={3} 
                        gap={0} 
                        showDots={true}
                        loop>
                            {productList? 
                            productList.map((product) => (
                                <Carousel.Item className="test" key={product.id}>
                                    <InventoryList 
                                        key={product.id}
                                        product={product}
                                        onClick={onClick}
                                        totalCart={totalCart}
                                        removeFromCart={removeFromCart}
                                        productList={productList}
                                        cartSession={cartSession}
                                        setCartSession={setCartSession}
                                        showQuantity={showQuantity}
                                        setShowQuantity={setShowQuantity}
                                        setPreviewCart={setPreviewCart}
                                        productsSold={productsSold}
                                    />
                                </Carousel.Item>
                            ))
                            : <p>Loading</p>}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default ProductSelectionView;