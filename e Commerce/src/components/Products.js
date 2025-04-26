import React, { useState } from 'react';
// Add these two imports with your other react-bootstrap imports:
import { Container, Row, Col, Card, Button, Nav, Navbar } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import Cart from './Cart'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [showCart, setShowCart] = useState(false);
  const { addToCart, cartItemCount } = useCart();

  const productsArr = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    },
    {
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    }
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand href="#" className="mx-auto fs-1 fw-bold">The Generics</Navbar.Brand>
          <Nav className="ms-auto">
            <Button 
              variant="outline-light" 
              onClick={() => setShowCart(true)}
              className="d-flex align-items-center"
            >
              <BsCart3 className="me-2" />
              Cart {cartItemCount > 0 && <span className="badge bg-danger ms-1">{cartItemCount}</span>}
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-5">
        <h2 className="text-center mb-5 fs-1">Music</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {productsArr.map((product, index) => (
            <Col key={index} className="d-flex">
              <Card className="w-100 border-0 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={product.imageUrl} 
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fs-5">{product.title}</Card.Title>
                  <Card.Text className="fs-5">${product.price}</Card.Text>
                  <Button 
                    variant="warning" 
                    className="w-100 text-uppercase fw-bold text-dark"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </>
  );
};

export default Products;

//code for E Commerce App from Sharpener