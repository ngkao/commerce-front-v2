import axios from "axios"
import "./App.scss"
// import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaySummary from "./pages/PaySummary/PaySummary";
import { useEffect, useState } from "react";
import InventoryList from "./pages/InventoryList/InventoryList";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {

const [productList, setProductList] = useState();

useEffect(() => {
  axios.get(`${REACT_APP_SERVER_URL}/products`)
      .then((res) => {
        console.log(res.data)
        setProductList(res.data)
      })
      .catch((err) => console.log(err))
},[])




  const handleClick = () => {
    console.log("CHECKOUT clicked")

    // axios.get("http://localhost:8080")
    //     .then(response => console.log(response))
    //     .catch(error => console.log(error))

    fetch('http://localhost:8080/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 123, quantity: 2},
          { id: 2, quantity: 1}
        ]
      })
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
      // window.location = url
      console.log(url)
    }).catch(e => {
      console.error(e.error)
    })

  }

  const [sumCart, setSumCart] = useState([]);
  const cart = [];

  // Total Cart
  const totalCart = (product) => {
    console.log("Before Push Total Cart",cart)
    cart.push(product)
    console.log("After Push Total Cart",cart)
}

  return (
    <>
        {productList? 
        productList.map((product) => (
            <InventoryList 
              key={product.id}
              product={product}
              onClick={handleClick}
              totalCart={totalCart}
            /> 
        ))

      

      
      : <p>Loading</p>}
      <PaySummary onClick={handleClick}/>
    {/* // <BrowserRouter>
    //   <Routes>
    //     <Route></Route>
    //   </Routes>
    // </BrowserRouter> */}
    </>

  );
}

export default App;
