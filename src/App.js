import axios from "axios"
import "./App.scss"
// import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaySummary from "./pages/PaySummary/PaySummary";
import { useEffect, useState } from "react";
import InventoryList from "./pages/InventoryList/InventoryList";
import { v4 as uuidv4 } from 'uuid';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {

const [productList, setProductList] = useState();
const myId = uuidv4();

useEffect(() => {
  axios.get(`${REACT_APP_SERVER_URL}/products`)
      .then((res) => {
        setProductList(res.data)
      })
      .catch((err) => console.log(err))
},[])







  const startStr = sessionStorage.getItem("myCart");
  let startCart = JSON.parse(startStr);
  const cart = startCart;
  
  // Total Cart
  const totalCart = (product) => {

    const selectedItem = cart.filter((item) => item.id === product.id)
    if (!selectedItem.length > 0) {
      let addCount = {...product, count: 0}
      cart.push(addCount)
      sessionStorage.setItem("myCart", JSON.stringify(cart))
    }

    const addCount = cart.filter((item) => item.id === product.id)
    if (addCount) {
      let str = sessionStorage.getItem("myCart");
      let myCart = JSON.parse(str);
      let findCount = myCart.filter((item) => item.id === product.id)
      findCount[0].count += 1;
      sessionStorage.setItem("myCart", JSON.stringify(myCart))
    }

    const num = clickTrigger;
    setClickTrigger(num +1)
}


const removeFromCart = (product) => {
  let str = sessionStorage.getItem("myCart");
  let myCart = JSON.parse(str);
  let findCount = myCart.filter((item) => item.id === product.id)
  findCount[0].count -= 1;
  sessionStorage.setItem("myCart", JSON.stringify(myCart))
  setCartSession(myCart)
}


const [cartSession, setCartSession] = useState([]);
const [clickTrigger, setClickTrigger] = useState(0);



useEffect(() => {
  const str = sessionStorage.getItem("myCart");
  let myCart = JSON.parse(str);
  setCartSession(myCart)
},[clickTrigger])

console.log(cartSession)

const stripeItemObj =
  cartSession.map((item) => ({id: item.id, quantity: item.count}))

console.log(typeof(stripeItemObj))

console.log("Stripe Obj", stripeItemObj)

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
      items: 
        // [
        //   { id: 1, quantity: 2},
        //   { id: 2, quantity: 1}
        // ]
      stripeItemObj
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


  return (
    <>
        {productList? 
        productList.map((product) => (
          <>
            <InventoryList 
              key={product.id}
              product={product}
              onClick={handleClick}
              totalCart={totalCart}
              removeFromCart={removeFromCart}
            /> 
          </>
        ))
      : <p>Loading</p>}

        <div>
          <p>TOTAL PAY CART</p>
          {cartSession.map((cartItem) => (
            <>
              <p key={myId}>cartItem {cartItem.product_name}</p>
              <p>Quantity {cartItem.count}</p>
            </>
          ))}
        </div>

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
