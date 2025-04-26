import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const { cartItemCount } = useCart();
  
  return (
    <>
      <div className="bg-dark py-2">
        <Container>
          <Nav className="justify-content-center">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="text-white px-3">HOME</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/store" className="text-white px-3">STORE</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about" className="text-white px-3">ABOUT</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" className="text-white px-3">CONTACT US</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

      <div className="bg-secondary py-4 position-relative">
        <h1 className="text-white m-0 text-center">The Generics</h1>
        <Link 
          to="/cart"
          className="position-absolute end-0 top-50 translate-middle-y me-3 btn btn-outline-light d-flex align-items-center"
        >
          <BsCart3 className="me-2" />
          Cart {cartItemCount > 0 && <span className="badge bg-danger ms-1">{cartItemCount}</span>}
        </Link>
      </div>
    </>
  );
};

export default Navigation;
