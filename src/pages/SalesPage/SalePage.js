import "./SalePage.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {dateConvert} from "../../utils/utils";
import { useLocation } from "react-router-dom";

const SalePage = ({orders,setOrders,renderItemsByOrderId}) => {
    const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();



    const handleClick = (order_id) => {
    console.log("Selected Order Id", order_id)
    renderItemsByOrderId(order_id)
    navigate(`/sales/${order_id}`)
    }

    const location = useLocation();


    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.sales__item-ctr');
           console.log("PATH CHANGED")
           if (location.pathname == '/sales') {
               setTimeout(() => {
                   items.forEach((item, index) => 
                       setTimeout(() => {
                           item.classList.add('show-item')
                       },index * 100)
                   );
                   console.log("Class was added")
               },0)
    
           } else {
           items.forEach(item => item.classList.remove('show-item'));
           console.log("Class was removed")
           }
       },300)
      }, [location.pathname]);

    return (
        <section className="sales">
            <p className="sales__title">Sales Summary</p>
            <div className="sales__headers">
                <p className="sales__common-item sales__header-item sales__item-1">Date</p>
                <p className="sales__common-item sales__header-item sales__item-2">Order ID</p>
                <p className="sales__common-item sales__header-item sales__item-3">Contact</p>
                <p className="sales__common-item sales__header-item sales__item-4">Quantity</p>
                <p className="sales__common-item sales__header-item sales__item-5">Sales</p>
            </div>
            <div className="sales__list">
                {orders
                    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
                    .map((order) => (
                    <div onClick={() => handleClick(order.order_id)} className="sales__item-ctr">
                        <p className="sales__common-item sales__data-item sales__item-1">{dateConvert(order.order_date)}</p>
                        <p className="sales__common-item sales__data-item sales__item-2">{order.order_id}</p>
                        <p className="sales__common-item sales__data-item sales__item-3">{order.customer_name}</p>
                        <p className="sales__common-item sales__data-item sales__item-4">{order.total_quantity}</p>
                        <p className="sales__common-item sales__data-item sales__item-5">${order.total_sale_amount}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default SalePage;