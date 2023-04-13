import "./InventoryStockPage.scss";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const InventoryStockPage = () => {

    const [productsSold, setProductsSold] = useState();

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/products/sold`)
             .then((data) => {
                console.log(data.data)
                setProductsSold(data.data)
             })
    },[])

    const location = useLocation();
    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.inventory__item-ctr');
               setTimeout(() => {
                   items.forEach((item, index) => 
                       setTimeout(() => {
                           item.classList.add('show-item')
                       },index * 100)
                   );
               },0)
           items.forEach(item => item.classList.remove('show-item'));
       },300)
      }, [location.pathname]);


    return (
        <section className="inventory">
            <p className="inventory__title">Inventory Stock</p>
            <div className="inventory__headers">
                {/* <p className="sales__common-item sales__header-item">Date</p> */}
                <p className="inventory__common-item inventory__header-item inventory__column-1">Category</p>
                <p className="inventory__common-item inventory__header-item inventory__column-2">Name</p>
                <p className="inventory__common-item inventory__header-item inventory__column-3-4">Sold</p>
                <p className="inventory__common-item inventory__header-item inventory__column-3-4">Available</p>
                {/* <p className="sales__common-item sales__header-item">Sales</p> */}
            </div>
            <div className="inventory__list">
                {productsSold ? 
                
                    productsSold
                        // .sort((a, b) => a.product_id - b.product_id)
                        .map((product) => (
                        <div key={product.product_id} className="inventory__item-ctr">
                            {/* <p className="sales__common-item sales__data-item">{dateConvert(order.order_date)}</p> */}
                            <p className="inventory__common-item inventory__data-item inventory__column-1">{product.product_category}</p>
                            <p className="inventory__common-item inventory__data-item inventory__column-2">{product.product_name}</p>
                            <p className="inventory__common-item inventory__data-item inventory__column-3-4">{product.sold_quantity}</p>
                            <p className="inventory__common-item inventory__data-item inventory__column-3-4">{product.available_quantity}</p>
                        </div>
                ))
                : null
                }
            </div>
        </section>
    );
};

export default InventoryStockPage;