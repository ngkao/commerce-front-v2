import "./SalePage.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {dateConvert} from "../../utils/utils";
import { useLocation } from "react-router-dom";

const SalePage = ({orders,renderItemsByOrderId}) => {
    const navigate = useNavigate();

    const handleClick = (order_id) => {
    renderItemsByOrderId(order_id)
    navigate(`/sales/${order_id}`)
    }

    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.sales__item-ctr');
           if (location.pathname === '/sales') {
               setTimeout(() => {
                   items.forEach((item, index) => 
                       setTimeout(() => {
                           item.classList.add('show-item')
                       },index * 100)
                   );
               },0)
           } else {
           items.forEach(item => item.classList.remove('show-item'));
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
                    <div onClick={() => handleClick(order.order_id)} className="sales__item-ctr" key={order.order_id}>
                        <p className="sales__common-item sales__data-item sales__item-1"><span className="sales__mob-header">Date: </span>{dateConvert(order.order_date)}</p>
                        <p className="sales__common-item sales__data-item sales__item-2"><span className="sales__mob-header">Order ID: </span>{order.order_id}</p>
                        <p className="sales__common-item sales__data-item sales__item-3"><span className="sales__mob-header">Contact: </span>{order.customer_name}</p>
                        <p className="sales__common-item sales__data-item sales__item-4"><span className="sales__mob-header">Quantity: </span>{order.total_quantity}</p>
                        <p className="sales__common-item sales__data-item sales__item-5"><span className="sales__mob-header">Sales: </span>${order.total_sale_amount}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SalePage;