import React from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const { cartItemCount } = useCart();

  return (
    <>
      {/* Top Navigation */}
      <div className="bg-dark py-2">
        <Container>
          <Nav className="justify-content-center">
            <Nav.Item>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `text-white px-3 text-decoration-none ${isActive ? 'fw-bold' : ''}`
                }
              >
                HOME
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink 
                to="/store" 
                className={({ isActive }) => 
                  `text-white px-3 text-decoration-none ${isActive ? 'fw-bold' : ''}`
                }
              >
                STORE
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-white px-3 text-decoration-none ${isActive ? 'fw-bold' : ''}`
                }
              >
                ABOUT
              </NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

      {/* Header with Cart */}
      <div className="bg-secondary py-4 position-relative">
        <h1 className="text-white m-0 text-center">The Generics</h1>
        <NavLink 
          to="/cart"
          className="position-absolute end-0 top-50 translate-middle-y me-3 btn btn-outline-light d-flex align-items-center"
        >
          <BsCart3 className="me-2" />
          Cart {cartItemCount > 0 && <span className="badge bg-danger ms-1">{cartItemCount}</span>}
        </NavLink>
      </div>
    </>
  );
};

export default Navigation;

//code for E Commerce App from Sharpener