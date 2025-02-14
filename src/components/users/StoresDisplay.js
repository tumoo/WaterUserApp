import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../users/SearchContext';
import '../users/Stores.css'
import{FaSearch} from "react-icons/fa"
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';

export default function StoreDisplay() {
  const [data, setData] = useState([]);
  const [productType, setProductTypes] = useState([]); // Initialize as an empty array
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [storeIds, setStoreIds] = useState([]);
  const [cartItemCount, setCartItemCount] = useState([]); // Add state for cart count

  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [isPrimaryAddress, setIsPrimaryAddress] = useState(false);
  const [mainSearch, setMainSearch] = useState("16 Pimlico Place, Avonmouth Crescent, Cape Farms, 7441");
  const addresses = [
    "16 Pimlico Place, Avonmouth Crescent, Cape Farms, 7441",
    "123 Main Street, City, 1000",
    "456 Elm Street, Suburb, 2000"
  ];

  const handleAddressSearchClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  //const handleAddressChange = (e) => setSelectedAddress(e.target.value);
  const handleSearchAddressChange = (e) => setSearchAddress(e.target.value);
  const handlePrimaryAddressChange = () => setIsPrimaryAddress(!isPrimaryAddress);

  //Handle Modal Search click
  const handleDoneClick = () => {
    if (searchAddress.trim() !== "") {
      setMainSearch(searchAddress);
    }
    setSearchAddress("");
    setShowModal(false);
  };
  const handleAddressChange = (e) => {
    const selected = e.target.value;
    setSelectedAddress(selected);
    setSearchAddress(selected); // Auto-populate search input with selected address
  };

  const { searchTerm } = useSearch();

  useEffect(() => {
    getData();
    fetchProductTypes(); // Fetch Product Types
    fetchCartCount(); // Fetch cart count on load
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


   useEffect(() => {
    console.log("Tumo ids", storeIds);
  }, [storeIds]);

  const getData = () => {
    const url = `${baseUrl}/api/WaterStore/stores`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        console.log("Stores:", data.stores);
  
        if (data.statusCode === 200) {
          if (Array.isArray(data.stores)) {
            // Map through stores and ensure 'id' is present
            const ids = data.stores.map(store => {
              return store.id;
            });
  
            setData(data.stores);
            setStoreIds(ids); // Store the StoreIds
          } else {
            console.error("Stores is not an array:", data.stores);
          }
        }
      })
      .catch((error) => {
        console.log("Error fetching stores:", error);
      });
  };

  
  // Fetch product types for the first dropdown
  const fetchProductTypes = () => {
    const url = `${baseUrl}/api/ProductType/GetProductTypeById/1`;
    axios.get(url)
      .then(response => { 
        setProductTypes([response.data.productType]); // Ensure it's an array
      })
      .catch(error => {
        console.error("Error fetching product types:", error);
      });
  };

  const handleProductTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    setSelectedProductType(selectedTypeId);
  
    switch (parseInt(selectedTypeId)) {
      case 1:
        setSelectedOption("20Lt");
        break;
      case 2:
        setSelectedOption("5lt");
        break;
      case 3:
        setSelectedOption("20lt Bottle");
        break;
      case 4:
        setSelectedOption("12x 330ml water bottles pack");
        break;
      default:
        setSelectedOption(""); // Clear the option if none matches
    }
  };

  const navigate = useNavigate();
  const handleButtonClick = (storeId) => {
    navigate(`/products/${storeId}`);
  };

  const filteredData = data.filter(val => 
    val.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSearchClick = () => {
     const url = `${baseUrl}/api/WaterStore/GetFilteredStores`;
    const params = new URLSearchParams();

    storeIds.forEach(id => params.append('storeIds', id));
    params.append('productType', selectedProductType);
    params.append('option', selectedOption);
    params.append('quantity', quantity);

    axios.get(`${url}?${params.toString()}`)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.stores);  // Update the displayed stores with the filtered results
        }
      })
      .catch((error) => {
        console.error("Error fetching filtered stores:", error);
      });
  };
    //Cart Items Count
  const cartItemQtyCount = cartItemCount.reduce((acc, item) => acc + Number(item.quantity), 0);

  return (
    <Fragment>
      <Header cartItemCount={cartItemQtyCount} />
      <br />
      <div style={{ backgroundColor: "white", width: "40%", marginLeft: "150px", borderRadius: "11px", padding: "20px" }}>
       <h3 style={{ marginBottom: "10px", fontSize: "18px", color: "#333", marginLeft: "-400px" }}>
        Delivery to Address
       </h3>
        {/* Search Input */}
        <div className="search-container" style={{ display: "flex", alignItems: "center", marginBottom: "15px", justifyContent: "flex-start"}}>
          <input
            type="text"
            className="search-input"
            value={mainSearch}
            placeholder="16 Pimlico Place, Avonmouth Crescent, Cape Farms, 7441"
            readOnly
            onClick={handleAddressSearchClick}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "0.5px solid #ccc" }}
          />
          <FaSearch style={{ marginLeft: "-30px", cursor: "pointer" }} onClick={handleAddressSearchClick} />
        </div>
        </div>
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
          padding: "20px"
        }}
      >
    {/* Filters Container */}
<div className="filter-container">
  {/* Select Product Type Dropdown */}
  <div className="filter-item">
    <label>Select Product Type</label>
    <select value={selectedProductType} onChange={handleProductTypeChange}>
      <option value="">Select Product Type</option>
      {Array.isArray(productType) && productType.map((type) => (
        <option key={type.productTypeId} value={type.productTypeId}>
          {type.productName}
        </option>
      ))}
    </select>
  </div>

  {/* Select an Option Dropdown */}
  <div className="filter-item">
    <label>Select an Option</label>
    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
      <option value="">{selectedOption || "Select an Option"}</option>
    </select>
  </div>

  {/* Quantity Input */}
  <div className="filter-item quantity-input">
    <label>Quantity</label>
    <div>
      <button onClick={handleDecrease}>-</button>
      <input
        type="number"
        value={quantity}
        readOnly
        style={{ width: "50px", textAlign: "center", margin: "0 10px" }}
      />
      <button onClick={handleIncrease}>+</button>
    </div>
  </div>

  {/* Search Button */}
  <div className="filter-item search-button">
    <button className="btn btn-primary" onClick={handleSearchClick}>
      Search
    </button>
  </div>
</div>

 
        {/* Card Deck */}
        <div className="card-deck">
          {filteredData && filteredData.length > 0
            ? filteredData.map((val, index) => {
              const truncatedAddress = val.address.length > 57 
              ? `${val.address.substring(0, 57)}...` 
              : val.address;    
                return (
                  <div
                    key={index}
                    className="col-md-3"
                    style={{ marginBottom: "21px" }}
                  >
                    <div className="card fixed-card">
                      <img
                        className="card-img-top"
                        src={`assets/images/${val.imageUrl}`}
                        alt="Card image"
                      />
                      <div className="card-body">
                        <h6 className="card-title"> {val.name}</h6>
                        <p className="card-text" style={{ color: 'green' }}>{val.distance}</p>
                        <div className="card-rating">
                          {Array(val.rating).fill('★').join('')} {Array(5 - val.rating).fill('☆').join('')}
                        </div>
                        <p className="card-text" title={val.address}>{truncatedAddress}</p>
                        <button className="btn btn-primary" onClick={() => handleButtonClick(val.id)}>Check Store Products</button>
                      </div>
                    </div>
                  </div>
                );
              })
            : "Loading products..."}
        </div>
      </div>


      {/* Modal for Address Selection */}
      <Modal show={showModal} onHide={handleClose} centered style={{ maxWidth: "700px",margin:"0 auto" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-map-marker-alt"></i> Physical Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Card.Body>
              <Form.Group controlId="deliveryAddress">
                <Form.Label>Saved Addresses</Form.Label>
                <Form.Control as="select" value={selectedAddress} onChange={handleAddressChange}>
                  {addresses.map((address, index) => (
                    <option key={index} value={address}>{address}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="searchAddress" className="mt-3">
                <Form.Label>Search Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search addresses"
                  value={searchAddress}
                  onChange={handleSearchAddressChange}
                />
              </Form.Group>

              <Form.Group controlId="primaryAddress" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Set as Primary Address"
                  checked={isPrimaryAddress}
                  onChange={handlePrimaryAddressChange}
                  style={{ accentColor: 'green' }}
                />
              </Form.Group>
              
              <Button variant="success" size="sm" className="mt-2" onClick={handleDoneClick}>Done</Button>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}


