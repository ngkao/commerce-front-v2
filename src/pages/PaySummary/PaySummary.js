import axios from 'axios';
import React, { useState, useEffect} from 'react';
import "./PaySummary.scss";
import Lottie from "lottie-react";
import SuccessMark from "../../assets/animations/success1.json";
import RefreshMark from "../../assets/animations/refresh.json"
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const PaySummary = ({urlStripe,onClick, src, totalPay, showQR, oltTotalPay,setShowQR, setCartSession,setShowQuantity, setPreviewCart,renderAllOrders,renderProductList,outOfStockMsg}) => {

    // Pull Request for New Orders Successfully being Paid
    const [latestOrderData, setLatestOrderData] = useState(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
                console.log("Interval is running")
                console.log(showQR, "showQR")
            
            // start Pull Request only when the QR code is generated and is shown to minimize the HTTP Requests
            if (showQR===true) {
                console.log("Checking if there is a new order")
                console.log(`${REACT_APP_SERVER_URL}/timestamp`)
                axios.get(`${REACT_APP_SERVER_URL}/timestamp`)
                .then((latestData) => {
                    console.log("Response from API", latestData.data)
                    const latestDateBackend = new Date(latestData.data.created_at);
                    if (latestOrderData === null) {
                        setLatestOrderData(latestData.data);
                    } else if (latestData.data.created_at > latestOrderData.created_at) {
                        setLatestOrderData(latestData.data);
                        successPayment();
                    }
                    console.log("LatestOrder", latestOrderData)
                })
                .catch((err) => console.log("Error: ", err))
            }
 
        }, 5000)
        return () => clearInterval(intervalId);
    }, [showQR])

    // Successful Payment Notification
    const [successPtmAlert, setSuccessPtmAlert] = useState(false);
    const successPayment = () => {
        setShowQR(false)
        setSuccessPtmAlert(true);
        setTimeout(() => {
            setSuccessPtmAlert(false);
            setCartSession([]);
            setShowQuantity([]);
            setPreviewCart(true);
            renderAllOrders();
            renderProductList();
            handleRefresh();
        }, 6000)
    }

    //Transition QR Code
    useEffect(() => {
        setTimeout(() => {
            const items = document.querySelectorAll('.checkout__qr');
                items.forEach((item) => 
                        item.classList.add('checkout__qr--active')
                );
        },300)
    }, [showQR]);

    //Transition Total Amount
    useEffect(() => {
        //Top
        const items = document.querySelectorAll('.checkout__totalpay-amount--top');
        items.forEach((item) => item.classList.remove('checkout__totalpay-amount--top--final'));
        //Bottom
        const itemsBottom = document.querySelectorAll('.checkout__totalpay-amount--bottom');
        itemsBottom.forEach((item) => item.classList.remove('checkout__totalpay-amount--bottom--final'));
        setTimeout(() => {
        //Top
            const items = document.querySelectorAll('.checkout__totalpay-amount--top');
                items.forEach((item) => 
                        item.classList.add('checkout__totalpay-amount--top--final'));
            //Bottom
            const itemsBottom = document.querySelectorAll('.checkout__totalpay-amount--bottom');
            itemsBottom.forEach((item) => 
                    item.classList.add('checkout__totalpay-amount--bottom--final'));
        //In the end
        return () => {
            //Top
            const items = document.querySelectorAll('.checkout__totalpay-amount--top');
            items.forEach((item) => 
                    item.classList.add('checkout__totalpay-amount--top---hide'));
            //Bottom
            const itemsBottom = document.querySelectorAll('.checkout__totalpay-amount--bottom');
            itemsBottom.forEach((item) => 
                    item.classList.add('checkout__totalpay-amount--bottom---show'));
        }
        },300)
    }, [totalPay]);

    const [currentRotation, setCurrentRotation] = useState(0);

    const handleRefresh = () => {
      const circleRefresh = document.querySelector('.checkout__refresh');
      if (circleRefresh) {
        setCurrentRotation(currentRotation + 360);
        circleRefresh.style.transform = `rotate(${currentRotation}deg)`;
        circleRefresh.classList.add('rotate');
        setTimeout(() => {
          circleRefresh.classList.remove('rotate');
        }, 500);
      }
      setCartSession([]);
      setShowQuantity([]);
      setShowQR(false);
      sessionStorage.clear();
      setPreviewCart(true);
    }

    return (
    <div className="checkout">
        {showQR ? <a href={urlStripe} target="_blank"><img className="checkout__qr" src={src}/></a> : null}
        {successPtmAlert? 
            <div className="checkout__success-ctr">
                <div className="checkout__lottie">
                    <Lottie 
                        loop={false}
                        autoplay={true}  
                        animationData={SuccessMark}
                    />
                </div>
                <p className="checkout__success-msg">{latestOrderData.customer_name} Successfully Paid</p>
            </div> : null}
        {outOfStockMsg.status? 
            <div className="checkout__outofstock-ctr">
                <p className="checkout__outofstock-msg">{outOfStockMsg.product}</p>
                <p className="checkout__outofstock-msg">{outOfStockMsg.message}</p> 
            </div>
        : null}
        <div className="checkout__totalpay-ctr">
            <p className="checkout__totalpay-title">Total Pay:</p>
            <div className="checkout__totalpay-amount-ctr">
                <p className="checkout__totalpay-amount--top">${totalPay}</p>
                <p className="checkout__totalpay-amount--bottom ">${oltTotalPay}</p>
            </div> 
        </div>
        <div className="checkout__btn-ctr">
            <div onClick={handleRefresh} className="checkout__refresh">
                <Lottie
                    loop={false}
                    autoplay={false}  
                    animationData={RefreshMark}
                    interaction="click"
                />
            </div>
            <button 
            onClick={onClick}
            className="checkout__btn"
            >Share QR Code</button>
        </div>
    </div>
    );
};

export default PaySummary;