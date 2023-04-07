import axios from 'axios';
import React, { useState, useEffect } from 'react';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PaySummary = ({onClick}) => {
    
    // Pull Request for New Orders Successfully being Paid
    const [latestOrderData, setLatestOrderData] = useState(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`${REACT_APP_SERVER_URL}/orderTimestamp`)
            .then((latestData) => {
                console.log("BACKEND", latestData)
                const latestDateBackend = new Date(latestData.data);
                if (latestOrderData === null) {
                    setLatestOrderData(latestDateBackend);
                    console.log("FRONTEND - TRUE", latestOrderData)
                }
                if (latestOrderData !== null && latestDateBackend > latestOrderData) {
                    setLatestOrderData(latestDateBackend);
                    console.log("FRONTEND - TRUE", latestOrderData)
                    console.log("NEW ORDER TRIGGER") // add notification func here
                    successPayment()
                }
            })
            .catch((err) => console.log("Error: ", err))
        }, 5000)
        return () => clearInterval(intervalId);

    }, [latestOrderData])

    // Successful Payment Notification
    const [successPtmAlert, setSuccessPtmAlert] = useState(false);
    const successPayment = () => {
        setSuccessPtmAlert(true);
        console.log("SHOW THE BANNER")

        setTimeout(() => {
            setSuccessPtmAlert(false);
            console.log("REMOVE THE BANNER")
        }, 5000)
    }

    
    return (
    <div className="checkout">
        <button 
          onClick={onClick}
          className="checkout__btn"
        >CHECKOUT</button>
        {successPtmAlert? <p>Successfully Paid</p> : null}
    </div>
    );
};

export default PaySummary;