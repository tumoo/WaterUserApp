import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Header from "./Header";
import { useParams } from "react-router-dom";

export default function WaterProductsDisplay() {
  const [data, setData] = useState([]); // Stores all products
  const [refillData, setRefillData] = useState(null); // Stores refill product data
  const [orderQuantities, setOrderQuantities] = useState({});
  const [isCardDeckVisible, setIsCardDeckVisible] = useState(true); // Initially show the card deck
  const { storeId } = useParams();
  const [cartItemCount, setCartItemCount] = useState([]); // Add state for cart count
  

  useEffect(() => {
    getData();
    getRefillData(); // Fetch refill product data on component mount
    const storedCartCount = localStorage.getItem("cartItemCount") || 0;
    fetchCartCount();
  }, []);

  // Fetch cart count from the API
  const fetchCartCount = () => {
    const cartItemCount = {
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/ShoppingCart/CartList`;
    axios
      .post(url, cartItemCount)
      .then((result) => {
        const cartItemCount = result.data;
        if (cartItemCount.statusCode === 200) {
          setCartItemCount(cartItemCount.cartList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    const url = `${baseUrl}/api/Products/GetAllProductsExceptWaterRefill/${storeId}`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          const initialQuantities = {};
          data.products.forEach(product => {
            initialQuantities[product.id] = { quantity: "", isValid: true };
          });
          setData(data.products);
          setOrderQuantities(initialQuantities);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRefillData = () => {
    const url = `${baseUrl}/api/Products/GetWaterRefillProductWithQuantity/${storeId}`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        if (data.statusCode === 200) {
          setRefillData(response.data.productWithQuantity); // Store the refill product data
          console.log(response.data.productWithQuantity);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuantityChange = (e, id) => {
    const value = e.target.value;
    setOrderQuantities(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity: Number(value) }
    }));
  };

  const handleAddToCart = (e, id) => {
    e.preventDefault();
  //  const selectedQuantity = orderQuantities[id]?.quantity;
    console.log("Selected id:", id);

   /* if (selectedQuantity < 1 || selectedQuantity > 5) {
      setOrderQuantities(prev => ({
        ...prev,
        [id]: { ...prev[id], isValid: false }
      }));
      return;
    }
    setOrderQuantities(prev => ({
      ...prev,
      [id]: { ...prev[id], isValid: true }
    }));*/

    const data = {
      ID: id,
      Quantity: 1,
      Email: localStorage.getItem("username"),
    };
    const url = `${baseUrl}/api/ShoppingCart/AddToCart`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          getData();
          fetchCartCount();
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleCardDeck = () => {
    setIsCardDeckVisible(prev => !prev);
  };

  const cartItemQtyCount = cartItemCount.reduce((acc, item) => acc + Number(item.quantity), 0);

  return (
    <Fragment>
      <Header cartItemCount={cartItemQtyCount}/>
      <br></br>
      <div
        style={{
          backgroundColor: "white",
          width: "65%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <div className="large-product-card" style={{ marginBottom: "30px" }}>
          {refillData ? (
            <div className="card" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div className="col-md-4">
                <img
                  className="img-fluid"
                  src={`../assets/images/${refillData.pictureUrl}`}
                  alt="Product image"
                  style={{ maxWidth: "350px", height: "350px" }} // Resizing the image
                />
              </div>
              <div className="col-md-8 card-body">
                <h6 className="card-title">{refillData.name}</h6>
                <p className="card-text" style={{ color: 'green' }}>{refillData.description}</p>
                <h6 className="card-text">R{refillData.price.toFixed(2)}</h6>
                <p>Available: {Math.round(refillData.quantityAvailable / 20)} Bottle refills</p>
                <button className="btn btn-primary"onClick={(e) => handleAddToCart(e, refillData.id)}>Add to Basket</button>
              </div>
            </div>
          ) : (
            "Loading refill product..."
          )}
        </div>
        
        <div>
          <button
            style={{
              width: "100%",
              backgroundColor: "lightblue",
              color: "white",
              border: "none",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
            onClick={toggleCardDeck}
          >
            Related Products
            <span style={{ float: "right", fontSize: "16px" }}>
              {isCardDeckVisible ? "▲" : "▼"}
            </span>
          </button>
          {isCardDeckVisible && (
            <div className="card-deck">
              {data && data.length > 0
                ? data.map((val) => {
                    const { quantity, isValid } = orderQuantities[val.id] || { quantity: "", isValid: true };

                    return (
                      <div
                        key={val.id}
                        className="col-md-3"
                        style={{ marginBottom: "21px" }}
                      >
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={`../assets/images/${val.pictureUrl}`}
                            alt="Card image"
                          />
                          <div className="card-body">
                            <h6 className="card-title"> {val.name}</h6>
                            <p className="card-text" style={{ color: 'green' }}>{val.description}</p>
                            <p>Available: {Math.round(val.quantityInStock)} Products</p>
                            <h6 className="card-text">R{val.price.toFixed(2)}</h6>
                            <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, val.id)}>Add to Basket</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : "Loading products..."}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
