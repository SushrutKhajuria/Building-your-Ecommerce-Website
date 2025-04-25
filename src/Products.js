import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import Cart from './Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.title === product.title);
      if (existingItem) {
        return prevItems.map(item =>
          item.title === product.title 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

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
      <div className="bg-dark py-2">
        <Container>
          <Nav className="justify-content-center">
            <Nav.Item>
              <Nav.Link href="#" className="text-white px-3">HOME</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="text-white px-3">STORE</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="text-white px-3">ABOUT</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

      <div className="bg-secondary py-4 position-relative">
        <h1 className="text-white m-0 text-center">The Generics</h1>
        <Button 
          variant="outline-light" 
          onClick={() => setShowCart(true)}
          className="position-absolute end-0 top-50 translate-middle-y me-3 d-flex align-items-center"
        >
          <BsCart3 className="me-2" />
          Cart
        </Button>
      </div>

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

      <Cart 
        show={showCart} 
        handleClose={() => setShowCart(false)} 
        cartItems={cartItems}
        handleRemove={handleRemoveFromCart}
      />
    </>
  );
};

export default Products;