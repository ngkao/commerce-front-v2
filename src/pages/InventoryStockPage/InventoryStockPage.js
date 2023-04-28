import "./InventoryStockPage.scss";
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const InventoryStockPage = ({renderProductsSold, productsSold}) => {

    useEffect(() => {
        renderProductsSold()
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
                <p className="inventory__common-item inventory__header-item inventory__column-0"></p>
                <p className="inventory__common-item inventory__header-item inventory__column-1">Category</p>
                <p className="inventory__common-item inventory__header-item inventory__column-2">Name</p>
                <p className="inventory__common-item inventory__header-item inventory__column-3-4">Sold</p>
                <p className="inventory__common-item inventory__header-item inventory__column-3-4">Available</p>
            </div>
            <div className="inventory__list">
                {productsSold ? 
                    productsSold
                        // .sort((a, b) => a.product_id - b.product_id)
                        .map((product) => (
                        <div key={product.product_id} className="inventory__item-ctr">
                            {/* <p className="sales__common-item sales__data-item">{dateConvert(order.order_date)}</p> */}
                            <div className=" inventory__common-item inventory__data-item inventory__column-0">
                                <img className="inventory__image"  src={product.image_url} alt={product.product_name}/>
                            </div>
                            <p className="inventory__common-item inventory__data-item inventory__column-1"><span className="inventory__mob-header">Category: </span>{product.product_category}</p>
                            <p className="inventory__common-item inventory__data-item inventory__column-2"><span className="inventory__mob-header">Name: </span>{product.product_name}</p>
                            <p className="inventory__common-item inventory__data-item inventory__column-3-4"><span className="inventory__mob-header">Sold: </span>{product.sold_quantity}</p>
                            <p className="inventory__common-item inventory__data-item inventory__column-3-4"><span className="inventory__mob-header">Category: </span>{product.available_quantity}</p>
                        </div>
                ))
                : null
                }
            </div>
        </section>
    );
};

export default InventoryStockPage;