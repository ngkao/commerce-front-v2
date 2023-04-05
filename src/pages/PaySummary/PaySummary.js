import React from 'react';

const PaySummary = ({onClick}) => {


    
    return (
    <div className="checkout">
        <button 
          onClick={onClick}
          className="checkout__btn">CHECKOUT</button>
    </div>
    );
};

export default PaySummary;