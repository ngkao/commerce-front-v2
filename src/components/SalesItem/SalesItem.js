import { useEffect, useState } from "react";
import "./SalesItem.scss"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SalesItem = () => {
    const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const {orderId} = useParams();
    const [itemsByOrderId, setItemByOrderId] = useState();

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/orders/${orderId}`)
             .then((data) => {
                setItemByOrderId(data.data)
             })
    })

    const location = useLocation();
    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.sales__item-ctr');
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
        <section className="sales">
            <div className="sales__heading">
                <Link to="/sales" className="items__title">Sales Summary</Link>
                <p className="items__title">&gt;</p>
                <p className="sales__title">Item Details</p>
            </div>
        <div className="sales__headers">
            <p className="sales__common-item sales__header-item sales-item__item-1">Category</p>
            <p className="sales__common-item sales__header-item sales-item__item-2">Product</p>
            <p className="sales__common-item sales__header-item sales-item__item-3">Quantity</p>
            <p className="sales__common-item sales__header-item sales-item__item-4">Cost</p>
            <p className="sales__common-item sales__header-item sales-item__item-5">Sales</p>
            <p className="sales__common-item sales__header-item sales-item__item-6">Profit</p>
        </div>
        <div className="sales__list">
            {itemsByOrderId? itemsByOrderId.map((item) => (
                <div className="sales__item-ctr">
                    <p className="sales__common-item sales__header-item sales-item__item-1">{item.product_category}</p>
                    <p className="sales__common-item sales__header-item sales-item__item-2">{item.product_name}</p>
                    <p className="sales__common-item sales__header-item sales-item__item-3">{item.quantity}</p>
                    <p className="sales__common-item sales__header-item sales-item__item-4">-${item.product_purchase_price}</p>
                    <p className="sales__common-item sales__header-item sales-item__item-5">${item.product_sale_price}</p>
                    <p className="sales__common-item sales__header-item sales-item__item-6">${item.product_sale_price - item.product_purchase_price}</p>
                </div>
            )):null}
        </div>
    </section>
    );
};

export default SalesItem;