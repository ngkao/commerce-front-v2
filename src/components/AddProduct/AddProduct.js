import "./AddProduct.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AddProduct = ({productList,renderProductList}) => {

    const navigate = useNavigate();


    const [productName, setProductName] = useState("");    
    const [description, setDescription] = useState("");    
    const [category, setCategory] = useState("");  
    const [quantity, setQuantity] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    
    // console.log(productName);
    // console.log(description);
    // console.log(category);
    // console.log(quantity);
    // console.log(salePrice);
    // console.log(purchasePrice);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(productName);
        console.log(description);
        console.log(category);
        console.log(quantity);
        console.log(salePrice);
        console.log(purchasePrice);

        axios.post(`${REACT_APP_SERVER_URL}/products/add`, {
            product_name: productName,
            description: description,
            category: category,
            status: `${quantity > 0 ? "In Stock" : "Out of Stock"}`,
            quantity: quantity,
            sale_price: salePrice,
            purchase_price: purchasePrice
        })
        .then((data) => {
            renderProductList();
            navigate("/products")
        })
        .catch((err) => console.log("Error in POST: ", err))
    }

    return (
        <div className="add">
            <p>Add Product Form</p>
            <form 
                className="add__form"
                onSubmit={handleSubmit}
            >
                <label className="add__item-ctr">
                    Product Name
                    <input value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                </label>
                <label className="add__item-ctr">
                    Description
                    <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
                </label>
                <label className="add__item-ctr">
                    Category    
                    <select 
                        className="add__item-ctr"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value="" disabled>Please select</option>
                        {productList.map((item) => {
                            return (
                                <option key={item.id} value={item.category}>{item.category}</option>
                            )
                        })}
                    </select>
                </label>
                {/* <label className="add__item-ctr">
                    Status
                    <input></input>
                </label> */}
                <label className="add__item-ctr">
                    Quantity
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                </label>
                <label className="add__item-ctr">
                    Sale Price
                    <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}></input>
                </label>
                <label className="add__item-ctr">
                    Purchase Price
                    <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}></input>
                </label>
                <button className="add__btn">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;