import axios from "axios"
import "./App.scss"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaySummary from "./pages/PaySummary/PaySummary";
import { useEffect, useState } from "react";
import InventoryList from "./pages/InventoryList/InventoryList";
import { v4 as uuidv4 } from 'uuid';
import AddProduct from "./components/AddProduct/AddProduct";
import ProductSelectionView from "./pages/ProductSelectionView/ProductSelectionView";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import QRCode from "qrcode"

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {

const [productList, setProductList] = useState();
const myId = uuidv4();

const renderProductList = () => {
  axios.get(`${REACT_APP_SERVER_URL}/products`)
  .then((res) => {
    setProductList(res.data)
  })
  .catch((err) => console.log(err))


  const str = sessionStorage.getItem("myCart");
  let myCart = JSON.parse(str);
  setCartSession(myCart)
}

useEffect(() => {
    renderProductList();
},[])



  const startStr = sessionStorage.getItem("myCart");
  let startCart = JSON.parse(startStr);
  let cart = startCart;
  
  // Total Cart
  const totalCart = (product) => {

    if (startStr) {
      const selectedItem = cart.filter((item) => item.id === product.id)
      if (!selectedItem.length > 0) {
        let addCount = {...product, count: 0}
        cart.push(addCount)
        sessionStorage.setItem("myCart", JSON.stringify(cart))
      setCartSession(cart)

      }
    } else {
      let cart = [];
      cart.push(product)
      sessionStorage.setItem("myCart", JSON.stringify(cart))
      setCartSession(cart)
    }

    if (startCart) {
      const addCount = cart.filter((item) => item.id === product.id)
      if (addCount) {
        let str = sessionStorage.getItem("myCart");
        let myCart = JSON.parse(str);
        let findCount = myCart.filter((item) => item.id === product.id)
        findCount[0].count += 1;
        sessionStorage.setItem("myCart", JSON.stringify(myCart))
        setCartSession(myCart)
      }
    } else {
      let cart = [];
      let addCount = {...product, count: 1}
      cart.push(addCount)
      sessionStorage.setItem("myCart", JSON.stringify(cart))
      setCartSession(cart)
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
console.log(clickTrigger)
// const [text, setText] = useState("Empty");
const [src, setSrc] = useState("");
console.log("src",src)
// console.log("text",text)

if (!productList) {     
  return (<p>loading...</p>);
} 


const handleClick = () => {


  let stripeItemObj =
  cartSession.map((item) => ({id: item.id, quantity: item.count}))

  console.log("CHECKOUT clicked")



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
    const stringUrl = `url`
    console.log("StringUtl", {url})
    // setText({url})
    console.log(url)
    // console.log("Stripe Link: ",text)
    generateQRCode({url});
  }).catch(e => {
    console.error(e.error)
  })

  sessionStorage.clear();
}

const generateQRCode = (textLink) => {
  console.log("before generating QR Code",textLink.url)
  const text = textLink.url;
  QRCode.toDataURL(text).then((data) => {
      setSrc(data)
      console.log("New QR Code created")
  })
}


  return (
    <>
        {/* {productList? 
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
      : <p>Loading</p>} */}
        {/* <div>
          <p>TOTAL PAY CART</p>
          {cartSession ? 
                    (cartSession.map((cartItem) => (
                      <>
                        <p key={myId}>cartItem {cartItem.product_name}</p>
                        <p>Quantity {cartItem.count}</p>
                      </>)
                    )) : null
        }
        </div> */}
    <BrowserRouter >
        <div className="main">
            <NavBar/>
            <div>
                <Routes>
                    <Route path="/products" element={
                        <ProductSelectionView
                            productList={productList}
                            // product={product}
                            onClick={handleClick}
                            totalCart={totalCart}
                            removeFromCart={removeFromCart}
                        />
                    }></Route>
                    <Route path="/products/add" element={
                        <AddProduct 
                            productList={productList}
                            renderProductList={renderProductList}
                    />}></Route>
                    <Route path="/sales" element="Sales Report"></Route>
                    <Route path="/employees" element="Employee List"></Route>
                </Routes>
            </div>
            <div className="checkout">
                <Cart cartSession={cartSession}/>
                <PaySummary 
                    onClick={handleClick}
                    // text={src}
                    src={src}
                />
            </div>
        </div>
     </BrowserRouter>
    </>

  );
}

export default App;
