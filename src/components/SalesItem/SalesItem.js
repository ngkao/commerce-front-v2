import { useEffect, useState } from "react";
import "./SalesItem.scss"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const SalesItem = () => {
    const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const {orderId} = useParams();
    const [itemsByOrderId, setItemByOrderId] = useState();

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/orders/${orderId}`)
             .then((data) => {
                console.log("Items by Order Id", data)
                setItemByOrderId(data.data)
             })
    })


    return (
        <section className="sales">
            <div className="sales__heading">
                <Link to="/sales" className="sales__title">Sales Summary</Link>
                <p className="sales__title">&gt;</p>
                <p className="sales__title">Item Details</p>
            </div>
        <div className="sales__headers">
            <p className="sales__common-item sales__header-item">Date</p>
            <p className="sales__common-item sales__header-item">Category</p>
            <p className="sales__common-item sales__header-item">Product</p>
            <p className="sales__common-item sales__header-item">Quantity</p>
            <p className="sales__common-item sales__header-item">Sales</p>
        </div>
        <div className="sales__list">
            {itemsByOrderId? itemsByOrderId.map((item) => (
                <div className="sales__item-ctr">
                    <p className="sales__common-item sales__header-item">Date</p>
                    <p className="sales__common-item sales__header-item">{item.product_category}</p>
                    <p className="sales__common-item sales__header-item">Product</p>
                    <p className="sales__common-item sales__header-item">Quantity</p>
                    <p className="sales__common-item sales__header-item">Sales</p>
                </div>
            )):null}
        </div>

    </section>
    );
};

export default SalesItem;