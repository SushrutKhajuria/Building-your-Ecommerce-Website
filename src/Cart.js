import React from 'react';
import { Offcanvas, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = ({ show, handleClose }) => {
  const cartElements = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 2,
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 3,
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 1,
    }
  ];

  const handleRemove = (index) => {
    console.log('Removing item at index:', index);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
            {cartElements.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
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
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end mt-3">
          <h5>Total: ${cartElements.reduce((total, item) => total + (item.price * item.quantity), 0)}</h5>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;