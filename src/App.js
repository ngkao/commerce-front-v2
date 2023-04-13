import axios from "axios"
import "./App.scss"
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import PaySummary from "./pages/PaySummary/PaySummary";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddProduct from "./components/AddProduct/AddProduct";
import ProductSelectionView from "./pages/ProductSelectionView/ProductSelectionView";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import QRCode from "qrcode"
import SalePage from "./pages/SalesPage/SalePage";
import SalesItem from "./components/SalesItem/SalesItem";
import Insights from "./pages/Insights/Insights";
import InventoryStockPage from "./pages/InventoryStockPage/InventoryStockPage";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {

    const [totalPay, setTotalPay] = useState(0);
    const [oltTotalPay, setOldTotalPay] = useState(0);
    const [showQuantity, setShowQuantity] = useState([]);
    const [previewCart, setPreviewCart] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      return () => {setOldTotalPay(totalPay)};
    }, [totalPay]);

    const calcTotalPay = () => {
      setTimeout(() => {
          if (cartSession == null) {
          } else {
              let totalPrice = 0
              for (let i = 0; i < cartSession.length; i++) {
                let itemPrice = cartSession[i].sale_price;
                let itemCount =  cartSession[i].count;
                let totalItem = itemCount * itemPrice
                totalPrice += totalItem
              }
              setTotalPay(totalPrice); 
          }
      },100)
    }

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
      calcTotalPay();
    }

    useEffect(() => {
        renderProductList();
        calcTotalPay();
        renderAllOrders();
    },[])

    const renderAllOrders = () => {
      axios.get(`${REACT_APP_SERVER_URL}/items`)
        .then((data) => {
            setOrders(data.data)
        })
    }

    const startStr = sessionStorage.getItem("myCart");
    let startCart = JSON.parse(startStr);
    let cart = startCart;
  
    const totalCart = (product) => {
        if (startStr) {
            const selectedItem = cart.filter((item) => item.id === product.id)
            if (!selectedItem.length > 0) {
              let addCount = {...product, count: 0}
              cart.push(addCount)
              sessionStorage.setItem("myCart", JSON.stringify(cart))
            setCartSession(cart)
            calcTotalPay();
            }
        } else {
              let cart = [];
              cart.push(product)
              sessionStorage.setItem("myCart", JSON.stringify(cart))
              setCartSession(cart)
              calcTotalPay();
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
              calcTotalPay();
            }
        } else {
            let cart = [];
            let addCount = {...product, count: 1}
            cart.push(addCount)
            sessionStorage.setItem("myCart", JSON.stringify(cart))
            setCartSession(cart)
            calcTotalPay();
        }
      }

    const removeFromCart = (product) => {
      let str = sessionStorage.getItem("myCart");
      let myCart = JSON.parse(str);
      let findCount = myCart.filter((item) => item.id === product.id)
      findCount[0].count -= 1;
      sessionStorage.setItem("myCart", JSON.stringify(myCart))
      setCartSession(myCart)
      calcTotalPay();
    }


    const [cartSession, setCartSession] = useState([]);
    const [src, setSrc] = useState("");
    const [showQR, setShowQR] = useState(false);

    if (!productList) {     
      return (<p>loading...</p>);
    } 

    const handleClick = () => {
        let stripeItemObj =
        cartSession.map((item) => ({id: item.id, quantity: item.count}))
        fetch('http://localhost:8080/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: 
            stripeItemObj
          })
        }).then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        }).then(({url}) => {
          const stringUrl = `url`
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
          setShowQR(true)
          setShowQuantity([])
      })
    }

    calcTotalPay();

    // GET Items by Order ID
    const renderItemsByOrderId = (order_id) => {
      axios.get(`${REACT_APP_SERVER_URL}/orders/${order_id}`)
          .then((data) => {
          })
          .catch(e => {
            console.error(e.error)
          })
    }

  return (
    <div className="background">
    <BrowserRouter className="header">
        <div className="main">
            <NavBar/>
            <div className="center">
                <Routes>
                    <Route path="/products" element={
                        <ProductSelectionView
                            productList={productList}
                            onClick={handleClick}
                            totalCart={totalCart}
                            removeFromCart={removeFromCart}
                            cartSession={cartSession}
                            setCartSession={setCartSession}
                            showQuantity={showQuantity}
                            setShowQuantity={setShowQuantity}
                            setPreviewCart={setPreviewCart}
                        />
                    }></Route>
                    <Route path="/products/add" element={
                        <AddProduct 
                            productList={productList}
                            renderProductList={renderProductList}
                        />
                    }></Route>
                    <Route path="/sales" element={
                        <SalePage 
                            setOrders={setOrders} 
                            orders={orders}
                            renderItemsByOrderId={renderItemsByOrderId}
                        />
                    }></Route>
                    <Route path="/sales/:orderId" element={<SalesItem/>}></Route>
                    <Route path="/insights" element={<Insights orders={orders}/>}></Route>
                    <Route path="/inventory" element={<InventoryStockPage/>}></Route>
                </Routes>
            </div>
            <div className="paysum">
                <Cart 
                    cartSession={cartSession} 
                    previewCart={previewCart} 
                    orders={orders}/>
                <PaySummary 
                    onClick={handleClick}
                    src={src}
                    totalPay={totalPay}
                    showQR={showQR}
                    setShowQR={setShowQR}
                    oltTotalPay={oltTotalPay}
                    setCartSession={setCartSession}
                    setShowQuantity={setShowQuantity}
                    setPreviewCart={setPreviewCart}
                    renderAllOrders={renderAllOrders}
                />
            </div>
        </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
