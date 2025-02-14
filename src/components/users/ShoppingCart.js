import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { baseUrl } from "../constants";
import { useNavigate } from 'react-router-dom';


export default function Cart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  
  const getData = () => {
    const data = {
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/ShoppingCart/CartList`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.cartList);
          console.log(data.cartList)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveFromCart = (e, productID) => {
    e.preventDefault();
    const data = {
      ID: productID,
      Quantity : 1,
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/ShoppingCart/RemoveFromCart`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          getData();
         // alert(dt.statusMessage);
          setData((prevData) =>
            prevData.filter((item) => item.productID !== productID)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
      Quantity : 1,
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/ShoppingCart/AddToCart`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          getData();
         // alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

const navigate = useNavigate();
const handleButtonClick = () => {
  navigate('/checkoutPage');
};
const NavigateToProducts = () => {
  navigate('/stores');
};
// Calculate subtotal
const subtotal = data.reduce((acc, item) => acc + item.totalPrice, 0);
  // Calculate total number of items in the cart
  const cartItemCount = data.reduce((acc, item) => acc + Number(item.quantity), 0);


  return (
    <Fragment>
      <Header cartItemCount={cartItemCount}/>
      <br></br>
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <h3>Basket items</h3>
        <div style={{ padding: "10px", fontSize: "18px", fontWeight: "bold" }}>
          <span style={{ paddingRight: "10px" }}>Subtotal:</span>
           R{subtotal.toFixed(2)}
        </div>
        <button className="btn btn-primary" onClick={NavigateToProducts} style={{ width: '300px', marginBottom: '20px'}}>
          + Add Items
        </button>
        <div className="card-deck">
          {data && data.length > 0
            ? data.map((val, index) => {
              return(
                <div key={index} class="col-md-3" style={{marginBottom:"21px"}}>
                <div class="card">
                  <img
                    class="card-img-top"
                    src={`assets/images/${val.imageUrl}`}
                    alt="Card image"
                  />
                  <div class="card-body">
                    <h6 class="card-title">Name : {val.productName}</h6>               
                    <h6 class="card-title">Quantity : {val.quantity}</h6> 
                    <button className="btn btn-success" onClick={(e) => handleAddToCart(e, val.productID)} style={{ marginRight: '10px' }}>+</button>
                    <button className="btn btn-danger" onClick={(e) => handleRemoveFromCart(e, val.productID)} style={{ marginRight: '10px' }}>-</button> 
                    <h6 class="card-title" style={{ marginTop: '20px' }}>Total Price : R{val.totalPrice}</h6>        
                  </div>
                </div>
              </div>
              )
            })
            : "No item to display. Kindly add..."}
        </div>
        <div class="form-group col-md-12">
          {data && data.length ?
        <button className="btn btn-primary" onClick={handleButtonClick} style={{ width: '500px' }}>
          Checkout
        </button>
        : ''}
      </div>
      </div>
    </Fragment>
  );
}
