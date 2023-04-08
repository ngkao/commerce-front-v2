import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import { Link } from 'react-router-dom';
import "./ProductSelectionView.scss"
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Carousel from 'react-grid-carousel'

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart}) => {
    console.log(productList)

    // const responsive = {
    //     superLargeDesktop: {
    //       // the naming can be any, depends on you.
    //       breakpoint: { max: 3000, min: 1280 },
    //       items: 5
    //     },
    //     desktop: {
    //       breakpoint: { max: 1280, min: 768 },
    //       items: 3
    //     },
    //     tablet: {
    //       breakpoint: { max: 768, min: 464 },
    //       items: 2
    //     },
    //     mobile: {
    //       breakpoint: { max: 464, min: 0 },
    //       items: 1
    //     }
    //   };

    return (
        <section className="product">
            <div className="product__topbar">
                <input placeholder="SEARCH"></input>
                <Link className="product__add" to="/products/add">Add Product</Link>
            </div>

            <div className="product__ctr">
                <div className="product__list">
                    {/* {productList? 
                    productList.map((product) => (
                        <InventoryList 
                            key={product.id}
                            product={product}
                            onClick={onClick}
                            totalCart={totalCart}
                            removeFromCart={removeFromCart}
                        />
                    )): <p>Loading</p>} */}
                <Carousel 
                    className="carousel" 
                    cols={3} 
                    rows={3} 
                    gap={0} 
                    showDots={true}
                    loop>
                        {productList? 
                        productList.map((product) => (
                            <Carousel.Item className="test">
                                <InventoryList 
                                    key={product.id}
                                    product={product}
                                    onClick={onClick}
                                    totalCart={totalCart}
                                    removeFromCart={removeFromCart}
                                    productList={productList}
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