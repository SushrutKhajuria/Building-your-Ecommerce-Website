import React from 'react';
import { Offcanvas, Table, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = ({ show, handleClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <h5>Your cart is empty</h5>
            <Button variant="primary" onClick={handleClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          style={{ 
                            width: '50px', 
                            height: '50px', 
                            marginRight: '10px',
                            objectFit: 'cover'
                          }}
                        />
                        {item.title}
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end mt-3">
              <h5>
                Total: $
                {cartItems.reduce(
                  (total, item) => total + (item.price * item.quantity), 
                  0
                ).toFixed(2)}
              </h5>
              <Button variant="success" className="mt-2">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;

//code for E Commerce App from Sharpener