import axios from 'axios';
import React, { useState, useEffect } from 'react';
import QRCode from "qrcode"
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PaySummary = ({onClick, src}) => {
    
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

    // QR Code Generator
// const [src, setSrc] = useState("");
// console.log("src",src)
// console.log("text",text)


    
//  const generateQRCode = () => {
//     QRCode.toDataURL(text).then((data) => {
//         setSrc(data)
//         console.log("New QR Code created")
//     })
//  }

  


    
    return (
    <div className="checkout">
        <button 
          onClick={onClick}
          className="checkout__btn"
        >CHECKOUT</button>
        <img src={src}/>
        {successPtmAlert? <p>{latestOrderData.customer_name} Successfully Paid</p> : null}
    </div>
    );
};

export default PaySummary;