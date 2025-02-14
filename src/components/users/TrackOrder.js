import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function TrackOrder() {

  const [orderStatus, setOrderStatus] = useState([
    { status: 'Your order has been accepted', timestamp: '2023-05-24 14:00' },
    { status: 'Your order is being prepared', timestamp: null },
    { status: 'Your order is being picked up', timestamp: null },
    { status: 'Your order is arriving soon', timestamp: null },
  ]);
  const [estimatedDelivery, setEstimatedDelivery] = useState('2023-05-24 15:00');

  useEffect(() => {
    // Simulating status update with timestamps
    const timer = setTimeout(() => {
      updateOrderStatus(1, '2023-07-24 14:15');
    }, 60000);

    const timer2 = setTimeout(() => {
      updateOrderStatus(2, '2023-07-24 14:30');
    }, 120000);

    const timer3 = setTimeout(() => {
      updateOrderStatus(3, '2023-07-24 14:45');
    }, 240000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const updateOrderStatus = (index, timestamp) => {
    setOrderStatus(prevStatus => {
      const newStatus = [...prevStatus];
      newStatus[index].timestamp = timestamp;
      return newStatus;
    });
  };

  const progress = (orderStatus.filter(status => status.timestamp !== null).length / orderStatus.length) * 100;

  return (
    <Container className="mt-4">
      <h2>Track Your Order</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Estimated Delivery</Card.Title>
          <Card.Text>{estimatedDelivery}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Order Number</Card.Title>
          <Card.Text>648484684</Card.Text>
          <Card.Title>Delivery Address</Card.Title>
          <Card.Text>16 Pimlico Place 1,Avonmouth Cresccent,Cape Town 7441</Card.Text>
        </Card.Body>
      </Card>
      <ProgressBar animated now={progress} className="mb-4" />
      <ListGroup>
        {orderStatus.map((status, index) => (
          <ListGroupItem key={index} variant={status.timestamp ? "success" : "secondary"}>
            <Row>
              <Col>{status.status}</Col>
              <Col className="text-right">
                {status.timestamp ? new Date(status.timestamp).toLocaleString() : 'Pending'}
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};
