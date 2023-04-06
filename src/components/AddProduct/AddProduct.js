import "./AddProduct.scss"
import { useState } from "react";

const AddProduct = () => {

    // {
    //     "product_name": "Product D",
    //     "description": "This is about ProductD",
    //     "category": "Kitchen",
    //     "status": "InStock",
    //     "quantity": "50",
    //     "sale_price": "10",
    //     "purchase_price": "5"
    //   }

    const [productName, setProductName] = useState();    
    const [description, setDescription] = useState();    
    const [category, setCategory] = useState();  
    const [quantity, setQuantity] = useState();
    const [salePrice, setSalePrice] = useState();
    const [purchasePrice, setPurchasePrice] = useState();
    
    console.log(productName);
    console.log(description);
    console.log(category);
    console.log(quantity);
    console.log(salePrice);
    console.log(purchasePrice);



    return (
        <div className="add">
            <p>Add Product Form</p>
            <form className="add__form">
                <label className="add__item-ctr">
                    Product Name
                    <input></input>
                </label>
                <label className="add__item-ctr">
                    Description
                    <input></input>
                </label>
                <label className="add__item-ctr">
                    Category    
                    <select className="add__item-ctr">
                        <option value="">Please select</option>
                        <option>Test A</option>
                        <option>Test B</option>
                    </select>
                </label>
                {/* <label className="add__item-ctr">
                    Status
                    <input></input>
                </label> */}
                <label className="add__item-ctr">
                    Quantity
                    <input></input>
                </label>
                <label className="add__item-ctr">
                    Sale Price
                    <input></input>
                </label>
                <label className="add__item-ctr">
                    Purchase Price
                    <input></input>
                </label>
                <button className="add__btn">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;