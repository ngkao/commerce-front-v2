import axios from "axios"
import "./App.scss"

function App() {

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

  return (
    <div className="checkout">
        <button 
          onClick={handleClick}
          className="checkout__btn">CHECKOUT</button>
    </div>


  );
}

export default App;
