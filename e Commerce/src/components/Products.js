import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav, Navbar } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [showCart, setShowCart] = useState(false);
  const { addToCart, cartItemCount } = useCart();

  const productsArr = [
    {
      id: 1,
      title: 'Colors',
      price: 100,
      imageUrl: 'https://via.placeholder.com/250x250.png?text=Album+1',
    },
    {
      id: 2,
      title: 'Black and White Colors',
      price: 50,
      imageUrl: 'https://via.placeholder.com/250x250.png?text=Album+2',
    },
    {
      id: 3,
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://via.placeholder.com/250x250.png?text=Album+3',
    },
    {
      id: 4,
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://via.placeholder.com/250x250.png?text=Album+4',
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
          {productsArr.map((product) => (
            <Col key={product.id} className="d-flex">
              <Link to={`/products/${product.id}`} className="text-decoration-none w-100">
                <Card className="w-100 border-0 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={product.imageUrl} 
                    style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                    alt={product.title}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fs-5">{product.title}</Card.Title>
                    <Card.Text className="fs-5">${product.price}</Card.Text>
                    <Button 
                      variant="warning" 
                      className="w-100 text-uppercase fw-bold text-dark"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        addToCart(product); 
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </>
  );
};

export default Products;
