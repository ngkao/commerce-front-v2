import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import { Link } from 'react-router-dom';
import "./ProductSelectionView.scss"
import 'react-multi-carousel/lib/styles.css';
// import Carousel from 'react-grid-carousel';
import { useEffect } from 'react';

const ProductSelectionView = ({productList, key, product, onClick,totalCart,removeFromCart, cartSession, setCartSession,showQuantity, setShowQuantity,setPreviewCart,productsSold,setOutOfStockMsg,setShowQR}) => {

    useEffect(() => {
        if (!productList) {
            <p>Loading...</p>
        }
    },[])

    return (
        <section className="product">
            {/* <div className="product__topbar">
                <input className="product__search" placeholder="SEARCH"></input>
                <Link className="product__add" to="/products/add">Add Product</Link>
            </div> */}
            <div className="product__ctr">
                <div className="product__list">
                            {productList? 
                            productList
                            .sort((a,b) => a.id - b.id)    
                            .map((product) => (
                                <div className="test" key={product.id}>
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
                                        setOutOfStockMsg={setOutOfStockMsg}
                                        setShowQR={setShowQR}
                                    />
                                </div>
                            ))
                            : <p>Loading</p>}
                </div>
            </div>
        </section>
    );
};

export default ProductSelectionView;


// old

// {/* <section className="product">
// {/* <div className="product__topbar">
//     <input className="product__search" placeholder="SEARCH"></input>
//     <Link className="product__add" to="/products/add">Add Product</Link>
// </div> */}
// <div className="product__ctr">
//     <div className="product__list">
//         {/* <Carousel 
//             className="carousel" 
//             // cols={4} 
//             // rows={3} 
//             // cols={1} 
//             responsiveLayout={
//                 [
//                     {
//                         breakpoint: 767,
//                         cols: 1,
//                         rows: 3,
//                         gap: 0,
//                         loop: true,
//                       //   autoplay: 1000
//                     },
//                     {
//                         breakpoint: 3000,
//                         cols: 4,
//                         rows: 3,
//                         gap: 0,
//                         loop: true,
//                       //   autoplay: 1000
//                     }
//                 ]
//             }
//             mobileBreakpoint={1}
//             // scrollSnap={true}
//             gap={0} 
//             showDots={true}
//             loop
//             >
//                 {console.log(productList)}
//                 {productList? 
//                 productList
//                 .sort((a,b) => a.id - b.id)    
//                 .map((product) => (
//                     <Carousel.Item className="test" key={product.id}>
//                         <InventoryList 
//                             key={product.id}
//                             product={product}
//                             onClick={onClick}
//                             totalCart={totalCart}
//                             removeFromCart={removeFromCart}
//                             productList={productList}
//                             cartSession={cartSession}
//                             setCartSession={setCartSession}
//                             showQuantity={showQuantity}
//                             setShowQuantity={setShowQuantity}
//                             setPreviewCart={setPreviewCart}
//                             productsSold={productsSold}
//                             setOutOfStockMsg={setOutOfStockMsg}
//                             setShowQR={setShowQR}
//                         />
//                     </Carousel.Item>
//                 ))
//                 : <p>Loading</p>}
//         </Carousel> */}
//     </div>
// </div>
// </section> */}