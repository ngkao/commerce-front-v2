import axios from 'axios';
import React, { useState, useEffect } from 'react';
import QRCode from "qrcode";
import "./PaySummary.scss"
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PaySummary = ({onClick, src, totalPay}) => {
    
    // Pull Request for New Orders Successfully being Paid
    const [latestOrderData, setLatestOrderData] = useState(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`${REACT_APP_SERVER_URL}/orderTimestamp`)
            .then((latestData) => {
                // console.log("FRONTEND", latestOrderData)
                // console.log("BACKEND", latestData.data)
                // console.log("BACKEND Date Only", latestData.data.created_at)
                const latestDateBackend = new Date(latestData.data.created_at);
                if (latestOrderData === null) {
                    setLatestOrderData(latestData.data);
                    // console.log("FRONTEND - TRUE", latestOrderData)
                } else if (latestData.data.created_at > latestOrderData.created_at) {
                    setLatestOrderData(latestData.data);
                    // console.log("FRONTEND - TRUE", latestOrderData)
                    // console.log("NEW ORDER TRIGGER") // add notification func here
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
        <img className="checkout__qr" src={src}/>
        <div className="checkout__totalpay-ctr">
            <p className="checkout__totalpay-title">Total Pay:</p>
            <p className="checkout__totalpay-amount">${totalPay}</p>
        </div>
        <button 
          onClick={onClick}
          className="checkout__btn"
        >Share QR Code</button>
        {successPtmAlert? <p className="checkout__success-msg">{latestOrderData.customer_name} Successfully Paid</p> : null}
    </div>
    );
};

export default PaySummary;