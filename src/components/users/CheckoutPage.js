import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import axios from "axios";
import { baseUrl } from "../constants";
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const [data, setData] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('16 Pimlico Place 1,Avonmouth Cresccent,Cape Town 7441');
    const [isPrimaryAddress, setIsPrimaryAddress] = useState(false);
    const [searchAddress, setSearchAddress] = useState(''); // State to store input address
    const [addresses, setAddresses] = useState([
        '16 Pimlico Place 1,Avonmouth Cresccent,Cape Town 7441',
        '32 Riverside Drive, Greenpoint, Cape Town 8001',
        '45 Long Street, Cape Town City Centre, Cape Town 8000'
    ]);

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
            console.log(data.cartList);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/trackOrder');
    };

    const orderAmount = data.reduce((sum, item) => sum + item.totalPrice, 0);
    const serviceFee = 5.00;
    const totalAmount = serviceFee + orderAmount;
    const deliveryfee = 14.50;
    const vatPercentage = 0.15;
    

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };
   
    const handlePrimaryAddressChange = (e) => {
        setIsPrimaryAddress(e.target.checked);
         // Add the search address to the dropdown if the checkbox is checked
         if (e.target.checked && searchAddress) {
            setAddresses([...addresses, searchAddress]);
            setSelectedAddress(searchAddress); // Set the newly added address as the selected one
        }
    };

    const handleSearchAddressChange = (e) => {
        setSearchAddress(e.target.value); // Update the input state with the typed address
    };

    return (
        <Container className="mt-4">
            <h2>Checkout</h2>
            <Row className='mt-4 d-flex justify-content-center align-items-center'>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>
                                <i className="fas fa-map-marker-alt"></i> Delivery Address
                            </Card.Title>
                               
                            {/* Dropdown for selecting addresses */}
                            <Form.Group controlId="deliveryAddress">
                                <Form.Label>Saved Addresses</Form.Label>
                                <Form.Control as="select" value={selectedAddress} onChange={handleAddressChange}>
                                    {addresses.map((address, index) => (
                                        <option key={index} value={address}>
                                            {address}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            
                             {/* Input for searching addresses */}
                             <Form.Group controlId="searchAddress">
                                <Form.Label>Search Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Search addresses"
                                    value={searchAddress}
                                    onChange={handleSearchAddressChange}
                                />
                            </Form.Group>

                            {/* Checkbox for primary address */}
                            <Form.Group controlId="primaryAddress" className="mt-3">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Set as Primary Address" 
                                    checked={isPrimaryAddress} 
                                    onChange={handlePrimaryAddressChange} 
                                    style={{ accentColor: 'green' }} // Change the checkbox color
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mt-4 d-flex justify-content-center align-items-center'>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Payment Methods</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroupItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <a href="#!">
                                        <img
                                            src="../Ozow.png"
                                            alt="Credit Card"
                                            className="img-fluid"
                                            style={{ maxWidth: '100px' }}
                                        />
                                    </a>
                                    <span style={{ marginTop: '10px', textAlign: 'center' }}>Pay with Ozow</span>
                                </ListGroupItem>
                                <ListGroupItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <a href="#!">
                                        <img
                                            src="../PayPalPayment.jpg"
                                            alt="PayPal"
                                            className="img-fluid"
                                            style={{ maxWidth: '100px' }}
                                        />
                                    </a>
                                    <span style={{ marginTop: '10px', textAlign: 'center' }}>Pay with PayPal</span>
                                </ListGroupItem>
                                <ListGroupItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <a href="#!">
                                        <img
                                            src="../mastercard.png"
                                            alt="Credit Card"
                                            className="img-fluid"
                                            style={{ maxWidth: '100px' }}
                                        />
                                    </a>
                                    <span style={{ marginTop: '10px', textAlign: 'center' }}>Pay with Debit or Credit Card</span>
                                </ListGroupItem>
                                <ListGroupItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <a href="#!">
                                        <img
                                            src="../CashIcon_optimized.png"
                                            alt="Cash"
                                            className="img-fluid"
                                            style={{ maxWidth: '100px' }}
                                        />
                                    </a>
                                    <span style={{ marginTop: '10px', textAlign: 'center' }}>Pay with Cash</span>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mt-4 d-flex justify-content-center align-items-center'>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col>Service Fee:</Col>
                                        <Col className="text-right">R{serviceFee.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Order Amount:</Col>
                                        <Col className="text-right">R{orderAmount.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>VAT:</Col>
                                        <Col className="text-right">R{(orderAmount * vatPercentage).toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Delivery Fee:</Col>
                                        <Col className="text-right">R{deliveryfee.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "green", color: 'black', fontWeight: "bold" }}>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col className="text-right">R{totalAmount.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <button className="btn btn-primary" onClick={handleButtonClick}>Complete Order</button>
        </Container>
    );
}
